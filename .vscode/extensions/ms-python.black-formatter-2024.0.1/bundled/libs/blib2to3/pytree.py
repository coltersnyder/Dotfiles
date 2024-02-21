# Copyright 2006 Google, Inc. All Rights Reserved.
# Licensed to PSF under a Contributor Agreement.

"""
Python parse tree definitions.

This is a very concrete parse tree; we need to keep every token and
even the comments and whitespace between tokens.

There's also a pattern matching implementation here.
"""

# mypy: allow-untyped-defs, allow-incomplete-defs

from typing import (
    Any,
    Dict,
    Iterable,
    Iterator,
    List,
    Optional,
    Set,
    Tuple,
    TypeVar,
    Union,
)

from blib2to3.pgen2.grammar import Grammar

__author__ = "Guido van Rossum <guido@python.org>"

import sys
from io import StringIO

HUGE: int = 0x7FFFFFFF  # maximum repeat count, default max

_type_reprs: Dict[int, Union[str, int]] = {}


def type_repr(type_num: int) -> Union[str, int]:
    global _type_reprs
    if not _type_reprs:
        from .pygram import python_symbols

        # printing tokens is possible but not as useful
        # from .pgen2 import token // token.__dict__.items():
        for name in dir(python_symbols):
            val = getattr(python_symbols, name)
            if type(val) == int:
                _type_reprs[val] = name
    return _type_reprs.setdefault(type_num, type_num)


_P = TypeVar("_P", bound="Base")

NL = Union["Node", "Leaf"]
Context = Tuple[str, Tuple[int, int]]
RawNode = Tuple[int, Optional[str], Optional[Context], Optional[List[NL]]]


