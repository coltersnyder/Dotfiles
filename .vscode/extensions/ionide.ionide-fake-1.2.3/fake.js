var vscode = require('vscode')
var child_process = require('child_process');
var toml = require('toml');
var fs = require('fs');
var window = {
                    JSON: JSON,
                    console: console,
                    Promise : Promise,
                    process: process,
                    setTimeout: setTimeout,
                    clearTimeout: clearTimeout };


function wrappedFunScript() { 
var list_1_String____NilString___, list_1_String____ConsString___, UnfoldEnumerator_2_Int32__String_____ctor$Int32_String___, UnfoldEnumerator_2_Int32__Match___ctor$Int32_Match_1, UnfoldEnumerator_2_Int32__BuildData___ctor$Int32_BuildData_, UnfoldEnumerator_2_IEnumerator_1_BuildData__String___ctor$IEnumerator_1_BuildData__String, UnfoldEnumerator_2_IEnumerator_1_BuildData__BuildData___ctor$IEnumerator_1_BuildData__BuildData_, UnfoldEnumerator_2_FSharpList_1_String____String_____ctor$FSharpList_1_String____String___, TupleString____Int32, TupleString____FSharpList_1_String___, TupleString_String, TupleString_IEnumerator_1_BuildData_, TupleMatch_1_Int32, TupleBuildData__Int32, TupleBuildData__IEnumerator_1_BuildData_, String_1_SplitWithoutOptions$, String_1_PrintFormatToString$, Settings__loadOrDefault$String_String, Seq__Where$BuildData_BuildData_, Seq__Unfold$Int32__String___Int32_String___, Seq__Unfold$Int32__Match_1Int32_Match_1, Seq__Unfold$Int32__BuildData_Int32_BuildData_, Seq__Unfold$IEnumerator_1_BuildData__String_IEnumerator_1_BuildData__String, Seq__Unfold$IEnumerator_1_BuildData__BuildData_IEnumerator_1_BuildData__BuildData_, Seq__Unfold$FSharpList_1_String____String___FSharpList_1_String____String___, Seq__TryPickIndexedAux$BuildData__BuildData_BuildData__BuildData_, Seq__TryPickIndexed$BuildData__BuildData_BuildData__BuildData_, Seq__TryFindIndexed$BuildData_BuildData_, Seq__ToArray$String___String___, Seq__ToArray$String_String, Seq__ToArray$Match_1Match_1, Seq__OfList$String___String___, Seq__OfArray$String___String___, Seq__Map$BuildData__String_BuildData__String, Seq__IterateIndexed$String___String___, Seq__IterateIndexed$String_String, Seq__IterateIndexed$Match_1Match_1, Seq__FromFactory$String___String___, Seq__FromFactory$String_String, Seq__FromFactory$Match_1Match_1, Seq__FromFactory$BuildData_BuildData_, Seq__FoldIndexedAux$Unit__String___Unit__String___, Seq__FoldIndexedAux$Unit__String_Unit__String, Seq__FoldIndexedAux$Unit__Match_1Unit__Match_1, Seq__FoldIndexed$String____Unit_String____Unit_, Seq__FoldIndexed$String__Unit_String_Unit_, Seq__FoldIndexed$Match_1_Unit_Match_1_Unit_, Seq__FindIndexed$BuildData_BuildData_, Seq__Find$BuildData_BuildData_, Seq__Filter$BuildData_BuildData_, Seq__Enumerator$String___String___, Seq__Enumerator$String_String, Seq__Enumerator$Match_1Match_1, Seq__Enumerator$BuildData_BuildData_, Seq__Delay$String_String, Seq__Delay$BuildData_BuildData_, Seq__Cast$Match_1Match_1, ResizeArray__ToSeq$BuildData_BuildData_, ResizeArray_1_Object__get_Item$Object_, ResizeArray_1_Object__get_Count$Object_, Regex__MatchesWithOffset$, Regex__MatchesStatic$, Regex__Matches$, Regex__MatchCollectionToSeq$, Regex__Create$, Promise__toPromise$String_String, Promise__success$String__Unit_String_Unit_, Promise__lift$String___String___, Promise__lift$String_String, Process__spawnWithNotification$, Process__spawn$, Process__onOutput$Unit_Unit_, Process__onError$Unit_Unit_, Process__isWin$, Option__IsSome$Int32_Int32, Option__IsSome$IEnumerator_1_BuildData_IEnumerator_1_BuildData_, Option__IsSome$FSharpList_1_String___FSharpList_1_String___, Option__IsSome$DateTime_1DateTime_1, Option__IsNone$DateTime_1DateTime_1, Option__GetValue$Tuple_2_String____Int32_Tuple_2_String____Int32_, Option__GetValue$Tuple_2_String____FSharpList_1_String___Tuple_2_String____FSharpList_1_String___, Option__GetValue$Tuple_2_String__IEnumerator_1_BuildData_Tuple_2_String__IEnumerator_1_BuildData_, Option__GetValue$Tuple_2_Match__Int32_Tuple_2_Match__Int32_, Option__GetValue$Tuple_2_BuildData__Int32_Tuple_2_BuildData__Int32_, Option__GetValue$Tuple_2_BuildData__IEnumerator_1_BuildData_Tuple_2_BuildData__IEnumerator_1_BuildData_, Option__GetValue$Int32_Int32, Option__GetValue$IEnumerator_1_BuildData_IEnumerator_1_BuildData_, Option__GetValue$FSharpList_1_String___FSharpList_1_String___, Option__GetValue$BuildData_BuildData_, Match__get_Groups$, MatchCollection__get_Item$, MatchCollection__get_Count$, List__Tail$String___String___, List__Head$String___String___, List__Empty$String___String___, List__CreateCons$String___String___, GroupCollection__get_Item$, Fake__activate$, Fake___ctor$, FakeService__startBuild$, FakeService__script, FakeService__outputChannel, FakeService__loadParameters$, FakeService__linuxPrefix, FakeService__get_script$, FakeService__get_outputChannel$, FakeService__get_linuxPrefix$, FakeService__get_command$, FakeService__get_BuildList$, FakeService__defaultHandle$, FakeService__command, FakeService__cancelHandle$, FakeService__cancelBuild$, FakeService__buildHandle$, FakeService__BuildList, FSharpString__emptyIfNull$, FSharpString__Exists$, DateTime__get_Now$, DateTime__createUnsafe$, CreateEnumerable_1_String___ctor$String, CreateEnumerable_1_String_____ctor$String___, CreateEnumerable_1_Match___ctor$Match_1, CreateEnumerable_1_BuildData___ctor$BuildData_, Capture__get_Value$, Capture__getValue$, BuildData___ctor$, Array__ZeroCreate$String___String___, Array__ZeroCreate$String_String, Array__ZeroCreate$Match_1Match_1, Array__MapIndexed$String__String___String_String___, Array__MapIndexed$Match_1_String_Match_1_String, Array__Map$String__String___String_String___, Array__Map$Match_1_String_Match_1_String, Array__Length$String_String, Array__Length$Match_1Match_1, Array__FoldIndexed$String____String_String____String, Array__Fold$String__String___String_String___, Array__ConcatImpl$String_String, Array__Concat$String_String, Array__BoxedLength$;
Array__BoxedLength$ = (function(xs)
{
    return xs.length;;
});
Array__Concat$String_String = (function(xs)
{
    return Array__ConcatImpl$String_String(Seq__ToArray$String___String___(xs));
});
Array__ConcatImpl$String_String = (function(xss)
{
    return [].concat.apply([], xss);;
});
Array__Fold$String__String___String_String___ = (function(f,seed,xs)
{
    return Array__FoldIndexed$String____String_String____String((function(_arg1)
    {
      return (function(acc)
      {
        return (function(x)
        {
          return f(acc)(x);
        });
      });
    }), seed, xs);
});
Array__FoldIndexed$String____String_String____String = (function(f,seed,xs)
{
    var acc = seed;
    for (var i = 0; i <= (Array__Length$String_String(xs) - 1); i++)
    {
      acc = f(i)(acc)(xs[i]);
      null;
    };
    return acc;
});
Array__Length$Match_1Match_1 = (function(xs)
{
    return xs.length;;
});
Array__Length$String_String = (function(xs)
{
    return xs.length;;
});
Array__Map$Match_1_String_Match_1_String = (function(f,xs)
{
    return Array__MapIndexed$Match_1_String_Match_1_String((function(_arg1)
    {
      return (function(x)
      {
        return f(x);
      });
    }), xs);
});
Array__Map$String__String___String_String___ = (function(f,xs)
{
    return Array__MapIndexed$String__String___String_String___((function(_arg1)
    {
      return (function(x)
      {
        return f(x);
      });
    }), xs);
});
Array__MapIndexed$Match_1_String_Match_1_String = (function(f,xs)
{
    var ys = Array__ZeroCreate$String_String(Array__Length$Match_1Match_1(xs));
    for (var i = 0; i <= (Array__Length$Match_1Match_1(xs) - 1); i++)
    {
      ys[i] = f(i)(xs[i]);
      null;
    };
    return ys;
});
Array__MapIndexed$String__String___String_String___ = (function(f,xs)
{
    var ys = Array__ZeroCreate$String___String___(Array__Length$String_String(xs));
    for (var i = 0; i <= (Array__Length$String_String(xs) - 1); i++)
    {
      ys[i] = f(i)(xs[i]);
      null;
    };
    return ys;
});
Array__ZeroCreate$Match_1Match_1 = (function(size)
{
    return new Array(size);;
});
Array__ZeroCreate$String_String = (function(size)
{
    return new Array(size);;
});
Array__ZeroCreate$String___String___ = (function(size)
{
    return new Array(size);;
});
BuildData___ctor$ = (function(Name,Start,End,Process)
{
    var __this = this;
    __this.Name = Name;
    __this.Start = Start;
    __this.End = End;
    __this.Process = Process;
});
Capture__getValue$ = (function(x)
{
    return Array.isArray(x) ? (x[0]) : x;
});
Capture__get_Value$ = (function(x,unitVar1)
{
    return Capture__getValue$(x);
});
CreateEnumerable_1_BuildData___ctor$BuildData_ = (function(factory)
{
    var __this = this;
    {};
    __this.factory = factory;
});
CreateEnumerable_1_Match___ctor$Match_1 = (function(factory)
{
    var __this = this;
    {};
    __this.factory = factory;
});
CreateEnumerable_1_String_____ctor$String___ = (function(factory)
{
    var __this = this;
    {};
    __this.factory = factory;
});
CreateEnumerable_1_String___ctor$String = (function(factory)
{
    var __this = this;
    {};
    __this.factory = factory;
});
DateTime__createUnsafe$ = (function(value,kind)
{
    var date = value == null ? new Date() : new Date(value);
    if (isNaN(date)) { throw "The string was not recognized as a valid DateTime." }
    date.kind = kind;
    return date;
});
DateTime__get_Now$ = (function(unitVar0)
{
    return DateTime__createUnsafe$(null, 2);
});
FSharpString__Exists$ = (function(f,str)
{
    var _str = FSharpString__emptyIfNull$(str);
    var check;
    check = (function(i)
    {
      return ((i < _str.length) && (f(_str.charAt(i)) || check((i + 1))));
    });
    return check(0);
});
FSharpString__emptyIfNull$ = (function(str)
{
    return str==null?"":str;;
});
FakeService__buildHandle$ = (function(unitVar0)
{
    FakeService__loadParameters$();
    return Promise__success$String__Unit_String_Unit_((function(target)
    {
      return FakeService__startBuild$(target);
    }), Promise__toPromise$String_String((vscode.window.showQuickPick(Promise__lift$String___String___(Array__Map$Match_1_String_Match_1_String((function(m)
    {
      return Capture__get_Value$(GroupCollection__get_Item$(Match__get_Groups$(m), 1));
    }), Seq__ToArray$Match_1Match_1(Seq__Cast$Match_1Match_1(Regex__MatchCollectionToSeq$((function(tupledArg)
    {
      var arg00 = tupledArg.Items[0.000000];
      var arg01 = tupledArg.Items[1.000000];
      return Regex__MatchesStatic$(arg00, arg01);
    })((function(n)
    {
      return (new TupleString_String((n.toString()), "Target \"([^\".]+)\""));
    })((fs.readFileSync(FakeService__script)))))))))))));
});
FakeService__cancelBuild$ = (function(target)
{
    var build = Seq__Find$BuildData_BuildData_((function(t)
    {
      return (t.Name == target);
    }), ResizeArray__ToSeq$BuildData_BuildData_(FakeService__BuildList));
    if (Process__isWin$()) 
    {
      var copyOfStruct = (build.Process.pid);
      var ignored0 = Process__spawn$("taskkill", "", (("/pid " + copyOfStruct.toString()) + " /f /t"));
    }
    else
    {
      (build.Process.kill());
    };
    build.End = {Tag: 1.000000, Value: DateTime__get_Now$()};
});
FakeService__cancelHandle$ = (function(unitVar0)
{
    var targets = Seq__ToArray$String_String(Seq__Map$BuildData__String_BuildData__String((function(n)
    {
      return n.Name;
    }), Seq__Where$BuildData_BuildData_((function(n)
    {
      return Option__IsNone$DateTime_1DateTime_1(n.End);
    }), ResizeArray__ToSeq$BuildData_BuildData_(FakeService__BuildList))));
    if ((Array__Length$String_String(targets) == 1)) 
    {
      return Promise__success$String__Unit_String_Unit_((function(target)
      {
        return FakeService__cancelBuild$(target);
      }), Promise__lift$String_String(targets[0]));
    }
    else
    {
      return Promise__success$String__Unit_String_Unit_((function(target)
      {
        return FakeService__cancelBuild$(target);
      }), Promise__toPromise$String_String((vscode.window.showQuickPick(Promise__lift$String___String___(targets)))));
    };
});
FakeService__defaultHandle$ = (function(unitVar0)
{
    FakeService__loadParameters$();
    return FakeService__startBuild$("");
});
FakeService__get_BuildList$ = (function()
{
    return [];
});
FakeService__get_command$ = (function()
{
    return "";
});
FakeService__get_linuxPrefix$ = (function()
{
    return "";
});
FakeService__get_outputChannel$ = (function()
{
    return (vscode.window.createOutputChannel("FAKE"));
});
FakeService__get_script$ = (function()
{
    return "";
});
FakeService__loadParameters$ = (function(unitVar0)
{
    var p = (vscode.workspace.rootPath);
    FakeService__linuxPrefix = Settings__loadOrDefault$String_String((function(s)
    {
      return s.Fake.linuxPrefix;
    }), "sh");
    var _45;
    if (Process__isWin$()) 
    {
      _45 = ((p + "/") + "build.cmd");
    }
    else
    {
      _45 = ((p + "/") + "build.sh");
    };
    FakeService__command = Settings__loadOrDefault$String_String((function(s)
    {
      return ((p + "/") + s.Fake.command);
    }), _45);
    FakeService__script = Settings__loadOrDefault$String_String((function(s)
    {
      return ((p + "/") + s.Fake.build);
    }), ((p + "/") + "build.fsx"));
});
FakeService__startBuild$ = (function(target)
{
    if ((target != undefined)) 
    {
      (FakeService__outputChannel.clear());
      var startedMessage = (vscode.window.setStatusBarMessage("Build started"));
      var fixSpaces = (function(s)
      {
        var x = " ";
        if (FSharpString__Exists$((function(y)
        {
          return (x == y);
        }), s)) 
        {
          var clo1 = String_1_PrintFormatToString$("\"%s\"");
          return (function(arg10)
          {
            return clo1(arg10);
          })(s);
        }
        else
        {
          return s;
        };
      });
      var proc = Process__spawnWithNotification$(FakeService__command, FakeService__linuxPrefix, fixSpaces(target), FakeService__outputChannel);
      var _487;
      if ((target == "")) 
      {
        _487 = "Default";
      }
      else
      {
        _487 = target;
      };
      var data = (new BuildData___ctor$(_487, DateTime__get_Now$(), {Tag: 0.000000}, proc));
      FakeService__BuildList.push(data);
      var cfg = (vscode.workspace.getConfiguration());
      if ((cfg.get("FAKE.autoshow", true))) 
      {
        (FakeService__outputChannel.show());
      }
      else
      {
        ;
      };
      var ignored0 = (proc.on("exit", (function(code)
      {
        var _ignored0 = (startedMessage.dispose());
        if ((code == "0")) 
        {
          var __ignored0 = (vscode.window.setStatusBarMessage("Build completed", 10000.000000));
        }
        else
        {
          var ___ignored0 = (vscode.window.showErrorMessage("Build failed"));
        };
        data.End = {Tag: 1.000000, Value: DateTime__get_Now$()};
      })));
    }
    else
    {
      ;
    };
});
Fake___ctor$ = (function(unitVar0)
{
    {};
});
Fake__activate$ = (function(x,state)
{
    var t = (vscode.workspace.rootPath);
    var ignored0 = (vscode.commands.registerCommand("fake.fakeBuild", (function(arg00_)
    {
      return FakeService__buildHandle$();
    })));
    var _ignored0 = (vscode.commands.registerCommand("fake.cancelBuild", (function(arg00_)
    {
      return FakeService__cancelHandle$();
    })));
    var __ignored0 = (vscode.commands.registerCommand("fake.buildDefault", (function(arg00_)
    {
      return FakeService__defaultHandle$();
    })));
});
GroupCollection__get_Item$ = (function(xs,i)
{
    return xs[i];
});
List__CreateCons$String___String___ = (function(x,xs)
{
    return (new list_1_String____ConsString___(x, xs));
});
List__Empty$String___String___ = (function()
{
    return (new list_1_String____NilString___());
});
List__Head$String___String___ = (function(_arg1)
{
    if ((_arg1.Tag == 1.000000)) 
    {
      var xs = _arg1.Item2;
      var x = _arg1.Item1;
      return x;
    }
    else
    {
      throw ("List was empty");
      return null;
    };
});
List__Tail$String___String___ = (function(_arg1)
{
    if ((_arg1.Tag == 1.000000)) 
    {
      var xs = _arg1.Item2;
      var x = _arg1.Item1;
      return xs;
    }
    else
    {
      throw ("List was empty");
      return null;
    };
});
MatchCollection__get_Count$ = (function(xs,unitVar1)
{
    return Array__BoxedLength$(xs);
});
MatchCollection__get_Item$ = (function(xs,i)
{
    return xs[i];
});
Match__get_Groups$ = (function(x,unitVar1)
{
    return x;
});
Option__GetValue$BuildData_BuildData_ = (function(option)
{
    return option.Value;;
});
Option__GetValue$FSharpList_1_String___FSharpList_1_String___ = (function(option)
{
    return option.Value;;
});
Option__GetValue$IEnumerator_1_BuildData_IEnumerator_1_BuildData_ = (function(option)
{
    return option.Value;;
});
Option__GetValue$Int32_Int32 = (function(option)
{
    return option.Value;;
});
Option__GetValue$Tuple_2_BuildData__IEnumerator_1_BuildData_Tuple_2_BuildData__IEnumerator_1_BuildData_ = (function(option)
{
    return option.Value;;
});
Option__GetValue$Tuple_2_BuildData__Int32_Tuple_2_BuildData__Int32_ = (function(option)
{
    return option.Value;;
});
Option__GetValue$Tuple_2_Match__Int32_Tuple_2_Match__Int32_ = (function(option)
{
    return option.Value;;
});
Option__GetValue$Tuple_2_String__IEnumerator_1_BuildData_Tuple_2_String__IEnumerator_1_BuildData_ = (function(option)
{
    return option.Value;;
});
Option__GetValue$Tuple_2_String____FSharpList_1_String___Tuple_2_String____FSharpList_1_String___ = (function(option)
{
    return option.Value;;
});
Option__GetValue$Tuple_2_String____Int32_Tuple_2_String____Int32_ = (function(option)
{
    return option.Value;;
});
Option__IsNone$DateTime_1DateTime_1 = (function(option)
{
    return (!Option__IsSome$DateTime_1DateTime_1(option));
});
Option__IsSome$DateTime_1DateTime_1 = (function(option)
{
    return ((option.Tag == 1.000000) && true);
});
Option__IsSome$FSharpList_1_String___FSharpList_1_String___ = (function(option)
{
    return ((option.Tag == 1.000000) && true);
});
Option__IsSome$IEnumerator_1_BuildData_IEnumerator_1_BuildData_ = (function(option)
{
    return ((option.Tag == 1.000000) && true);
});
Option__IsSome$Int32_Int32 = (function(option)
{
    return ((option.Tag == 1.000000) && true);
});
Process__isWin$ = (function(unitVar0)
{
    return (((window.process).platform) == "win32");
});
Process__onError$Unit_Unit_ = (function(f,proc)
{
    var ignored0 = ((proc.stderr).on("data", f));
    return proc;
});
Process__onOutput$Unit_Unit_ = (function(f,proc)
{
    var ignored0 = ((proc.stdout).on("data", f));
    return proc;
});
Process__spawn$ = (function(location,linuxCmd,cmd)
{
    var _140;
    if ((cmd == "")) 
    {
      _140 = [];
    }
    else
    {
      _140 = String_1_SplitWithoutOptions$(cmd, [" "]);
    };
    var cmd_ = _140;
    var options = ({});
    (options.cwd) = (vscode.workspace.rootPath);
    null;
    if ((Process__isWin$() || (linuxCmd == ""))) 
    {
      return (child_process.spawn(location, cmd_, options));
    }
    else
    {
      var prms = Array__Concat$String_String(Seq__OfList$String___String___(List__CreateCons$String___String___([location], List__CreateCons$String___String___(cmd_, List__Empty$String___String___()))));
      return (child_process.spawn(linuxCmd, prms, options));
    };
});
Process__spawnWithNotification$ = (function(location,linuxCmd,cmd,outputChannel)
{
    return Process__onError$Unit_Unit_((function(e)
    {
      return (outputChannel.append(e.toString()));
    }), Process__onOutput$Unit_Unit_((function(e)
    {
      return (outputChannel.append(e.toString()));
    }), Process__spawn$(location, linuxCmd, cmd)));
});
Promise__lift$String_String = (function(a)
{
    return ((window.Promise).resolve(a));
});
Promise__lift$String___String___ = (function(a)
{
    return ((window.Promise).resolve(a));
});
Promise__success$String__Unit_String_Unit_ = (function(a,pr)
{
    return (pr.then(a));
});
Promise__toPromise$String_String = (function(a)
{
    return a;
});
Regex__Create$ = (function(pattern)
{
    return (new RegExp(pattern, 'g' + ""));
});
Regex__MatchCollectionToSeq$ = (function(xs)
{
    return Seq__Unfold$Int32__Match_1Int32_Match_1((function(i)
    {
      if ((i < MatchCollection__get_Count$(xs))) 
      {
        return {Tag: 1.000000, Value: (new TupleMatch_1_Int32(MatchCollection__get_Item$(xs, i), (i + 1)))};
      }
      else
      {
        return {Tag: 0.000000};
      };
    }), 0);
});
Regex__Matches$ = (function(r,input)
{
    return Regex__MatchesWithOffset$(r, input, 0);
});
Regex__MatchesStatic$ = (function(input,pattern)
{
    var regex = Regex__Create$(pattern);
    return Regex__Matches$(regex, input);
});
Regex__MatchesWithOffset$ = (function(r,input,offset)
{
    if (!r.global) { throw "Non-global RegExp" }
    var m, matches = [];
    r.lastIndex = offset;
    while ((m = r.exec(input)) !== null) { matches.push(m) }
    return matches;
});
ResizeArray_1_Object__get_Count$Object_ = (function(xs,unitVar1)
{
    return xs.length;
});
ResizeArray_1_Object__get_Item$Object_ = (function(xs,index)
{
    return xs[index];
});
ResizeArray__ToSeq$BuildData_BuildData_ = (function(xs)
{
    return Seq__Unfold$Int32__BuildData_Int32_BuildData_((function(i)
    {
      if ((i < ResizeArray_1_Object__get_Count$Object_(xs))) 
      {
        return {Tag: 1.000000, Value: (new TupleBuildData__Int32(ResizeArray_1_Object__get_Item$Object_(xs, i), (i + 1)))};
      }
      else
      {
        return {Tag: 0.000000};
      };
    }), 0);
});
Seq__Cast$Match_1Match_1 = (function(xs)
{
    return xs;
});
Seq__Delay$BuildData_BuildData_ = (function(f)
{
    return Seq__FromFactory$BuildData_BuildData_((function(unitVar0)
    {
      var _934;
      return Seq__Enumerator$BuildData_BuildData_(f(_934));
    }));
});
Seq__Delay$String_String = (function(f)
{
    return Seq__FromFactory$String_String((function(unitVar0)
    {
      var _1025;
      return Seq__Enumerator$String_String(f(_1025));
    }));
});
Seq__Enumerator$BuildData_BuildData_ = (function(xs)
{
    return xs.GetEnumerator();
});
Seq__Enumerator$Match_1Match_1 = (function(xs)
{
    return xs.GetEnumerator();
});
Seq__Enumerator$String_String = (function(xs)
{
    return xs.GetEnumerator();
});
Seq__Enumerator$String___String___ = (function(xs)
{
    return xs.GetEnumerator();
});
Seq__Filter$BuildData_BuildData_ = (function(f,xs)
{
    var trySkipToNext;
    trySkipToNext = (function(_enum)
    {
      if (_enum.MoveNext()) 
      {
        if (f(_enum.get_Current())) 
        {
          return {Tag: 1.000000, Value: (new TupleBuildData__IEnumerator_1_BuildData_(_enum.get_Current(), _enum))};
        }
        else
        {
          return trySkipToNext(_enum);
        };
      }
      else
      {
        return {Tag: 0.000000};
      };
    });
    return Seq__Delay$BuildData_BuildData_((function(unitVar0)
    {
      return Seq__Unfold$IEnumerator_1_BuildData__BuildData_IEnumerator_1_BuildData__BuildData_(trySkipToNext, Seq__Enumerator$BuildData_BuildData_(xs));
    }));
});
Seq__Find$BuildData_BuildData_ = (function(f,xs)
{
    return Seq__FindIndexed$BuildData_BuildData_((function(_arg1)
    {
      return (function(x)
      {
        return f(x);
      });
    }), xs);
});
Seq__FindIndexed$BuildData_BuildData_ = (function(f,xs)
{
    var matchValue = Seq__TryFindIndexed$BuildData_BuildData_(f, xs);
    if ((matchValue.Tag == 1.000000)) 
    {
      var x = Option__GetValue$BuildData_BuildData_(matchValue);
      return x;
    }
    else
    {
      throw ("List did not contain any matching elements");
      return null;
    };
});
Seq__FoldIndexed$Match_1_Unit_Match_1_Unit_ = (function(f,seed,xs)
{
    return Seq__FoldIndexedAux$Unit__Match_1Unit__Match_1(f, seed, Seq__Enumerator$Match_1Match_1(xs));
});
Seq__FoldIndexed$String__Unit_String_Unit_ = (function(f,seed,xs)
{
    return Seq__FoldIndexedAux$Unit__String_Unit__String(f, seed, Seq__Enumerator$String_String(xs));
});
Seq__FoldIndexed$String____Unit_String____Unit_ = (function(f,seed,xs)
{
    return Seq__FoldIndexedAux$Unit__String___Unit__String___(f, seed, Seq__Enumerator$String___String___(xs));
});
Seq__FoldIndexedAux$Unit__Match_1Unit__Match_1 = (function(f,acc,xs)
{
    var i = {contents: 0};
    var _acc = {contents: acc};
    while (xs.MoveNext())
    {
      _acc.contents = f(i.contents)(_acc.contents)(xs.get_Current());
      null;
      i.contents = (i.contents + 1);
      null;
    };
    return _acc.contents;
});
Seq__FoldIndexedAux$Unit__String_Unit__String = (function(f,acc,xs)
{
    var i = {contents: 0};
    var _acc = {contents: acc};
    while (xs.MoveNext())
    {
      _acc.contents = f(i.contents)(_acc.contents)(xs.get_Current());
      null;
      i.contents = (i.contents + 1);
      null;
    };
    return _acc.contents;
});
Seq__FoldIndexedAux$Unit__String___Unit__String___ = (function(f,acc,xs)
{
    var i = {contents: 0};
    var _acc = {contents: acc};
    while (xs.MoveNext())
    {
      _acc.contents = f(i.contents)(_acc.contents)(xs.get_Current());
      null;
      i.contents = (i.contents + 1);
      null;
    };
    return _acc.contents;
});
Seq__FromFactory$BuildData_BuildData_ = (function(f)
{
    var impl;
    impl = (new CreateEnumerable_1_BuildData___ctor$BuildData_(f));
    return {GetEnumerator: (function(unitVar1)
    {
      return (function(__,unitVar1)
      {
        var _862;
        return __.factory(_862);
      })(impl, unitVar1);
    })};
});
Seq__FromFactory$Match_1Match_1 = (function(f)
{
    var impl;
    impl = (new CreateEnumerable_1_Match___ctor$Match_1(f));
    return {GetEnumerator: (function(unitVar1)
    {
      return (function(__,unitVar1)
      {
        var _659;
        return __.factory(_659);
      })(impl, unitVar1);
    })};
});
Seq__FromFactory$String_String = (function(f)
{
    var impl;
    impl = (new CreateEnumerable_1_String___ctor$String(f));
    return {GetEnumerator: (function(unitVar1)
    {
      return (function(__,unitVar1)
      {
        var _1017;
        return __.factory(_1017);
      })(impl, unitVar1);
    })};
});
Seq__FromFactory$String___String___ = (function(f)
{
    var impl;
    impl = (new CreateEnumerable_1_String_____ctor$String___(f));
    return {GetEnumerator: (function(unitVar1)
    {
      return (function(__,unitVar1)
      {
        var _254;
        return __.factory(_254);
      })(impl, unitVar1);
    })};
});
Seq__IterateIndexed$Match_1Match_1 = (function(f,xs)
{
    var _678;
    return Seq__FoldIndexed$Match_1_Unit_Match_1_Unit_((function(i)
    {
      return (function(unitVar1)
      {
        return (function(x)
        {
          return f(i)(x);
        });
      });
    }), _678, xs);
});
Seq__IterateIndexed$String_String = (function(f,xs)
{
    var _1039;
    return Seq__FoldIndexed$String__Unit_String_Unit_((function(i)
    {
      return (function(unitVar1)
      {
        return (function(x)
        {
          return f(i)(x);
        });
      });
    }), _1039, xs);
});
Seq__IterateIndexed$String___String___ = (function(f,xs)
{
    var _274;
    return Seq__FoldIndexed$String____Unit_String____Unit_((function(i)
    {
      return (function(unitVar1)
      {
        return (function(x)
        {
          return f(i)(x);
        });
      });
    }), _274, xs);
});
Seq__Map$BuildData__String_BuildData__String = (function(f,xs)
{
    return Seq__Delay$String_String((function(unitVar0)
    {
      return Seq__Unfold$IEnumerator_1_BuildData__String_IEnumerator_1_BuildData__String((function(_enum)
      {
        if (_enum.MoveNext()) 
        {
          return {Tag: 1.000000, Value: (new TupleString_IEnumerator_1_BuildData_(f(_enum.get_Current()), _enum))};
        }
        else
        {
          return {Tag: 0.000000};
        };
      }), Seq__Enumerator$BuildData_BuildData_(xs));
    }));
});
Seq__OfArray$String___String___ = (function(xs)
{
    return Seq__Unfold$Int32__String___Int32_String___((function(i)
    {
      if ((i < Array__BoxedLength$(xs))) 
      {
        return {Tag: 1.000000, Value: (new TupleString____Int32(xs[i], (i + 1)))};
      }
      else
      {
        return {Tag: 0.000000};
      };
    }), 0);
});
Seq__OfList$String___String___ = (function(xs)
{
    return Seq__Unfold$FSharpList_1_String____String___FSharpList_1_String____String___((function(_arg1)
    {
      if ((_arg1.Tag == 1.000000)) 
      {
        var _xs = List__Tail$String___String___(_arg1);
        var x = List__Head$String___String___(_arg1);
        return {Tag: 1.000000, Value: (new TupleString____FSharpList_1_String___(x, _xs))};
      }
      else
      {
        return {Tag: 0.000000};
      };
    }), xs);
});
Seq__ToArray$Match_1Match_1 = (function(xs)
{
    var ys = Array__ZeroCreate$Match_1Match_1(0);
    Seq__IterateIndexed$Match_1Match_1((function(i)
    {
      return (function(x)
      {
        ys[i] = x;
        return null;
      });
    }), xs);
    return ys;
});
Seq__ToArray$String_String = (function(xs)
{
    var ys = Array__ZeroCreate$String_String(0);
    Seq__IterateIndexed$String_String((function(i)
    {
      return (function(x)
      {
        ys[i] = x;
        return null;
      });
    }), xs);
    return ys;
});
Seq__ToArray$String___String___ = (function(xs)
{
    var ys = Array__ZeroCreate$String___String___(0);
    Seq__IterateIndexed$String___String___((function(i)
    {
      return (function(x)
      {
        ys[i] = x;
        return null;
      });
    }), xs);
    return ys;
});
Seq__TryFindIndexed$BuildData_BuildData_ = (function(f,xs)
{
    return Seq__TryPickIndexed$BuildData__BuildData_BuildData__BuildData_((function(i)
    {
      return (function(x)
      {
        if (f(i)(x)) 
        {
          return {Tag: 1.000000, Value: x};
        }
        else
        {
          return {Tag: 0.000000};
        };
      });
    }), xs);
});
Seq__TryPickIndexed$BuildData__BuildData_BuildData__BuildData_ = (function(f,xs)
{
    return Seq__TryPickIndexedAux$BuildData__BuildData_BuildData__BuildData_(f, 0, Seq__Enumerator$BuildData_BuildData_(xs));
});
Seq__TryPickIndexedAux$BuildData__BuildData_BuildData__BuildData_ = (function(f,i,xs)
{
    if (xs.MoveNext()) 
    {
      var result = f(i)(xs.get_Current());
      if ((result.Tag == 0.000000)) 
      {
        return Seq__TryPickIndexedAux$BuildData__BuildData_BuildData__BuildData_(f, (i + 1), xs);
      }
      else
      {
        return result;
      };
    }
    else
    {
      return {Tag: 0.000000};
    };
});
Seq__Unfold$FSharpList_1_String____String___FSharpList_1_String____String___ = (function(f,seed)
{
    return Seq__FromFactory$String___String___((function(unitVar0)
    {
      var impl;
      impl = (new UnfoldEnumerator_2_FSharpList_1_String____String_____ctor$FSharpList_1_String____String___(seed, f));
      return {get_Current: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          return __.current;
        })(impl, unitVar1);
      }), Dispose: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          ;
        })(impl, unitVar1);
      }), MoveNext: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          var next = (function(_unitVar0)
          {
            var currAcc = Option__GetValue$FSharpList_1_String___FSharpList_1_String___(__.acc);
            var x = __.unfold(currAcc);
            if ((x.Tag == 1.000000)) 
            {
              var value = Option__GetValue$Tuple_2_String____FSharpList_1_String___Tuple_2_String____FSharpList_1_String___(x).Items[0.000000];
              var nextAcc = Option__GetValue$Tuple_2_String____FSharpList_1_String___Tuple_2_String____FSharpList_1_String___(x).Items[1.000000];
              __.acc = {Tag: 1.000000, Value: nextAcc};
              __.current = value;
              return true;
            }
            else
            {
              __.acc = {Tag: 0.000000};
              __.current = null;
              return false;
            };
          });
          return (Option__IsSome$FSharpList_1_String___FSharpList_1_String___(__.acc) && (function()
          {
            var _451;
            return next(_451);
          })());
        })(impl, unitVar1);
      }), Reset: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          __.acc = {Tag: 1.000000, Value: __.seed};
          __.current = null;
        })(impl, unitVar1);
      })};
    }));
});
Seq__Unfold$IEnumerator_1_BuildData__BuildData_IEnumerator_1_BuildData__BuildData_ = (function(f,seed)
{
    return Seq__FromFactory$BuildData_BuildData_((function(unitVar0)
    {
      var impl;
      impl = (new UnfoldEnumerator_2_IEnumerator_1_BuildData__BuildData___ctor$IEnumerator_1_BuildData__BuildData_(seed, f));
      return {get_Current: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          return __.current;
        })(impl, unitVar1);
      }), Dispose: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          ;
        })(impl, unitVar1);
      }), MoveNext: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          var next = (function(_unitVar0)
          {
            var currAcc = Option__GetValue$IEnumerator_1_BuildData_IEnumerator_1_BuildData_(__.acc);
            var x = __.unfold(currAcc);
            if ((x.Tag == 1.000000)) 
            {
              var value = Option__GetValue$Tuple_2_BuildData__IEnumerator_1_BuildData_Tuple_2_BuildData__IEnumerator_1_BuildData_(x).Items[0.000000];
              var nextAcc = Option__GetValue$Tuple_2_BuildData__IEnumerator_1_BuildData_Tuple_2_BuildData__IEnumerator_1_BuildData_(x).Items[1.000000];
              __.acc = {Tag: 1.000000, Value: nextAcc};
              __.current = value;
              return true;
            }
            else
            {
              __.acc = {Tag: 0.000000};
              __.current = null;
              return false;
            };
          });
          return (Option__IsSome$IEnumerator_1_BuildData_IEnumerator_1_BuildData_(__.acc) && (function()
          {
            var _911;
            return next(_911);
          })());
        })(impl, unitVar1);
      }), Reset: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          __.acc = {Tag: 1.000000, Value: __.seed};
          __.current = null;
        })(impl, unitVar1);
      })};
    }));
});
Seq__Unfold$IEnumerator_1_BuildData__String_IEnumerator_1_BuildData__String = (function(f,seed)
{
    return Seq__FromFactory$String_String((function(unitVar0)
    {
      var impl;
      impl = (new UnfoldEnumerator_2_IEnumerator_1_BuildData__String___ctor$IEnumerator_1_BuildData__String(seed, f));
      return {get_Current: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          return __.current;
        })(impl, unitVar1);
      }), Dispose: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          ;
        })(impl, unitVar1);
      }), MoveNext: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          var next = (function(_unitVar0)
          {
            var currAcc = Option__GetValue$IEnumerator_1_BuildData_IEnumerator_1_BuildData_(__.acc);
            var x = __.unfold(currAcc);
            if ((x.Tag == 1.000000)) 
            {
              var value = Option__GetValue$Tuple_2_String__IEnumerator_1_BuildData_Tuple_2_String__IEnumerator_1_BuildData_(x).Items[0.000000];
              var nextAcc = Option__GetValue$Tuple_2_String__IEnumerator_1_BuildData_Tuple_2_String__IEnumerator_1_BuildData_(x).Items[1.000000];
              __.acc = {Tag: 1.000000, Value: nextAcc};
              __.current = value;
              return true;
            }
            else
            {
              __.acc = {Tag: 0.000000};
              __.current = null;
              return false;
            };
          });
          return (Option__IsSome$IEnumerator_1_BuildData_IEnumerator_1_BuildData_(__.acc) && (function()
          {
            var _995;
            return next(_995);
          })());
        })(impl, unitVar1);
      }), Reset: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          __.acc = {Tag: 1.000000, Value: __.seed};
          __.current = null;
        })(impl, unitVar1);
      })};
    }));
});
Seq__Unfold$Int32__BuildData_Int32_BuildData_ = (function(f,seed)
{
    return Seq__FromFactory$BuildData_BuildData_((function(unitVar0)
    {
      var impl;
      impl = (new UnfoldEnumerator_2_Int32__BuildData___ctor$Int32_BuildData_(seed, f));
      return {get_Current: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          return __.current;
        })(impl, unitVar1);
      }), Dispose: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          ;
        })(impl, unitVar1);
      }), MoveNext: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          var next = (function(_unitVar0)
          {
            var currAcc = Option__GetValue$Int32_Int32(__.acc);
            var x = __.unfold(currAcc);
            if ((x.Tag == 1.000000)) 
            {
              var value = Option__GetValue$Tuple_2_BuildData__Int32_Tuple_2_BuildData__Int32_(x).Items[0.000000];
              var nextAcc = Option__GetValue$Tuple_2_BuildData__Int32_Tuple_2_BuildData__Int32_(x).Items[1.000000];
              __.acc = {Tag: 1.000000, Value: nextAcc};
              __.current = value;
              return true;
            }
            else
            {
              __.acc = {Tag: 0.000000};
              __.current = null;
              return false;
            };
          });
          return (Option__IsSome$Int32_Int32(__.acc) && (function()
          {
            var _840;
            return next(_840);
          })());
        })(impl, unitVar1);
      }), Reset: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          __.acc = {Tag: 1.000000, Value: __.seed};
          __.current = null;
        })(impl, unitVar1);
      })};
    }));
});
Seq__Unfold$Int32__Match_1Int32_Match_1 = (function(f,seed)
{
    return Seq__FromFactory$Match_1Match_1((function(unitVar0)
    {
      var impl;
      impl = (new UnfoldEnumerator_2_Int32__Match___ctor$Int32_Match_1(seed, f));
      return {get_Current: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          return __.current;
        })(impl, unitVar1);
      }), Dispose: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          ;
        })(impl, unitVar1);
      }), MoveNext: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          var next = (function(_unitVar0)
          {
            var currAcc = Option__GetValue$Int32_Int32(__.acc);
            var x = __.unfold(currAcc);
            if ((x.Tag == 1.000000)) 
            {
              var value = Option__GetValue$Tuple_2_Match__Int32_Tuple_2_Match__Int32_(x).Items[0.000000];
              var nextAcc = Option__GetValue$Tuple_2_Match__Int32_Tuple_2_Match__Int32_(x).Items[1.000000];
              __.acc = {Tag: 1.000000, Value: nextAcc};
              __.current = value;
              return true;
            }
            else
            {
              __.acc = {Tag: 0.000000};
              __.current = null;
              return false;
            };
          });
          return (Option__IsSome$Int32_Int32(__.acc) && (function()
          {
            var _637;
            return next(_637);
          })());
        })(impl, unitVar1);
      }), Reset: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          __.acc = {Tag: 1.000000, Value: __.seed};
          __.current = null;
        })(impl, unitVar1);
      })};
    }));
});
Seq__Unfold$Int32__String___Int32_String___ = (function(f,seed)
{
    return Seq__FromFactory$String___String___((function(unitVar0)
    {
      var impl;
      impl = (new UnfoldEnumerator_2_Int32__String_____ctor$Int32_String___(seed, f));
      return {get_Current: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          return __.current;
        })(impl, unitVar1);
      }), Dispose: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          ;
        })(impl, unitVar1);
      }), MoveNext: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          var next = (function(_unitVar0)
          {
            var currAcc = Option__GetValue$Int32_Int32(__.acc);
            var x = __.unfold(currAcc);
            if ((x.Tag == 1.000000)) 
            {
              var value = Option__GetValue$Tuple_2_String____Int32_Tuple_2_String____Int32_(x).Items[0.000000];
              var nextAcc = Option__GetValue$Tuple_2_String____Int32_Tuple_2_String____Int32_(x).Items[1.000000];
              __.acc = {Tag: 1.000000, Value: nextAcc};
              __.current = value;
              return true;
            }
            else
            {
              __.acc = {Tag: 0.000000};
              __.current = null;
              return false;
            };
          });
          return (Option__IsSome$Int32_Int32(__.acc) && (function()
          {
            var _232;
            return next(_232);
          })());
        })(impl, unitVar1);
      }), Reset: (function(unitVar1)
      {
        return (function(__,unitVar1)
        {
          __.acc = {Tag: 1.000000, Value: __.seed};
          __.current = null;
        })(impl, unitVar1);
      })};
    }));
});
Seq__Where$BuildData_BuildData_ = (function(f,xs)
{
    return Seq__Filter$BuildData_BuildData_(f, xs);
});
Settings__loadOrDefault$String_String = (function(map,def)
{
    try
    {
      var path = ((vscode.workspace.rootPath) + "/.ionide");
      var t = map(toml.parse(((fs.readFileSync(path)).toString())));
      ((window.console).log(t));
      if ((t != undefined)) 
      {
        return t;
      }
      else
      {
        return def;
      };
    }
    catch(matchValue){
      return def;
    };
});
String_1_PrintFormatToString$ = (function(s)
{
    var reg = /%[+\-* ]?\d*(?:\.(\d+))?(\w)/;
    function formatToString(rep) {
        s = s.replace(reg, function(match, precision, format) {
            switch (format) {
                case "f": case "F": return precision ? rep.toFixed(precision) : rep.toFixed(6);
                case "g": case "G": return rep.toPrecision(precision);
                case "e": case "E": return rep.toExponential(precision);
                case "A": return JSON.stringify(rep);
                default:  return rep;
            }
        });
        return reg.test(s) ? formatToString : s;
    }
    return formatToString;
});
String_1_SplitWithoutOptions$ = (function(s,delimiters)
{
    var folder = (function(inputs)
    {
      return (function(delimiter)
      {
        return Array__Concat$String_String(Seq__OfArray$String___String___(Array__Map$String__String___String_String___((function(inp)
        {
          return inp.split(delimiter);
        }), inputs)));
      });
    });
    var state = [s];
    return (function(array)
    {
      return Array__Fold$String__String___String_String___(folder, state, array);
    })(delimiters);
});
TupleBuildData__IEnumerator_1_BuildData_ = (function(Item0,Item1)
{
    var __this = this;
    __this.Items = [Item0, Item1];
});
TupleBuildData__Int32 = (function(Item0,Item1)
{
    var __this = this;
    __this.Items = [Item0, Item1];
});
TupleMatch_1_Int32 = (function(Item0,Item1)
{
    var __this = this;
    __this.Items = [Item0, Item1];
});
TupleString_IEnumerator_1_BuildData_ = (function(Item0,Item1)
{
    var __this = this;
    __this.Items = [Item0, Item1];
});
TupleString_String = (function(Item0,Item1)
{
    var __this = this;
    __this.Items = [Item0, Item1];
});
TupleString____FSharpList_1_String___ = (function(Item0,Item1)
{
    var __this = this;
    __this.Items = [Item0, Item1];
});
TupleString____Int32 = (function(Item0,Item1)
{
    var __this = this;
    __this.Items = [Item0, Item1];
});
UnfoldEnumerator_2_FSharpList_1_String____String_____ctor$FSharpList_1_String____String___ = (function(seed,unfold)
{
    var __this = this;
    {};
    __this.seed = seed;
    __this.unfold = unfold;
    __this.acc = {Tag: 1.000000, Value: __this.seed};
    __this.current = null;
});
UnfoldEnumerator_2_IEnumerator_1_BuildData__BuildData___ctor$IEnumerator_1_BuildData__BuildData_ = (function(seed,unfold)
{
    var __this = this;
    {};
    __this.seed = seed;
    __this.unfold = unfold;
    __this.acc = {Tag: 1.000000, Value: __this.seed};
    __this.current = null;
});
UnfoldEnumerator_2_IEnumerator_1_BuildData__String___ctor$IEnumerator_1_BuildData__String = (function(seed,unfold)
{
    var __this = this;
    {};
    __this.seed = seed;
    __this.unfold = unfold;
    __this.acc = {Tag: 1.000000, Value: __this.seed};
    __this.current = null;
});
UnfoldEnumerator_2_Int32__BuildData___ctor$Int32_BuildData_ = (function(seed,unfold)
{
    var __this = this;
    {};
    __this.seed = seed;
    __this.unfold = unfold;
    __this.acc = {Tag: 1.000000, Value: __this.seed};
    __this.current = null;
});
UnfoldEnumerator_2_Int32__Match___ctor$Int32_Match_1 = (function(seed,unfold)
{
    var __this = this;
    {};
    __this.seed = seed;
    __this.unfold = unfold;
    __this.acc = {Tag: 1.000000, Value: __this.seed};
    __this.current = null;
});
UnfoldEnumerator_2_Int32__String_____ctor$Int32_String___ = (function(seed,unfold)
{
    var __this = this;
    {};
    __this.seed = seed;
    __this.unfold = unfold;
    __this.acc = {Tag: 1.000000, Value: __this.seed};
    __this.current = null;
});
list_1_String____ConsString___ = (function(Item1,Item2)
{
    var __this = this;
    __this.Tag = 1.000000;
    __this._CaseName = "Cons";
    __this.Item1 = Item1;
    __this.Item2 = Item2;
});
list_1_String____NilString___ = (function()
{
    var __this = this;
    __this.Tag = 0.000000;
    __this._CaseName = "Nil";
});
FakeService__linuxPrefix = FakeService__get_linuxPrefix$();
FakeService__command = FakeService__get_command$();
FakeService__script = FakeService__get_script$();
FakeService__outputChannel = FakeService__get_outputChannel$();
FakeService__BuildList = FakeService__get_BuildList$();
return [(function(ign)
{
    return (new Fake___ctor$());
}), (function(_this)
{
    return (function(p0)
    {
      return Fake__activate$(_this, p0);
    });
})]
 }
var _funcs = wrappedFunScript();
var _self = _funcs[0]();

exports.activate = _funcs[1](_self);