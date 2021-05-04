class Metrics
{

	/**
	 * @type Code_Editor
	 */
	editor

	/**
	 * A font name formatted for canvas
	 *
	 * @example '13px monospace'
	 * @type string
	 */
	font = ''

	/**
	 * The height of the text into the code editor
	 *
	 * @type number
	 */
	height = 0

	/**
	 * The height of a letter, without the line separator, in pixels (integer)
	 *
	 * @type number
	 */
	letter_height = 0

	/**
	 * The horizontal spacing between letters, in pixels (float)
	 *
	 * @type number
	 */
	letter_spacing = 0

	/**
	 * The width of a letter, without the letter separator, in pixels (float)
	 *
	 * @type number
	 */
	letter_width = 0

	/**
	 * The height of a text line, including the line separator, in pixels (integer)
	 *
	 * @example 13
	 * @type number
	 */
	line_height = 0

	/**
	 * The height of a line separator, in pixels (integer)
	 *
	 * @type number
	 */
	line_separator = 0

	/**
	 * The repeated spaces matching a tab
	 *
	 * @example '    '
	 * @type string
	 */
	tab_string = '    '

	/**
	 * The width of the text into the code editor
	 *
	 * @type number
	 */
	width = 0

	/**
	 * Calculates metrics using the current code editor paper and settings data
	 */
	calculate()
	{
		const editor   = this.editor
		const paper    = editor.paper
		const pen      = paper.pen
		const settings = editor.settings

		this.font           = settings.font.size.toString() + 'px ' + settings.font.family
		this.height         = paper.height - settings.margin.top - settings.margin.bottom
		this.letter_height  = Math.ceil(pen.getFontHeight('<AQpq>'))
		this.letter_width   = pen.getFontWidth('M') - 1
		this.letter_spacing = pen.getFontWidth('MM') - (pen.getFontWidth('M') * 2)
		this.line_separator = Math.ceil(settings.line_separator * this.letter_height)
		this.line_height    = this.letter_height + this.line_separator
		this.tab_string     = ' '.repeat(settings.tab_size)
		this.width          = paper.width - settings.margin.left - settings.margin.right
	}

	/**
	 * @param editor Editor
	 */
	constructor(editor)
	{
		this.editor = editor
	}

}

export default Metrics