class Base:
    """
    Abstract base class for Node and Leaf.

    This provides some default functionality and boilerplate using the
    template pattern.

    A node may be a subnode of at most one parent.
    """

    # Default values for instance variables
    type: int  # int: token number (< 256) or symbol number (>= 256)
    parent: Optional["Node"] = None  # Parent node pointer, or None
    children: List[NL]  # List of subnodes
    was_changed: bool = False
    was_checked: bool = False

    def __new__(cls, *args, **kwds):
        """Constructor that prevents Base from being instantiated."""
        assert cls is not Base, "Cannot instantiate Base"
        return object.__new__(cls)

    def __eq__(self, other: Any) -> bool:
        """
        Compare two nodes for equality.

        This calls the method _eq().
        """
        if self.__class__ is not other.__class__:
            return NotImplemented
        return self._eq(other)

    @property
    def prefix(self) -> str:
        raise NotImplementedError

    def _eq(self: _P, other: _P) -> bool:
        """
        Compare two nodes for equality.

        This is called by __eq__ and __ne__.  It is only called if the two nodes
        have the same type.  This must be implemented by the concrete subclass.
        Nodes should be considered equal if they have the same structure,
        ignoring the prefix string and other context information.
        """
        raise NotImplementedError

    def __deepcopy__(self: _P, memo: Any) -> _P:
        return self.clone()

    def clone(self: _P) -> _P:
        """
        Return a cloned (deep) copy of self.

        This must be implemented by the concrete subclass.
        """
        raise NotImplementedError

    def post_order(self) -> Iterator[NL]:
        """
        Return a post-order iterator for the tree.

        This must be implemented by the concrete subclass.
        """
        raise NotImplementedError

    def pre_order(self) -> Iterator[NL]:
        """
        Return a pre-order iterator for the tree.

        This must be implemented by the concrete subclass.
        """
        raise NotImplementedError

    def replace(self, new: Union[NL, List[NL]]) -> None:
        """Replace this node with a new one in the parent."""
        assert self.parent is not None, str(self)
        assert new is not None
        if not isinstance(new, list):
            new = [new]
        l_children = []
        found = False
        for ch in self.parent.children:
            if ch is self:
                assert not found, (self.parent.children, self, new)
                if new is not None:
                    l_children.extend(new)
                found = True
            else:
                l_children.append(ch)
        assert found, (self.children, self, new)
        self.parent.children = l_children
        self.parent.changed()
        self.parent.invalidate_sibling_maps()
        for x in new:
            x.parent = self.parent
        self.parent = None

    def get_lineno(self) -> Optional[int]:
        """Return the line number which generated the invocant node."""
        node = self
        while not isinstance(node, Leaf):
            if not node.children:
                return None
            node = node.children[0]
        return node.lineno

    def changed(self) -> None:
        if self.was_changed:
            return
        if self.parent:
            self.parent.changed()
        self.was_changed = True

    def remove(self) -> Optional[int]:
        """
        Remove the node from the tree. Returns the position of the node in its
        parent's children before it was removed.
        """
        if self.parent:
            for i, node in enumerate(self.parent.children):
                if node is self:
                    del self.parent.children[i]
                    self.parent.changed()
                    self.parent.invalidate_sibling_maps()
                    self.parent = None
                    return i
        return None

    @property
    def next_sibling(self) -> Optional[NL]:
        """
        The node immediately following the invocant in their parent's children
        list. If the invocant does not have a next sibling, it is None
        """
        if self.parent is None:
            return None

        if self.parent.next_sibling_map is None:
            self.parent.update_sibling_maps()
        assert self.parent.next_sibling_map is not None
        return self.parent.next_sibling_map[id(self)]

    @property
    def prev_sibling(self) -> Optional[NL]:
        """
        The node immediately preceding the invocant in their parent's children
        list. If the invocant does not have a previous sibling, it is None.
        """
        if self.parent is None:
            return None

        if self.parent.prev_sibling_map is None:
            self.parent.update_sibling_maps()
        assert self.parent.prev_sibling_map is not None
        return self.parent.prev_sibling_map[id(self)]

    def leaves(self) -> Iterator["Leaf"]:
        for child in self.children:
            yield from child.leaves()

    def depth(self) -> int:
        if self.parent is None:
            return 0
        return 1 + self.parent.depth()

    def get_suffix(self) -> str:
        """
        Return the string immediately following the invocant node. This is
        effectively equivalent to node.next_sibling.prefix
        """
        next_sib = self.next_sibling
        if next_sib is None:
            return ""
        prefix = next_sib.prefix
        return prefix


