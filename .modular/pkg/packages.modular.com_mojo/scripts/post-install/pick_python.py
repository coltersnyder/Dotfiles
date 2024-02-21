#!/usr/bin/env python3
# ===----------------------------------------------------------------------=== #
#
# This file is Modular Inc proprietary.
#
# ===----------------------------------------------------------------------=== #
#
# This file is used to pick the desired the python shared library on the user
# system.
#
# ===----------------------------------------------------------------------=== #

import argparse
import subprocess

from find_libpython import find_libpython


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-installer-outfile",
        help=(
            "The file to write the path to the python shared library to, use"
            " '-' to write to stdout."
        ),
        default="-",
        type=str,
    )
    args = parser.parse_args()

    # TODO: We should detect all of the available python versions on the system
    # and let the user pick their desired version.
    lib_python = find_libpython()

    # Fallback for GitHub Codespaces failing on Ubuntu 20.04
    # find_libpython() looks only for libpython3.10 and not libpython3.8
    if not lib_python:
        try:
            result = subprocess.check_output(
                ["find", "/opt/conda/lib/", "-name", "libpython*so"],
                stderr=subprocess.STDOUT,
            )
            paths = result.decode("utf-8").strip().split("\n")
            lib_python = paths[0]
        except subprocess.CalledProcessError:
            pass

    if not lib_python:
        raise Exception(
            "Could not find libpython. Check your Python installation and"
            " ensure that $LD_LIBRARY_PATH includes the location to the"
            " installed Python library (e.g. /usr/lib/x86_64-linux-gnu)."
        )

    # Handle emitting to standard out.
    if args.installer_outfile == "-":
        print(lib_python)
        return

    # Otherwise, emit to the file.
    with open(args.installer_outfile, "w") as f:
        f.write(lib_python)


if __name__ == "__main__":
    main()
