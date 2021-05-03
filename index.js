import Code_Editor from './Code_Editor.js'
import Key from './Key.js'

const editor = new Code_Editor()
editor.code = document.documentElement.innerHTML

document.addEventListener('keydown', (event) =>
{
	switch (event.key) {
		case Key.DOWN:  editor.cursor.move(0, 1)  ; break
		case Key.LEFT:  editor.cursor.move(-1, 0) ; break
		case Key.RIGHT: editor.cursor.move(1, 0)  ; break
		case Key.UP:    editor.cursor.move(0, -1) ; break
	}
})

window.editor = editor
