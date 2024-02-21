#!/usr/bin/env sh
##===----------------------------------------------------------------------===##
#
# This file is Modular Inc proprietary.
#
##===----------------------------------------------------------------------===##
# This file is used to install Mojo SDK python dependencies. All the other post
# install steps depend on this one.

set -e

# Create a venv to install things from. This ensures our installs are hermetic.
python3 -m venv $1/venv
. $1/venv/bin/activate
$1/venv/bin/python -m pip install -r $2
