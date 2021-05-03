class Actions
{

	binding = {
		cursor: {
			beginOfLine: () => { this.editor.cursor.beginOfLine() },
			down:        () => { this.editor.cursor.move(0, 1) },
			endOfLine:   () => { this.editor.cursor.endOfLine() },
			left:        () => { this.editor.cursor.move(-1, 0) },
			right:       () => { this.editor.cursor.move(1, 0) },
			up:          () => { this.editor.cursor.move(0, -1) }
		}
	}

	/**
	 * @type Code_Editor
	 */
	editor

	/**
	 * @param editor Code_Editor
	 */
	constructor(editor)
	{
		this.editor = editor
	}

}

export default Actions
