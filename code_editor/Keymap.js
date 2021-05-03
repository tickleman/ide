class Keymap
{

	/**
	 * @type Code_Editor
	 */
	editor

	/**
	 * Each key of the keyboard is associated to an action
	 *
	 * @see Actions.binding
	 * @type string{}
	 */
	map = {
		'ArrowDown':  'cursor.down',
		'ArrowLeft':  'cursor.left',
		'ArrowRight': 'cursor.right',
		'ArrowUp':    'cursor.up',
		'End':        'cursor.endOfLine',
		'Home':       'cursor.beginOfLine'
	}

	/**
	 * Bind keyboard events with actions
	 */
	bind()
	{
		document.addEventListener('keydown', (event) => {
			if (this.map.hasOwnProperty(event.key)) {
				let binding = this.editor.actions.binding;
				for (let action of this.map[event.key].split('.')) {
					binding = binding[action]
				}
				binding.call()
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
