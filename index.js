import Code_Editor from './code_editor/Code_Editor.js'

const editor  = new Code_Editor()
editor.lines  = document.documentElement.innerHTML.split("\n")
window.editor = editor
