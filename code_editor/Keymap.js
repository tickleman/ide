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
	}

	/**
	 * Bind keyboard events with actions
	 */
	bind()
	{
		document.addEventListener('keydown', (event) => {
			let key = event.key
			if (event.altKey)  key = 'Alt+'  + key
			if (event.ctrlKey) key = 'Ctrl+' + key
			if (this.map.hasOwnProperty(key)) {
				let binding  = this.editor.actions.binding
				let callable = this.editor
				let object   = this.editor
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
				this.editor.insert(key)
				this.editor.cursor.right()
			}
		})
	}

	constructor(editor)
	{
		this.editor = editor
		this.bind()
	}

}

export default Keymap
