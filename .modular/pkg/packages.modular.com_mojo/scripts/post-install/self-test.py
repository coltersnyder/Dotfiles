#!/usr/bin/env python3
# ===----------------------------------------------------------------------=== #
#
# This file is Modular Inc proprietary.
#
# ===----------------------------------------------------------------------=== #

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
import traceback
from configparser import ConfigParser
from pathlib import Path


DESCRIPTION = """This is a self-test script for an installation of the Mojo SDK.
It executes the installed Mojo SDK binaries, in order to verify that they behave
correctly on the machine onto which they were installed.

This script is packaged along with the SDK, and the installer executes it after
it has placed SDK artifacts in their install locations.
"""


def indent(s: str, level: int = 1) -> str:
    """Returns a string formed from indenting each line in the input string by the given level.
    """
    indentation = "  " * level
    return os.linesep.join(f"{indentation}{line}" for line in s.splitlines())


class SubprocessError(subprocess.CalledProcessError):
    """Wraps `CalledProcessError` to also print stdout and stderr."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def __str__(self):
        s = super().__str__()
        if len(self.stdout) > 0:
            s += f"\n  stdout:\n{indent(self.stdout.rstrip(), 2)}"
        if len(self.stderr) > 0:
            s += f"\n  stderr:\n{indent(self.stderr.rstrip(), 2)}"
        return s


class CheckError(Exception):
    """The error raised by self-tests when an expected string `needle` does not
    appear in another string `haystack`."""

    def __init__(self, needle: str, haystack: str):
        super().__init__(
            f"expected '{needle}' to appear in output:\n{indent(haystack)}"
        )


class Tester:
    def __init__(
        self, modular_home: str, package_path: str, test_dir: str, verbose: bool
    ):
        self.modular_home = modular_home
        self.package_path = package_path
        self.test_dir = Path(test_dir)
        self.verbose = verbose
        self.failed = False

        # Set a timeout for each test, to ensure that we don't hang indefinitely
        # if a test fails. Note, this timeout is in seconds.
        self.timeout = 60

        self.mojo = os.path.join(package_path, "bin", "mojo")
        self.env = {
            "MODULAR_HOME": modular_home,
            "PATH": os.getenv("PATH"),
        }

        # TODO: `mojo build` doesn't yet handle embedding the python version, so
        # read the config and set MOJO_PYTHON_LIBRARY manually.
        mojo_python_library = os.getenv("MOJO_PYTHON_LIBRARY")
        if not mojo_python_library:
            config = ConfigParser()
            config.read(Path(modular_home) / "modular.cfg")
            mojo_python_library = config.get("mojo", "python_lib").rstrip(";")

        if mojo_python_library:
            self.env["MOJO_PYTHON_LIBRARY"] = mojo_python_library

    # ===------------------------------------------------------------------=== #
    # Utilities
    # ===------------------------------------------------------------------=== #

    def log(self, *args, **kwargs):
        """Prints the given message to stderr, but only in "verbose" mode.

        This should be used to print messages intended for developers of this
        script, for help in debugging the script itself."""
        if self.verbose:
            print("[mojo][log]", *args, **kwargs, file=sys.stderr)

    def error(self, *args, **kwargs):
        """Prints the given message to stderr.

        This should be used to report test failures or other errors, both for
        the user and for use in telemetry."""
        print("[mojo][error]", *args, **kwargs, file=sys.stderr)

    class Check:
        """A context manager to capture assertions as test failures."""

        def __init__(self, tester: "Tester", message: str):
            self.message = message
            self.tester = tester

        def __enter__(self):
            self.tester.log(f'Entering test "{self.message}".')
            return

        def __exit__(self, exception_type, value, tb):
            self.tester.log(f"Exiting test `{self.message}`.")

            if exception_type is None:
                self.tester.log(f'Test "{self.message}" passed.')
                return True

            self.tester.failed = True
            self.tester.error(
                f'Mojo SDK post-install test "{self.message}" failed:\n'
                f"{exception_type.__name__}: {value}"
            )
            traceback.print_tb(tb)
            return True

    def check(self, message: str) -> Check:
        """Returns a context manager that wraps assertions with a message
        printed to stderr."""
        return self.Check(self, message)

    def assert_contains(self, needle: str, haystack: str):
        """Assert that `needle` appears in `haystack`."""
        if needle in haystack:
            return

        raise CheckError(needle, haystack)

    def run(self, *args: str) -> (str, str):
        """Runs a subprocess and returns its stdout and stderr.

        Crucially, this runs the subprocess with an empty environment, ensuring
        that elements of the PATH of the user invoking this installer script are
        not used by the subprocess."""
        self.log(
            " ".join(f"{k}={v}" for (k, v) in self.env.items()),
            " ".join(str(arg) for arg in args),
        )

        process = subprocess.Popen(
            args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, env=self.env
        )
        try:
            stdout, stderr = process.communicate(timeout=self.timeout)
        except subprocess.TimeoutExpired as e:
            process.kill()
            raise e

        out, err = stdout.decode("UTF-8"), stderr.decode("UTF-8")

        if process.returncode != 0:
            raise SubprocessError(
                process.returncode, " ".join(str(arg) for arg in args), out, err
            )

        return out, err

    # ===------------------------------------------------------------------=== #
    # Mojo Driver Tests
    # ===------------------------------------------------------------------=== #

    def run_mojo(self, subcommand: str, *args: str) -> (str, str):
        """Runs a mojo subcommand with `args` and returns its output."""
        return self.run(self.mojo, subcommand, *args)

    def test_mojo_help(self):
        with self.check("`mojo --help`"):
            self.assert_contains("mojo", self.run_mojo("--help")[0])

        with self.check("`mojo run --help`"):
            self.assert_contains("mojo-run", self.run_mojo("run", "--help")[0])

    def test_mojo_build(self):
        with tempfile.TemporaryDirectory() as tmp:
            with self.check("`mojo build test_mandelbrot.mojo`"):
                self.run_mojo(
                    "build",
                    self.test_dir / "test_mandelbrot.mojo",
                    "-o",
                    Path(tmp) / "test_mandelbrot",
                )
                self.assert_contains(
                    "25", self.run(Path(tmp) / "test_mandelbrot")[0]
                )
            with self.check("`mojo build test_python.mojo`"):
                self.run_mojo(
                    "build",
                    self.test_dir / "test_python.mojo",
                    "-o",
                    Path(tmp) / "test_python",
                )
                self.assert_contains(
                    "This was built inside of python",
                    self.run(Path(tmp) / "test_python")[0],
                )

    def test_mojo_demangle(self):
        with self.check("`mojo demangle`"):
            expected = (
                'Modules: ["Module"], Structs: ["Struct"], Symbol: "function"'
            )
            self.assert_contains(
                expected,
                self.run_mojo("demangle", "$Module::Struct::function()")[0],
            )

    def test_mojo_format(self):
        with tempfile.TemporaryDirectory() as tmp:
            unformatted_path = Path(tmp) / "test_format.mojo"

            with self.check("`mojo format`"):
                input_path = self.test_dir / "test_format.mojo"
                shutil.copyfile(input_path, unformatted_path)
                self.run_mojo("format", unformatted_path)
                self.assert_contains(
                    "def main() -> None:", unformatted_path.read_text()
                )

    def test_mojo_package(self):
        with tempfile.TemporaryDirectory() as tmp:
            tmp_user_path = Path(tmp) / "test_package_user.mojo"
            shutil.copyfile(
                self.test_dir / "test_package_user.mojo", tmp_user_path
            )

            with self.check("`mojo package`"):
                self.run_mojo(
                    "package",
                    self.test_dir / "test_package",
                    "-o",
                    Path(tmp) / "test_package.mojopkg",
                )
                self.assert_contains(
                    "This is a function in a package",
                    self.run_mojo(
                        "run",
                        tmp_user_path,
                        "-I",
                        tmp,
                    )[0],
                )

    def test_mojo_repl(self):
        # echo "print(\"Self-test OK!\")" | mojo repl
        with self.check("`mojo repl`"):
            args = [
                self.mojo,
                # Ideally we'd just invoke `mojo` here, but we also wish to set
                # a timeout for the test, so we invoke `mojo repl` with
                # arguments that are forwarded to lldb.
                "repl",
                "--one-line-before-file",
                "settings set target.load-cwd-lldbinit false",
                "--one-line-before-file",
                (
                    "settings set plugin.process.gdb-remote.packet-timeout"
                    f" {self.timeout}"
                ),
            ]
            repl = subprocess.Popen(
                args,
                stderr=subprocess.PIPE,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                env=self.env,
            )
            output_str = "Self-test OK!"
            out_data, err_data = repl.communicate(
                input=f'print("{output_str}")'.encode()
            )
            out = out_data.decode()
            err = err_data.decode()

            if repl.returncode != 0 or len(err) != 0:
                raise SubprocessError(repl.returncode, " ".join(args), out, err)

            self.assert_contains(output_str, out)

    def test_mojo_lldb(self):
        config = ConfigParser()
        config.read(Path(self.modular_home) / "modular.cfg")
        repl_entry_path = config.get("mojo", "repl_entry_point").rstrip(";")

        with self.check("`mojo debug`"):
            args = [
                self.mojo,
                # Ideally we'd just invoke `mojo` here, but we also wish to set
                # a timeout for the test, so we invoke `mojo repl` with
                # arguments that are forwarded to lldb.
                "debug",
                "--one-line-before-file",
                "settings set target.load-cwd-lldbinit false",
                "--one-line-before-file",
                (
                    "settings set plugin.process.gdb-remote.packet-timeout"
                    f" {self.timeout}"
                ),
                repl_entry_path,
            ]
            lldb = subprocess.Popen(
                args,
                stderr=subprocess.PIPE,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                env=self.env,
            )
            out_data, err_data = lldb.communicate(
                input="b main\nrun\nexpr -l mojo -- print(123)".encode()
            )
            out = out_data.decode()
            err = err_data.decode()

            if lldb.returncode != 0 or len(err) != 0:
                raise SubprocessError(lldb.returncode, " ".join(args), out, err)

            self.assert_contains("123", out)

    def test_mojo_run(self):
        # mojo test_mandelbrot.mojo | grep "25"
        with self.check("`mojo test_mandelbrot.mojo`"):
            self.assert_contains(
                "25", self.run_mojo(self.test_dir / "test_mandelbrot.mojo")[0]
            )
        # mojo test_python.mojo | grep "This was built inside of python"
        with self.check("`mojo test_python.mojo`"):
            self.assert_contains(
                "This was built inside of python",
                self.run_mojo(self.test_dir / "test_python.mojo")[0],
            )

    # ===------------------------------------------------------------------=== #
    # Mojo Jupyter Tests
    # ===------------------------------------------------------------------=== #

    def run_notebook(self, notebook_path: Path):
        """Run the given mojo jupyter notebook.

        Returns a list containing the stdout of each cell.
        """
        import papermill as pm

        with tempfile.NamedTemporaryFile(suffix=".ipynb") as notebook_output:
            pm.execute_notebook(
                notebook_path,
                notebook_output.name,
                kernel_name="mojo-jupyter-kernel",
                progress_bar=False,
                timeout=self.timeout,
            )
            results = json.load(notebook_output)

            cell_outputs = []
            for i, cell in enumerate(results["cells"]):
                if not "outputs" in cell:
                    cell_outputs.append("")
                    continue

                std_outputs = {"stdout": [], "stderr": []}
                for output in cell["outputs"]:
                    if "name" in output and output["name"] in std_outputs:
                        std_outputs[output["name"]] += output["text"]

                if len(std_outputs["stderr"]) != 0:
                    raise Exception(
                        f"Error executing notebook {notebook_path}, cell {i}:\n"
                        "".join(std_outputs["stderr"])
                    )

                cell_outputs.append("".join(std_outputs["stdout"]))

            return cell_outputs

    def test_jupyter(self):
        with self.check("jupyter: test_jupyter.ipynb"):
            outputs = self.run_notebook(self.test_dir / "test_jupyter.ipynb")
            assert len(outputs) == 3
            self.assert_contains("This is a mojo cell", outputs[2])
            self.assert_contains("This is a python cell", outputs[2])

    # ===------------------------------------------------------------------=== #
    # Entry Points
    # ===------------------------------------------------------------------=== #

    def test(self, test_jupyter: bool) -> int:
        """Executes each of the self-tests.

        Returns an exit code indicating the result (0 for success, non-zero for
        failure)."""

        # Run the mojo driver tests.
        self.test_mojo_help()
        self.test_mojo_build()
        self.test_mojo_demangle()
        self.test_mojo_format()
        self.test_mojo_package()
        self.test_mojo_run()
        self.test_mojo_repl()

        # Run the mojo jupyter tests.
        if test_jupyter:
            self.test_jupyter()

        if not self.failed:
            self.log("All tests passed!")
            return 0

        self.error(
            "Some components of the Mojo SDK may have been installed "
            "successfully, but others may not work as expected."
        )
        self.error(
            "Please submit an issue to https://github.com/modularml/mojo and "
            "include the full output of the command you just ran."
        )
        return 1


def main():
    parser = argparse.ArgumentParser(description=DESCRIPTION)
    parser.add_argument(
        "--modular-home",
        help=(
            "The path to a MODULAR_HOME-style installation directory for the"
            " Mojo SDK."
        ),
    )
    parser.add_argument(
        "--package-path",
        required=True,
        help=(
            "The path to a `mojo` package installation directory for the"
            " Mojo SDK."
        ),
    )
    parser.add_argument(
        "--test-jupyter",
        action="store_true",
        default=False,
        help=(
            "Whether to test the Mojo Jupyter kernel. This requires lldb, "
            "which is not currently available on all platforms."
        ),
    )
    parser.add_argument(
        "-v",
        "--verbose",
        action="store_true",
        default=False,
        help="Whether to print verbose output.",
    )
    args = parser.parse_args()

    package_path = os.path.abspath(os.path.expanduser(args.package_path))

    # Populate the default modular path if it wasn't specified.
    if not args.modular_home:
        # Find the default modular home directory by looking for the
        # `modular.cfg` file.
        modular_home_path = Path(package_path)
        while not os.path.exists(modular_home_path / "modular.cfg"):
            modular_home_path = modular_home_path.parent
            if modular_home_path == Path("/"):
                raise Exception(
                    "Could not find MODULAR_HOME. Please specify it manually"
                    " via `--modular-home`."
                )
        modular_home = str(modular_home_path)
    else:
        modular_home = os.path.expanduser(args.modular_home)

    tester = Tester(
        modular_home,
        package_path,
        os.path.join(package_path, "test"),
        args.verbose,
    )
    sys.exit(tester.test(args.test_jupyter))


if __name__ == "__main__":
    main()