class Node(Base):
    """Concrete implementation for interior nodes."""

    fixers_applied: Optional[List[Any]]
    used_names: Optional[Set[str]]

    def __init__(
        self,
        type: int,
        children: List[NL],
        context: Optional[Any] = None,
        prefix: Optional[str] = None,
        fixers_applied: Optional[List[Any]] = None,
    ) -> None:
        """
        Initializer.

        Takes a type constant (a symbol number >= 256), a sequence of
        child nodes, and an optional context keyword argument.

        As a side effect, the parent pointers of the children are updated.
        """
        assert type >= 256, type
        self.type = type
        self.children = list(children)
        for ch in self.children:
            assert ch.parent is None, repr(ch)
            ch.parent = self
        self.invalidate_sibling_maps()
        if prefix is not None:
            self.prefix = prefix
        if fixers_applied:
            self.fixers_applied = fixers_applied[:]
        else:
            self.fixers_applied = None

    def __repr__(self) -> str:
        """Return a canonical string representation."""
        assert self.type is not None
        return "{}({}, {!r})".format(
            self.__class__.__name__,
            type_repr(self.type),
            self.children,
        )

    def __str__(self) -> str:
        """
        Return a pretty string representation.

        This reproduces the input source exactly.
        """
        return "".join(map(str, self.children))

    def _eq(self, other: Base) -> bool:
        """Compare two nodes for equality."""
        return (self.type, self.children) == (other.type, other.children)

    def clone(self) -> "Node":
        assert self.type is not None
        """Return a cloned (deep) copy of self."""
        return Node(
            self.type,
            [ch.clone() for ch in self.children],
            fixers_applied=self.fixers_applied,
        )

    def post_order(self) -> Iterator[NL]:
        """Return a post-order iterator for the tree."""
        for child in self.children:
            yield from child.post_order()
        yield self

    def pre_order(self) -> Iterator[NL]:
        """Return a pre-order iterator for the tree."""
        yield self
        for child in self.children:
            yield from child.pre_order()

    @property
    def prefix(self) -> str:
        """
        The whitespace and comments preceding this node in the input.
        """
        if not self.children:
            return ""
        return self.children[0].prefix

    @prefix.setter
    def prefix(self, prefix: str) -> None:
        if self.children:
            self.children[0].prefix = prefix

    def set_child(self, i: int, child: NL) -> None:
        """
        Equivalent to 'node.children[i] = child'. This method also sets the
        child's parent attribute appropriately.
        """
        child.parent = self
        self.children[i].parent = None
        self.children[i] = child
        self.changed()
        self.invalidate_sibling_maps()

    def insert_child(self, i: int, child: NL) -> None:
        """
        Equivalent to 'node.children.insert(i, child)'. This method also sets
        the child's parent attribute appropriately.
        """
        child.parent = self
        self.children.insert(i, child)
        self.changed()
        self.invalidate_sibling_maps()

    def append_child(self, child: NL) -> None:
        """
        Equivalent to 'node.children.append(child)'. This method also sets the
        child's parent attribute appropriately.
        """
        child.parent = self
        self.children.append(child)
        self.changed()
        self.invalidate_sibling_maps()

    def invalidate_sibling_maps(self) -> None:
        self.prev_sibling_map: Optional[Dict[int, Optional[NL]]] = None
        self.next_sibling_map: Optional[Dict[int, Optional[NL]]] = None

    def update_sibling_maps(self) -> None:
        _prev: Dict[int, Optional[NL]] = {}
        _next: Dict[int, Optional[NL]] = {}
        self.prev_sibling_map = _prev
        self.next_sibling_map = _next
        previous: Optional[NL] = None
        for current in self.children:
            _prev[id(current)] = previous
            _next[id(previous)] = current
            previous = current
        _next[id(current)] = None


class Leaf(Base):
    """Concrete implementation for leaf nodes."""

    # Default values for instance variables
    value: str
    fixers_applied: List[Any]
    bracket_depth: int
    # Changed later in brackets.py
    opening_bracket: Optional["Leaf"] = None
    used_names: Optional[Set[str]]
    _prefix = ""  # Whitespace and comments preceding this token in the input
    lineno: int = 0  # Line where this token starts in the input
    column: int = 0  # Column where this token starts in the input
    # If not None, this Leaf is created by converting a block of fmt off/skip
    # code, and `fmt_pass_converted_first_leaf` points to the first Leaf in the
    # converted code.
    fmt_pass_converted_first_leaf: Optional["Leaf"] = None

    def __init__(
        self,
        type: int,
        value: str,
        context: Optional[Context] = None,
        prefix: Optional[str] = None,
        fixers_applied: List[Any] = [],
        opening_bracket: Optional["Leaf"] = None,
        fmt_pass_converted_first_leaf: Optional["Leaf"] = None,
    ) -> None:
        """
        Initializer.

        Takes a type constant (a token number < 256), a string value, and an
        optional context keyword argument.
        """

        assert 0 <= type < 256, type
        if context is not None:
            self._prefix, (self.lineno, self.column) = context
        self.type = type
        self.value = value
        if prefix is not None:
            self._prefix = prefix
        self.fixers_applied: Optional[List[Any]] = fixers_applied[:]
        self.children = []
        self.opening_bracket = opening_bracket
        self.fmt_pass_converted_first_leaf = fmt_pass_converted_first_leaf

    def __repr__(self) -> str:
        """Return a canonical string representation."""
        from .pgen2.token import tok_name

        assert self.type is not None
        return "{}({}, {!r})".format(
            self.__class__.__name__,
            tok_name.get(self.type, self.type),
            self.value,
        )

    def __str__(self) -> str:
        """
        Return a pretty string representation.

        This reproduces the input source exactly.
        """
        return self._prefix + str(self.value)

    def _eq(self, other: "Leaf") -> bool:
        """Compare two nodes for equality."""
        return (self.type, self.value) == (other.type, other.value)

    def clone(self) -> "Leaf":
        assert self.type is not None
        """Return a cloned (deep) copy of self."""
        return Leaf(
            self.type,
            self.value,
            (self.prefix, (self.lineno, self.column)),
            fixers_applied=self.fixers_applied,
        )

    def leaves(self) -> Iterator["Leaf"]:
        yield self

    def post_order(self) -> Iterator["Leaf"]:
        """Return a post-order iterator for the tree."""
        yield self

    def pre_order(self) -> Iterator["Leaf"]:
        """Return a pre-order iterator for the tree."""
        yield self

    @property
    def prefix(self) -> str:
        """
        The whitespace and comments preceding this token in the input.
        """
        return self._prefix

    @prefix.setter
    def prefix(self, prefix: str) -> None:
        self.changed()
        self._prefix = prefix


