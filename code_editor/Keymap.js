class Keymap
{

	/**
	 * @type Code_Editor
	 */
	editor

	/**
	 * Each key of the keyboard is associated to an action, ie a function without argument called from editor
	 *
	 * @see Actions.binding
	 * @type string{}
	 */
	map = {

		// navigate through code

		'ArrowDown':  'cursor.down',
		'ArrowLeft':  'cursor.left',
		'ArrowRight': 'cursor.right',
		'ArrowUp':    'cursor.up',

		'Ctrl+ArrowLeft':  'cursor.previousWord',
		'Ctrl+ArrowRight': 'cursor.nextWord',
		'Ctrl+End':        'cursor.endOfFile',
		'Ctrl+Home':       'cursor.beginOfFile',

		'End':  'cursor.endOfLine',
		'Home': 'cursor.beginOfLine',

		// special deletions / inserts

		'Backspace': 'edit.deleteBefore',
		'Delete':    'edit.deleteAfter',
		'Ctrl+d':    'edit.deleteLine',
		'Enter':     'edit.insertLine',
		'Tab':       'edit.insertTab'
	}

	constructor(editor)
	{
		this.editor = editor
		document.addEventListener('keydown', (event) => {
			this.keydown(event)
			if (this.editor.will_draw) this.editor.draw()
		})
	}

	/**
	 * Bind keyboard events with actions
	 */
	keydown(event)
	{
		const editor = this.editor
		let key      = event.key
		if (event.altKey)  key = 'Alt+'  + key
		if (event.ctrlKey) key = 'Ctrl+' + key
		if (this.map.hasOwnProperty(key)) {
			event.preventDefault()
			let binding  = editor.actions.binding
			let callable = editor
			let object   = editor
			for (let action of this.map[key].split('.')) {
				if (binding !== undefined) {
					binding = binding[action]
				}
				if (callable !== undefined) {
					object   = callable
					callable = object[action]
				}
			}
			binding ? binding.call() : callable.call(object)
		}
		else if (key.length === 1) {
			event.preventDefault()
			editor.edit.insert(key)
		}
	}

}

export default Keymap
