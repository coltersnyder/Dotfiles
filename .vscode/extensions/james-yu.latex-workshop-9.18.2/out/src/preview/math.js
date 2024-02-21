"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.math = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const workerpool = __importStar(require("workerpool"));
const lw_1 = require("../lw");
const theme_1 = require("../utils/theme");
const utils_1 = require("../utils/utils");
const cursorrenderer_1 = require("./math/mathpreviewlib/cursorrenderer");
const newcommandfinder_1 = require("./math/mathpreviewlib/newcommandfinder");
const texmathenvfinder_1 = require("./math/mathpreviewlib/texmathenvfinder");
const logger = lw_1.lw.log('Preview', 'Math');
exports.math = {
    refreshMathColor,
    onRef,
    onTeX,
    findTeX,
    findMath,
    ref2svg,
    tex2svg,
    renderCursor
};
const pool = workerpool.pool(path.join(__dirname, 'math', 'mathjax.js'), { minWorkers: 1, maxWorkers: 1, workerType: 'process' });
const proxy = pool.proxy();
lw_1.lw.onConfigChange('*', refreshMathColor);
lw_1.lw.onConfigChange('hover.preview.mathjax.extensions', initialize);
lw_1.lw.onDispose({ dispose: async () => { await pool.terminate(true); } });
void initialize();
async function initialize() {
    const extensions = vscode.workspace.getConfiguration('latex-workshop').get('hover.preview.mathjax.extensions', []);
    const extensionsToLoad = extensions.filter((ex) => lw_1.lw.constant.MATHJAX_EXT.includes(ex));
    void (await proxy).loadExtensions(extensionsToLoad);
}
let foreColor = '#000000';
async function onTeX(document, tex, macros) {
    const configuration = vscode.workspace.getConfiguration('latex-workshop');
    const scale = configuration.get('hover.preview.scale');
    let s = await renderCursor(document, tex);
    s = mathjaxify(s, tex.envname);
    const typesetArg = macros + stripTeX(s, macros);
    const typesetOpts = { scale, color: foreColor };
    try {
        const xml = await typeset(typesetArg, typesetOpts);
        const md = svg2DataUrl(xml);
        return new vscode.Hover(new vscode.MarkdownString(addDummyCodeBlock(`![equation](${md})`)), tex.range);
    }
    catch (e) {
        if (macros !== '') {
            logger.log(`Failed rendering MathJax ${typesetArg} . Try removing macro definitions.`);
            return await onTeX(document, tex, '');
        }
        else {
            logger.logError(`Failed rendering MathJax ${typesetArg} .`, e);
            throw e;
        }
    }
}
async function onRef(document, position, refData, ctoken) {
    const configuration = vscode.workspace.getConfiguration('latex-workshop');
    const line = refData.position.line;
    const link = vscode.Uri.parse('command:latex-workshop.synctexto').with({ query: JSON.stringify([line, refData.file]) });
    const mdLink = new vscode.MarkdownString(`[View on pdf](${link})`);
    mdLink.isTrusted = true;
    if (configuration.get('hover.ref.enabled') && refData.math) {
        return onRefMathJax(refData, ctoken);
    }
    const md = '```latex\n' + refData.documentation + '\n```\n';
    const refRange = document.getWordRangeAtPosition(position, /\{.*?\}/);
    const refMessage = refNumberMessage(refData);
    if (refMessage !== undefined && configuration.get('hover.ref.number.enabled')) {
        return new vscode.Hover([md, refMessage, mdLink], refRange);
    }
    return new vscode.Hover([md, mdLink], refRange);
}
async function onRefMathJax(refData, ctoken) {
    const md = await ref2svg(refData, ctoken);
    const line = refData.position.line;
    const link = vscode.Uri.parse('command:latex-workshop.synctexto').with({ query: JSON.stringify([line, refData.file]) });
    const mdLink = new vscode.MarkdownString(`[View on pdf](${link})`);
    mdLink.isTrusted = true;
    return new vscode.Hover([addDummyCodeBlock(`![equation](${md})`), mdLink], refData.math?.range);
}
async function ref2svg(refData, ctoken) {
    if (refData.math === undefined) {
        return '';
    }
    const texMath = refData.math;
    const configuration = vscode.workspace.getConfiguration('latex-workshop');
    const macros = await (0, newcommandfinder_1.findMacros)(ctoken);
    let texStr = undefined;
    if (refData.prevIndex !== undefined && configuration.get('hover.ref.number.enabled')) {
        const tag = refData.prevIndex.refNumber;
        const texString = replaceLabelWithTag(texMath.texString, refData.label, tag);
        texStr = mathjaxify(texString, texMath.envname, { stripLabel: false });
    }
    const svg = await tex2svg(texMath, macros, texStr);
    return svg.svgDataUrl;
}
async function tex2svg(tex, macros, texStr) {
    macros = macros ?? await (0, newcommandfinder_1.findMacros)();
    const configuration = vscode.workspace.getConfiguration('latex-workshop');
    const scale = configuration.get('hover.preview.scale');
    texStr = texStr ?? mathjaxify(tex.texString, tex.envname);
    texStr = macros + stripTeX(texStr, macros);
    try {
        const xml = await typeset(texStr, { scale, color: foreColor });
        return { svgDataUrl: svg2DataUrl(xml), macros };
    }
    catch (e) {
        logger.logError(`Failed rendering MathJax ${texStr} .`, e);
        throw e;
    }
}
function replaceLabelWithTag(tex, refLabel, tag) {
    const texWithoutTag = tex.replace(/\\tag\{(\{[^{}]*?\}|.)*?\}/g, '');
    let newTex = texWithoutTag.replace(/\\label\{(.*?)\}/g, (_matchString, matchLabel, _offset, _s) => {
        if (refLabel) {
            if (refLabel === matchLabel) {
                if (tag) {
                    return `\\tag{${tag}}`;
                }
                else {
                    return `\\tag{${matchLabel}}`;
                }
            }
            return '\\notag';
        }
        else {
            return `\\tag{${matchLabel}}`;
        }
    });
    // To work around a bug of \tag with multi-line environments,
    // we have to put \tag after the environments.
    // See https://github.com/mathjax/MathJax/issues/1020
    newTex = newTex.replace(/(\\tag\{.*?\})([\r\n\s]*)(\\begin\{(aligned|alignedat|gathered|split)\}[^]*?\\end\{\4\})/gm, '$3$2$1');
    newTex = newTex.replace(/^\\begin\{(\w+?)\}/, '\\begin{$1*}');
    newTex = newTex.replace(/\\end\{(\w+?)\}$/, '\\end{$1*}');
    return newTex;
}
function refNumberMessage(refData) {
    if (refData.prevIndex) {
        const refNum = refData.prevIndex.refNumber;
        const refMessage = `numbered ${refNum} at last compilation`;
        return refMessage;
    }
    return;
}
function refreshMathColor() {
    foreColor = (0, theme_1.getCurrentThemeLightness)() === 'light' ? '#000000' : '#ffffff';
}
async function typeset(arg, opts) {
    return (await proxy).typeset(arg, opts).timeout(3000);
}
function renderCursor(document, texMath) {
    return (0, cursorrenderer_1.renderCursor)(document, texMath, foreColor);
}
function findTeX(document, position) {
    return texmathenvfinder_1.TeXMathEnvFinder.findHoverOnTex(document, position);
}
function findMath(document, position) {
    return texmathenvfinder_1.TeXMathEnvFinder.findMathEnvIncludingPosition(document, position);
}
function addDummyCodeBlock(md) {
    // We need a dummy code block in hover to make the width of hover larger.
    const dummyCodeBlock = '```\n```';
    return dummyCodeBlock + '\n' + md + '\n' + dummyCodeBlock;
}
function stripTeX(tex, macros) {
    // First remove math env declaration
    if (tex.startsWith('$$') && tex.endsWith('$$')) {
        tex = tex.slice(2, tex.length - 2);
    }
    else if (tex.startsWith('$') && tex.endsWith('$')) {
        tex = tex.slice(1, tex.length - 1);
    }
    else if (tex.startsWith('\\(') && tex.endsWith('\\)')) {
        tex = tex.slice(2, tex.length - 2);
    }
    else if (tex.startsWith('\\[') && tex.endsWith('\\]')) {
        tex = tex.slice(2, tex.length - 2);
    }
    // Then remove the star variant of new macros
    [...macros.matchAll(/\\newcommand\{(.*?)\}/g)].forEach(match => {
        tex = tex.replaceAll(match[1] + '*', match[1]);
    });
    return tex;
}
function mathjaxify(tex, envname, opt = { stripLabel: true }) {
    // remove TeX comments
    let s = (0, utils_1.stripComments)(tex);
    // remove \label{...}
    if (opt.stripLabel) {
        s = s.replace(/\\label\{.*?\}/g, '');
    }
    if (envname.match(/^(aligned|alignedat|array|Bmatrix|bmatrix|cases|CD|gathered|matrix|pmatrix|smallmatrix|split|subarray|Vmatrix|vmatrix)$/)) {
        s = '\\begin{equation}' + s + '\\end{equation}';
    }
    return s;
}
function svg2DataUrl(xml) {
    // We have to call encodeURIComponent and unescape because SVG can includes non-ASCII characters.
    // We have to encode them before converting them to base64.
    const svg64 = Buffer.from(unescape(encodeURIComponent(xml)), 'binary').toString('base64');
    const b64Start = 'data:image/svg+xml;base64,';
    return b64Start + svg64;
}
//# sourceMappingURL=math.js.map