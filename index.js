import Code_Editor from './code_editor/Code_Editor.js'
import Paper       from './paper/Paper.js';
import Workspace   from './workspace/Workspace.js';

const paper = new Paper()

const editor  = new Code_Editor(paper)
editor.lines  = document.documentElement.innerHTML.split("\n")
window.editor = editor

const workspace = new Workspace(paper, editor)
window.workspace = workspace
