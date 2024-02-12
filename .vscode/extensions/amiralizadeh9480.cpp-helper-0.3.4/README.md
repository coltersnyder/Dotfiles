# C++ Helper

![Screen Shot](https://github.com/amir9480/vscode-cpp-helper/raw/HEAD/images/screenshot.gif)
C++ Helper extension for [VSCode](https://code.visualstudio.com/).

## Features
* Generating implementation for c++ declarations.
* Generating header guard for headers.

## Configuration

### CppHelper.SourcePattern:
The array of possible patterns to find the source of a header file.

Example:
```json
"CppHelper.SourcePattern": [
    "{FILE}.cpp",
    "{FILE}.c",
    "{FILE}.inl",
    "/src/{FILE}.cpp"
]
```
Where {FILE} is your active header file name.
> If you don't want a relative pattern then put a `/` as first character.

### CppHelper.HeaderGuardPattern:
The pattern of header guard.
Example:
```json
"CppHelper.HeaderGuardPattern": "{FILE}_H"
```
Where {FILE} is your active header file name in UPPERCASE format.

### CppHelper.ContextCreateImplementation
Show or hide "Create Implementation" in context menu.

### CppHelper.ContextCreateImplementationHere
Show or hide "Create Implementation Here" in context menu.

### CppHelper.ContextCopyImplementation
Show or hide "Copy Implementation" in context menu.

### CppHelper.ContextCreateHeaderGuard
Show or hide "Create Header Guard" in context menu.

### CppHelper.SourceNotFoundBehavior
What happen if source file of a header file not found.
* Implement in same file
* Create source file
* Show error
* Do nothing

### CppHelper.FindReplaceStrings
Pairs of strings to find/replace within the path

Example:
```json
"CppHelper.FindReplaceStrings": [
    {
        "find": "/include/Public",
        "replace": "/src/Private"
    }
],
```
Above configuration will replace all `/include/Public` in your path to `/src/Private` when trying to find source code of header file.
You can also use regular expressions.
```json
"CppHelper.FindReplaceStrings": [
    {
        "find": "/include/Public/([^\\/]+)",
        "replace": "/src/Private/$1"
    }
],
```

## Known Issues
If you implement a previously implemented function duplicate implementation will happen.

This extension created using regex and there is no parser/compiler.
so any wrong implementation may happen.
If you found any wrong implementation please let me know in [issues](https://github.com/amir9480/vscode-cpp-helper/issues) and also don't forget to send your code sample.

## Change Log

### 0.3.3
Add new `CppHelper.FindReplaceStrings` configuration (#70)

### 0.3.1
* Bug fixes (#49, [#47](https://github.com/amir9480/vscode-cpp-helper/issues/47), [#41](https://github.com/amir9480/vscode-cpp-helper/issues/41))

### 0.3.0
* Add functions and classes attributes support.
* Fix default parameter with parentheses bug (#35).
* Fix trailing parameters comment issue (#31).

### 0.2.1
* Fix code indent bug when EOL was `LF`.
* Fix member `operator +`, `operator -` bug.
* Cast operator support added.

### 0.2.0
* Fix bugs (#12, [#13](https://github.com/amir9480/vscode-cpp-helper/issues/13)).
* `Copy Implementation` to clipboard command added (#11).
* Create source file if not found (#14).
* Improved order of implementation.

### 0.1.0
* Add `Create Implementation Here` command. (#7)
* Add setting to hide context menu items.

### 0.0.7
* Bug [#5](https://github.com/amir9480/vscode-cpp-helper/issues/5) fixed.

### 0.0.6
* Bug [#4](https://github.com/amir9480/vscode-cpp-helper/issues/4) fixed.

### 0.0.5
* Fix bug in Linux. (#1, [#2](https://github.com/amir9480/vscode-cpp-helper/issues/2))

### 0.0.4
* Argument with default value implementation bug fixed.
* Class template specialization support added.
* Regex to find previous implementation improved.
* Bug with `operator()` fixed.
* `SourcePattern` configuration bug fixed.

### 0.0.3
* Keeping the order of implementations synced to declarations as much as possible.