def convert(gr: Grammar, raw_node: RawNode) -> NL:
    """
    Convert raw node information to a Node or Leaf instance.

    This is passed to the parser driver which calls it whenever a reduction of a
    grammar rule produces a new complete node, so that the tree is build
    strictly bottom-up.
    """
    type, value, context, children = raw_node
    if children or type in gr.number2symbol:
        # If there's exactly one child, return that child instead of
        # creating a new node.
        assert children is not None
        if len(children) == 1:
            return children[0]
        return Node(type, children, context=context)
    else:
        return Leaf(type, value or "", context=context)


_Results = Dict[str, NL]


class BasePattern:
    """
    A pattern is a tree matching pattern.

    It looks for a specific node type (token or symbol), and
    optionally for a specific content.

    This is an abstract base class.  There are three concrete
    subclasses:

    - LeafPattern matches a single leaf node;
    - NodePattern matches a single node (usually non-leaf);
    - WildcardPattern matches a sequence of nodes of variable length.
    """

    # Defaults for instance variables
    type: Optional[int]
    type = None  # Node type (token if < 256, symbol if >= 256)
    content: Any = None  # Optional content matching pattern
    name: Optional[str] = None  # Optional name used to store match in results dict

    def __new__(cls, *args, **kwds):
        """Constructor that prevents BasePattern from being instantiated."""
        assert cls is not BasePattern, "Cannot instantiate BasePattern"
        return object.__new__(cls)

    def __repr__(self) -> str:
        assert self.type is not None
        args = [type_repr(self.type), self.content, self.name]
        while args and args[-1] is None:
            del args[-1]
        return "{}({})".format(self.__class__.__name__, ", ".join(map(repr, args)))

    def _submatch(self, node, results=None) -> bool:
        raise NotImplementedError

    def optimize(self) -> "BasePattern":
        """
        A subclass can define this as a hook for optimizations.

        Returns either self or another node with the same effect.
        """
        return self

    def match(self, node: NL, results: Optional[_Results] = None) -> bool:
        """
        Does this pattern exactly match a node?

        Returns True if it matches, False if not.

        If results is not None, it must be a dict which will be
        updated with the nodes matching named subpatterns.

        Default implementation for non-wildcard patterns.
        """
        if self.type is not None and node.type != self.type:
            return False
        if self.content is not None:
            r: Optional[_Results] = None
            if results is not None:
                r = {}
            if not self._submatch(node, r):
                return False
            if r:
                assert results is not None
                results.update(r)
        if results is not None and self.name:
            results[self.name] = node
        return True

    def match_seq(self, nodes: List[NL], results: Optional[_Results] = None) -> bool:
        """
        Does this pattern exactly match a sequence of nodes?

        Default implementation for non-wildcard patterns.
        """
        if len(nodes) != 1:
            return False
        return self.match(nodes[0], results)

    def generate_matches(self, nodes: List[NL]) -> Iterator[Tuple[int, _Results]]:
        """
        Generator yielding all matches for this pattern.

        Default implementation for non-wildcard patterns.
        """
        r: _Results = {}
        if nodes and self.match(nodes[0], r):
            yield 1, r


