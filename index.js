import Code_Editor from './Code_Editor.js'
import Key from './Key.js'

const editor = new Code_Editor()
editor.code = document.documentElement.innerHTML

document.addEventListener('keydown', (event) =>
{
	if (event.key === Key.DOWN) {
		editor.top ++
		editor.draw()
	}
	if (event.key === Key.LEFT && editor.left > 0) {
		editor.left --
		editor.draw()
	}
	if (event.key === Key.RIGHT) {
		editor.left ++
		editor.draw()
	}
	if (event.key === Key.UP && editor.top > 0) {
		editor.top --
		editor.draw()
	}
})
