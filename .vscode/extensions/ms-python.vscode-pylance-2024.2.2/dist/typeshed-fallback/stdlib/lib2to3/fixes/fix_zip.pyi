from typing import ClassVar, Literal

from .. import fixer_base

class FixZip(fixer_base.ConditionalFix):
    BM_compatible: ClassVar[Literal[True]]
    PATTERN: ClassVar[str]
    skip_on: ClassVar[Literal["future_builtins.zip"]]
    def transform(self, node, results): ...