class LeafPattern(BasePattern):
    def __init__(
        self,
        type: Optional[int] = None,
        content: Optional[str] = None,
        name: Optional[str] = None,
    ) -> None:
        """
        Initializer.  Takes optional type, content, and name.

        The type, if given must be a token type (< 256).  If not given,
        this matches any *leaf* node; the content may still be required.

        The content, if given, must be a string.

        If a name is given, the matching node is stored in the results
        dict under that key.
        """
        if type is not None:
            assert 0 <= type < 256, type
        if content is not None:
            assert isinstance(content, str), repr(content)
        self.type = type
        self.content = content
        self.name = name

    def match(self, node: NL, results=None) -> bool:
        """Override match() to insist on a leaf node."""
        if not isinstance(node, Leaf):
            return False
        return BasePattern.match(self, node, results)

    def _submatch(self, node, results=None):
        """
        Match the pattern's content to the node's children.

        This assumes the node type matches and self.content is not None.

        Returns True if it matches, False if not.

        If results is not None, it must be a dict which will be
        updated with the nodes matching named subpatterns.

        When returning False, the results dict may still be updated.
        """
        return self.content == node.value


class NodePattern(BasePattern):
    wildcards: bool = False

    def __init__(
        self,
        type: Optional[int] = None,
        content: Optional[Iterable[str]] = None,
        name: Optional[str] = None,
    ) -> None:
        """
        Initializer.  Takes optional type, content, and name.

        The type, if given, must be a symbol type (>= 256).  If the
        type is None this matches *any* single node (leaf or not),
        except if content is not None, in which it only matches
        non-leaf nodes that also match the content pattern.

        The content, if not None, must be a sequence of Patterns that
        must match the node's children exactly.  If the content is
        given, the type must not be None.

        If a name is given, the matching node is stored in the results
        dict under that key.
        """
        if type is not None:
            assert type >= 256, type
        if content is not None:
            assert not isinstance(content, str), repr(content)
            newcontent = list(content)
            for i, item in enumerate(newcontent):
                assert isinstance(item, BasePattern), (i, item)
                # I don't even think this code is used anywhere, but it does cause
                # unreachable errors from mypy. This function's signature does look
                # odd though *shrug*.
                if isinstance(item, WildcardPattern):  # type: ignore[unreachable]
                    self.wildcards = True  # type: ignore[unreachable]
        self.type = type
        self.content = newcontent  # TODO: this is unbound when content is None
        self.name = name

    def _submatch(self, node, results=None) -> bool:
        """
        Match the pattern's content to the node's children.

        This assumes the node type matches and self.content is not None.

        Returns True if it matches, False if not.

        If results is not None, it must be a dict which will be
        updated with the nodes matching named subpatterns.

        When returning False, the results dict may still be updated.
        """
        if self.wildcards:
            for c, r in generate_matches(self.content, node.children):
                if c == len(node.children):
                    if results is not None:
                        results.update(r)
                    return True
            return False
        if len(self.content) != len(node.children):
            return False
        for subpattern, child in zip(self.content, node.children):
            if not subpattern.match(child, results):
                return False
        return True


