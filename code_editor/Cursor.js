class Cursor
{

	/**
	 * Backup of the image on the background of the cursor
	 *
	 * @type ImageData
	 */
	backup

	/**
	 * Cursor position column, starting with 0
	 *
	 * @example 1 means '2nd character'
	 * @type number
	 */
	column = 0

	/**
	 * @type Code_Editor
	 */
	editor

	/**
	 * setTimeout() handler between each blink off/on
	 *
	 * @type number
	 */
	handler

	/**
	 * Characters recognized as letters, that group into words
	 *
	 * @type string
	 */
	letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_'

	/**
	 * Cursor metrics, into the canvas, in pixels (horizontal may be floats, vertical are always integers)
	 *
	 * @type number{}
	 */
	metrics = { height: 0, left: 0, top: 0, width: 0 }

	/**
	 * Cursor position row, starting with 0
	 *
	 * @example 5 means '6th line'
	 * @type number
	 */
	row = 0

	/**
	 * Tells if the cursor is visible, following current blink state and show / hide actions
	 *
	 * @type boolean
	 */
	visible = false

	/**
	 * Move the cursor to the begin of the file
	 */
	beginOfFile()
	{
		this.moveTo(0, 0)
	}

	/**
	 * Move the cursor to the begin of the current line
	 */
	beginOfLine()
	{
		this.moveTo(0, this.row)
	}

	/**
	 * Clear timeout handler and prepare the next one
	 *
	 * @example blink('hide') ; blink('show')
	 * @param call string @values 'hide', 'show', 'stop', undefined
	 */
	blink(call)
	{
		if (this.handler !== undefined) {
			clearTimeout(this.handler)
		}
		switch (call) {
			case 'hide': call = () => { this.hide() } ; break
			case 'show': call = () => { this.show() } ; break
			default:     call = undefined
		}
		this.handler = (call === undefined) ? call : setTimeout(call, this.editor.settings.cursor.delay)
	}

	/**
	 * @param editor Editor
	 */
	constructor(editor)
	{
		this.editor = editor
	}

	/**
	 * Move the cursor down
	 *
	 * @param size number
	 */
	down(size = 1)
	{
		this.move(0, size)
	}

	/**
	 * Calculates new metrics and draw cursor at its new place (after having hidden it at its old place)
	 */
	draw()
	{
		this.hide()

		const editor  = this.editor
		const metrics = this.metrics
		const margin  = editor.settings.margin

		metrics.height = editor.metrics.letter_height + 2
		metrics.left   = margin.left + (this.column * (editor.metrics.letter_width + editor.metrics.letter_spacing)) - editor.left
		metrics.top    = margin.top + (this.row * editor.metrics.line_height) - editor.top
		metrics.width  = 2

		this.show()
	}

	/**
	 * Move the cursor to the end of the file
	 */
	endOfFile()
	{
		this.row = this.editor.lines.length - 1
		this.endOfLine()
	}

	/**
	 * Move the cursor to the end of the current line
	 */
	endOfLine()
	{
		this.moveTo(this.editor.displayedLine(this.row).length, this.row)
	}

	/**
	 * Hide the cursor (until the next blink delay)
	 */
	hide()
	{
		if (this.backup && this.visible) {
			const metrics = this.metrics
			this.editor.paper.pen.putImageData(this.backup, metrics.left, metrics.top)
		}
		if (this.visible) {
			this.visible = false
		}
		this.blink('show')
	}

	/**
	 * Move the cursor left
	 *
	 * @param size number
	 */
	left(size = 1)
	{
		this.move(-size, 0)
	}

	/**
	 * Relative move
	 *
	 * @param column number
	 * @param row    number
	 */
	move(column, row)
	{
		this.moveTo(this.column + column, this.row + row)
	}

	/**
	 * Absolute move
	 *
	 * @param column number
	 * @param row    number
	 */
	moveTo(column, row)
	{
		while ((column < 0) && row) {
			row --
			column += this.editor.displayedLine(row).length + 1
		}
		this.column = Math.max(0, column)
		this.row    = Math.max(0, row)
		this.draw()
		this.view()
	}

	/**
	 * Move the cursor until the next word
	 */
	nextWord()
	{
		const text   = this.editor.displayedLine(this.row)
		let   column = this.column + 1

		if (this.letters.indexOf(text[this.column]) > -1) {
			while ((column < text.length) && (this.letters.indexOf(text[column]) > -1)) {
				column ++
			}
		}
		while ((column < text.length) && (this.letters.indexOf(text[column]) < 0)) {
			column ++
		}

		if (column > text.length) {
			this.moveTo(0, this.row + 1)
		}
		else {
			this.moveTo(column, this.row)
		}
	}

	/**
	 * Move the cursor until the previous word
	 */
	previousWord()
	{
		const text   = this.editor.displayedLine(this.row)
		let   column = this.column - 1

		while ((column > 0) && (this.letters.indexOf(text[column - 1]) < 0)) {
			column --
		}
		while ((column > 0) && (this.letters.indexOf(text[column - 1]) > -1)) {
			column --
		}

		if (column < 0) {
			this.moveTo(this.editor.displayedLine(this.row - 1).length, this.row - 1)
		}
		else {
			this.moveTo(column, this.row)
		}
	}

	/**
	 * Move the cursor right
	 *
	 * @param size number
	 */
	right(size = 1)
	{
		this.move(size, 0)
		if (this.column > this.editor.displayedLine(this.row).length) {
			this.row ++
			this.column = 0
			this.draw()
			this.view()
		}
	}

	/**
	 * Show the cursor (until the next blink delay)
	 */
	show()
	{
		if (!this.visible) {
			const editor   = this.editor
			const metrics  = this.metrics
			const pen      = editor.paper.pen
			const settings = editor.settings
			this.backup    = pen.getImageData(metrics.left, metrics.top, metrics.width, metrics.height)
			pen.fillStyle  = settings.color.cursor
			pen.fillRect(metrics.left, metrics.top, metrics.width, metrics.height)
			this.visible = true
		}
		this.blink('hide')
	}

	/**
	 * Move the cursor up
	 *
	 * @param size number
	 */
	up(size = 1)
	{
		this.move(0, -size)
	}

	/**
	 * Ensure the cursor is visible. Move the editor is needed.
	 */
	view()
	{
		const left = this.metrics.left + this.editor.left - this.editor.settings.margin.left
		const top  = this.metrics.top  + this.editor.top  - this.editor.settings.margin.top
		this.editor.view(left, top, left + this.metrics.width, top + this.metrics.height)
	}

}

export default Cursor
