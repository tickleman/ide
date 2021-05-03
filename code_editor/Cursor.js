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
	 */
	down()
	{
		this.move(0, 1)
	}

	/**
	 * Calculates new metrics and draw cursor at its new place (after having hidden it at its old place)
	 */
	draw()
	{
		this.hide()

		const editor  = this.editor
		const metrics = this.metrics

		metrics.height = editor.metrics.letter_height + 2
		metrics.width  = 2
		metrics.left   = (this.column * (editor.metrics.letter_width + editor.metrics.letter_spacing)) - editor.left
		metrics.top    = (this.row * editor.metrics.line_height) + editor.top

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
		if (this.visible) {
			const metrics = this.metrics
			this.editor.paper.pen.putImageData(this.backup, metrics.left, metrics.top)
			this.visible = false
		}

		this.blink('show')
	}

	/**
	 * Move the cursor left
	 */
	left()
	{
		this.move(-1, 0)
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
		this.column = Math.max(0, column)
		this.row    = Math.max(0, row)
		this.draw()
	}

	/**
	 * Move the cursor until the next word
	 */
	nextWord()
	{
		const text   = this.editor.displayedLine(this.row)
		const char   = text[this.column]
		let   column = this.column + 1
		const skips  = this.skippedLetters(char)

		for (let skip of skips) {
			while ((column < text.length) && (skip.indexOf(text[column]) > -1)) {
				column ++
			}
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
		let   text   = this.editor.displayedLine(this.row)
		let   column = this.column - 1
		const char   = text[column]
		const skips  = this.skippedLetters(char)

		for (let skip of skips) {
			while ((column > 0) && (skip.indexOf(text[column - 1]) > -1)) {
				column --
			}
		}
		if (column < 0) {
			text = this.editor.displayedLine(this.row - 1)
			this.moveTo(text.length, this.row - 1)
		}
		else {
			this.moveTo(column, this.row)
		}
	}

	/**
	 * Move the cursor right
	 */
	right()
	{
		this.move(1, 0)
	}

	/**
	 * Which letters are skipped when this character is under the cursor on next / previous word move
	 *
	 * @param char string
	 * @returns string[]
	 */
	skippedLetters(char)
	{
		if (char === ' ') {
			return [' ']
		}
		if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(char) > -1) {
			return ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz']
		}
		if ('abcdefghijklmnopqrstuvwxyz'.indexOf(char) > -1) {
			return ['abcdefghijklmnopqrstuvwxyz']
		}
		return []
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
	 */
	up()
	{
		this.move(0, -1)
	}

}

export default Cursor