class WildcardPattern(BasePattern):
    """
    A wildcard pattern can match zero or more nodes.

    This has all the flexibility needed to implement patterns like:

    .*      .+      .?      .{m,n}
    (a b c | d e | f)
    (...)*  (...)+  (...)?  (...){m,n}

    except it always uses non-greedy matching.
    """

    min: int
    max: int

    def __init__(
        self,
        content: Optional[str] = None,
        min: int = 0,
        max: int = HUGE,
        name: Optional[str] = None,
    ) -> None:
        """
        Initializer.

        Args:
            content: optional sequence of subsequences of patterns;
                     if absent, matches one node;
                     if present, each subsequence is an alternative [*]
            min: optional minimum number of times to match, default 0
            max: optional maximum number of times to match, default HUGE
            name: optional name assigned to this match

        [*] Thus, if content is [[a, b, c], [d, e], [f, g, h]] this is
            equivalent to (a b c | d e | f g h); if content is None,
            this is equivalent to '.' in regular expression terms.
            The min and max parameters work as follows:
                min=0, max=maxint: .*
                min=1, max=maxint: .+
                min=0, max=1: .?
                min=1, max=1: .
            If content is not None, replace the dot with the parenthesized
            list of alternatives, e.g. (a b c | d e | f g h)*
        """
        assert 0 <= min <= max <= HUGE, (min, max)
        if content is not None:
            f = lambda s: tuple(s)
            wrapped_content = tuple(map(f, content))  # Protect against alterations
            # Check sanity of alternatives
            assert len(wrapped_content), repr(
                wrapped_content
            )  # Can't have zero alternatives
            for alt in wrapped_content:
                assert len(alt), repr(alt)  # Can have empty alternatives
        self.content = wrapped_content
        self.min = min
        self.max = max
        self.name = name

    def optimize(self) -> Any:
        """Optimize certain stacked wildcard patterns."""
        subpattern = None
        if (
            self.content is not None
            and len(self.content) == 1
            and len(self.content[0]) == 1
        ):
            subpattern = self.content[0][0]
        if self.min == 1 and self.max == 1:
            if self.content is None:
                return NodePattern(name=self.name)
            if subpattern is not None and self.name == subpattern.name:
                return subpattern.optimize()
        if (
            self.min <= 1
            and isinstance(subpattern, WildcardPattern)
            and subpattern.min <= 1
            and self.name == subpattern.name
        ):
            return WildcardPattern(
                subpattern.content,
                self.min * subpattern.min,
                self.max * subpattern.max,
                subpattern.name,
            )
        return self

    def match(self, node, results=None) -> bool:
        """Does this pattern exactly match a node?"""
        return self.match_seq([node], results)

    def match_seq(self, nodes, results=None) -> bool:
        """Does this pattern exactly match a sequence of nodes?"""
        for c, r in self.generate_matches(nodes):
            if c == len(nodes):
                if results is not None:
                    results.update(r)
                    if self.name:
                        results[self.name] = list(nodes)
                return True
        return False

    def generate_matches(self, nodes) -> Iterator[Tuple[int, _Results]]:
        """
        Generator yielding matches for a sequence of nodes.

        Args:
            nodes: sequence of nodes

        Yields:
            (count, results) tuples where:
            count: the match comprises nodes[:count];
            results: dict containing named submatches.
        """
        if self.content is None:
            # Shortcut for special case (see __init__.__doc__)
            for count in range(self.min, 1 + min(len(nodes), self.max)):
                r = {}
                if self.name:
                    r[self.name] = nodes[:count]
                yield count, r
        elif self.name == "bare_name":
            yield self._bare_name_matches(nodes)
        else:
            # The reason for this is that hitting the recursion limit usually
            # results in some ugly messages about how RuntimeErrors are being
            # ignored. We only have to do this on CPython, though, because other
            # implementations don't have this nasty bug in the first place.
            if hasattr(sys, "getrefcount"):
                save_stderr = sys.stderr
                sys.stderr = StringIO()
            try:
                for count, r in self._recursive_matches(nodes, 0):
                    if self.name:
                        r[self.name] = nodes[:count]
                    yield count, r
            except RuntimeError:
                # We fall back to the iterative pattern matching scheme if the recursive
                # scheme hits the recursion limit.
                for count, r in self._iterative_matches(nodes):
                    if self.name:
                        r[self.name] = nodes[:count]
                    yield count, r
            finally:
                if hasattr(sys, "getrefcount"):
                    sys.stderr = save_stderr

    def _iterative_matches(self, nodes) -> Iterator[Tuple[int, _Results]]:
        """Helper to iteratively yield the matches."""
        nodelen = len(nodes)
        if 0 >= self.min:
            yield 0, {}

        results = []
        # generate matches that use just one alt from self.content
        for alt in self.content:
            for c, r in generate_matches(alt, nodes):
                yield c, r
                results.append((c, r))

        # for each match, iterate down the nodes
        while results:
            new_results = []
            for c0, r0 in results:
                # stop if the entire set of nodes has been matched
                if c0 < nodelen and c0 <= self.max:
                    for alt in self.content:
                        for c1, r1 in generate_matches(alt, nodes[c0:]):
                            if c1 > 0:
                                r = {}
                                r.update(r0)
                                r.update(r1)
                                yield c0 + c1, r
                                new_results.append((c0 + c1, r))
            results = new_results

    def _bare_name_matches(self, nodes) -> Tuple[int, _Results]:
        """Special optimized matcher for bare_name."""
        count = 0
        r = {}  # type: _Results
        done = False
        max = len(nodes)
        while not done and count < max:
            done = True
            for leaf in self.content:
                if leaf[0].match(nodes[count], r):
                    count += 1
                    done = False
                    break
        assert self.name is not None
        r[self.name] = nodes[:count]
        return count, r

    def _recursive_matches(self, nodes, count) -> Iterator[Tuple[int, _Results]]:
        """Helper to recursively yield the matches."""
        assert self.content is not None
        if count >= self.min:
            yield 0, {}
        if count < self.max:
            for alt in self.content:
                for c0, r0 in generate_matches(alt, nodes):
                    for c1, r1 in self._recursive_matches(nodes[c0:], count + 1):
                        r = {}
                        r.update(r0)
                        r.update(r1)
                        yield c0 + c1, r


