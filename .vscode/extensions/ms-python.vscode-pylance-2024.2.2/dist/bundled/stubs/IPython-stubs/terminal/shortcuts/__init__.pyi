"""
This type stub file was generated by pyright.
"""

import os
import signal
import sys
import warnings
from dataclasses import dataclass
from typing import Any, Callable, List, Optional
from prompt_toolkit.application.current import get_app
from prompt_toolkit.key_binding import KeyBindings
from prompt_toolkit.key_binding.key_processor import KeyPressEvent
from prompt_toolkit.key_binding.bindings import named_commands as nc
from prompt_toolkit.key_binding.bindings.completion import display_completions_like_readline
from prompt_toolkit.key_binding.vi_state import InputMode, ViState
from prompt_toolkit.filters import Condition
from IPython.core.getipython import get_ipython
from IPython.terminal.shortcuts import auto_match as match, auto_suggest
from IPython.terminal.shortcuts.filters import filter_from_string
from IPython.utils.decorators import undoc
from prompt_toolkit.enums import DEFAULT_BUFFER
from IPython.core.error import TryNext
from IPython.lib.clipboard import ClipboardEmpty, tkinter_clipboard_get, win32_clipboard_get

"""
Module to define and register Terminal IPython shortcuts with
:mod:`prompt_toolkit`
"""
__all__ = ["create_ipython_shortcuts"]
@dataclass
class BaseBinding:
    command: Callable[[KeyPressEvent], Any]
    keys: List[str]
    ...


@dataclass
class RuntimeBinding(BaseBinding):
    filter: Condition
    ...


@dataclass
class Binding(BaseBinding):
    condition: Optional[str] = ...
    def __post_init__(self): # -> None:
        ...
    


def create_identifier(handler: Callable):
    ...

AUTO_MATCH_BINDINGS = ...
AUTO_SUGGEST_BINDINGS = ...
SIMPLE_CONTROL_BINDINGS = ...
ALT_AND_COMOBO_CONTROL_BINDINGS = ...
def add_binding(bindings: KeyBindings, binding: Binding): # -> None:
    ...

def create_ipython_shortcuts(shell, skip=...) -> KeyBindings:
    """Set up the prompt_toolkit keyboard shortcuts for IPython.

    Parameters
    ----------
    shell: InteractiveShell
        The current IPython shell Instance
    skip: List[Binding]
        Bindings to skip.

    Returns
    -------
    KeyBindings
        the keybinding instance for prompt toolkit.

    """
    ...

def reformat_and_execute(event): # -> None:
    """Reformat code and execute it"""
    ...

def reformat_text_before_cursor(buffer, document, shell): # -> None:
    ...

def handle_return_or_newline_or_execute(event): # -> None:
    ...

def newline_or_execute_outer(shell): # -> (event: Unknown) -> None:
    ...

def previous_history_or_previous_completion(event): # -> None:
    """
    Control-P in vi edit mode on readline is history next, unlike default prompt toolkit.

    If completer is open this still select previous completion.
    """
    ...

def next_history_or_next_completion(event): # -> None:
    """
    Control-N in vi edit mode on readline is history previous, unlike default prompt toolkit.

    If completer is open this still select next completion.
    """
    ...

def dismiss_completion(event): # -> None:
    """Dismiss completion"""
    ...

def reset_buffer(event): # -> None:
    """Reset buffer"""
    ...

def reset_search_buffer(event): # -> None:
    """Reset search buffer"""
    ...

def suspend_to_bg(event): # -> None:
    """Suspend to background"""
    ...

def quit(event): # -> None:
    """
    Quit application with ``SIGQUIT`` if supported or ``sys.exit`` otherwise.

    On platforms that support SIGQUIT, send SIGQUIT to the current process.
    On other platforms, just exit the process with a message.
    """
    ...

def indent_buffer(event): # -> None:
    """Indent buffer"""
    ...

def newline_autoindent(event): # -> None:
    """Insert a newline after the cursor indented appropriately.

    Fancier version of former ``newline_with_copy_margin`` which should
    compute the correct indentation of the inserted line. That is to say, indent
    by 4 extra space after a function definition, class definition, context
    manager... And dedent by 4 space after ``pass``, ``return``, ``raise ...``.
    """
    ...

def open_input_in_editor(event): # -> None:
    """Open code from input in external editor"""
    ...

if sys.platform == "win32":
    @undoc
    def win_paste(event): # -> None:
        ...
    
else:
    ...
KEY_BINDINGS = ...
