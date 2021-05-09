class Edit
{

	/**
	 * @var Code_Editor
	 */
	editor

	/**
	 * Add spaces to row, until the column
	 *
	 * @param column number
	 * @param row    number
	 */
	addSpaces(column, row)
	{
		const editor = this.editor
		if (column === undefined) column = editor.cursor.column
		if (row    === undefined) row    = editor.cursor.row
		const displayed_line_length = editor.displayedLine(row).length
		if (column >= displayed_line_length) {
			editor.lines[row] += ' '.repeat(column - displayed_line_length)
		}
	}

	/**
	 * @param editor Code_Editor
	 */
	constructor(editor)
	{
		this.editor = editor
	}

	/**
	 * Delete one character after position
	 *
	 * @param column number
	 * @param row    number
	 */
	deleteAfter(column, row)
	{
		const editor = this.editor
		if (column === undefined) column = editor.cursor.column
		if (row    === undefined) row    = editor.cursor.row
		if (row >= editor.lines.length) return
		const line = editor.lines[row]
		column     = editor.realColumnInLine(line, column)
		if (column < line.length) {
			editor.lines[row] = line.substr(0, column) + line.substr(column + 1)
		}
		else if (row < editor.lines.length - 1) {
			this.addSpaces(column, row)
			editor.lines[row] += editor.lines[row + 1]
			this.deleteLine(row + 1)
		}
		editor.will_draw = true
	}

	/**
	 * Delete one character before position
	 *
	 * @param column      number
	 * @param row         number
	 * @param move_cursor boolean if true, the cursor is moved left
	 */
	deleteBefore(column, row, move_cursor = true)
	{
		const editor = this.editor
		if (column === undefined) column = editor.cursor.column
		if (row    === undefined) row    = editor.cursor.row
		if (!column && !row) return
		if (move_cursor) {
			if ((column > 0) && editor.lines[row][editor.realColumnInLine(row, column - 1)] === "\t") {
				editor.cursor.left(editor.settings.tab_size)
			}
			else {
				editor.cursor.left()
			}
		}
		if (column === 0) {
			row --
			column = editor.displayedLine(row).length + 1
		}
		this.deleteAfter(column - 1, row)
	}

	/**
	 * Delete a line
	 *
	 * @param row number
	 */
	deleteLine(row)
	{
		const editor = this.editor
		if (row === undefined) row = editor.cursor.row
		if (row >= editor.lines.length) return false
		editor.lines     = editor.lines.slice(0, row).concat(editor.lines.slice(row + 1))
		editor.will_draw = true
	}

	/**
	 * Insert text at position
	 *
	 * @param text        string
	 * @param column      number
	 * @param row         number
	 * @param move_cursor boolean if true, the cursor is moved left
	 */
	insert(text, column, row, move_cursor = true)
	{
		const editor = this.editor
		if (column === undefined) column = editor.cursor.column
		if (row    === undefined) row    = editor.cursor.row
		// add lines and spaces
		while (row >= editor.lines.length) {
			editor.lines.push('')
		}
		this.addSpaces(column, row)
		// insert text
		const line        = editor.lines[row]
		column            = editor.realColumnInLine(line, column)
		editor.lines[row] = line.substr(0, column) + text + line.substr(column)
		if (move_cursor) {
			editor.cursor.right(text.length)
		}
		// TODO Optimization : draw only current line : this will really be faster
		// TODO Optimization : ask for write, but do not write each time : write once then when we have the time to do so
		editor.will_draw = true
	}

	/**
	 * Insert a line from position (text after column will be moved to the new line)
	 *
	 * @param column      number
	 * @param row         number
	 * @param move_cursor boolean if true, the cursor is moved left
	 */
	insertLine(column, row, move_cursor = true)
	{
		const editor = this.editor
		if (column === undefined) column = editor.cursor.column
		if (row    === undefined) row    = editor.cursor.row
		if (move_cursor) {
			editor.cursor.moveTo(0, row + 1)
		}
		if (row >= editor.lines.length) return
		column            = editor.realColumnInLine(row, column)
		const old_line    = editor.lines[row]
		const new_line    = old_line.substr(column)
		editor.lines[row] = old_line.substr(0, column)
		editor.lines      = editor.lines.slice(0, row + 1).concat([new_line]).concat(editor.lines.slice(row + 1))
		editor.will_draw  = true
	}

	/**
	 * Insert a tab character at position
	 *
	 * @param column      number
	 * @param row         number
	 * @param move_cursor boolean if true, the cursor is moved left
	 */
	insertTab(column, row, move_cursor = true)
	{
		this.insert("\t", column, row, false)
		if (move_cursor) {
			editor.cursor.right(this.editor.settings.tab_size)
		}
	}

}

export default Edit