class NegatedPattern(BasePattern):
    def __init__(self, content: Optional[BasePattern] = None) -> None:
        """
        Initializer.

        The argument is either a pattern or None.  If it is None, this
        only matches an empty sequence (effectively '$' in regex
        lingo).  If it is not None, this matches whenever the argument
        pattern doesn't have any matches.
        """
        if content is not None:
            assert isinstance(content, BasePattern), repr(content)
        self.content = content

    def match(self, node, results=None) -> bool:
        # We never match a node in its entirety
        return False

    def match_seq(self, nodes, results=None) -> bool:
        # We only match an empty sequence of nodes in its entirety
        return len(nodes) == 0

    def generate_matches(self, nodes: List[NL]) -> Iterator[Tuple[int, _Results]]:
        if self.content is None:
            # Return a match if there is an empty sequence
            if len(nodes) == 0:
                yield 0, {}
        else:
            # Return a match if the argument pattern has no matches
            for c, r in self.content.generate_matches(nodes):
                return
            yield 0, {}


def generate_matches(
    patterns: List[BasePattern], nodes: List[NL]
) -> Iterator[Tuple[int, _Results]]:
    """
    Generator yielding matches for a sequence of patterns and nodes.

    Args:
        patterns: a sequence of patterns
        nodes: a sequence of nodes

    Yields:
        (count, results) tuples where:
        count: the entire sequence of patterns matches nodes[:count];
        results: dict containing named submatches.
    """
    if not patterns:
        yield 0, {}
    else:
        p, rest = patterns[0], patterns[1:]
        for c0, r0 in p.generate_matches(nodes):
            if not rest:
                yield c0, r0
            else:
                for c1, r1 in generate_matches(rest, nodes[c0:]):
                    r = {}
                    r.update(r0)
                    r.update(r1)
                    yield c0 + c1, r
