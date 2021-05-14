import Actions  from './Actions.js'
import Cursor   from './Cursor.js'
import Edit     from './Edit.js'
import Keymap   from './Keymap.js'
import Metrics  from './Metrics.js'
import Settings from './Settings.js'

class Code_Editor
{

	/**
	 * @type Actions
	 */
	actions

	/**
	 * @type Cursor
	 */
	cursor

	/**
	 * @type Edit
	 */
	edit

	/**
	 * @type Keymap
	 */
	keymap

	/**
	 * @type number
	 */
	left = 0

	/**
	 * @type string[]
	 */
	lines = []

	/**
	 * @type Metrics
	 */
	metrics

	/**
	 * @type Paper
	 */
	paper

	/**
	 * @type Settings
	 */
	settings

	/**
	 * @type number
	 */
	top = 0

	/**
	 * Set this to true to ask for call to draw() at the end of the current event execution
	 *
	 * @type boolean
	 */
	will_draw = false

	/**
	 *
	 * @param paper Paper
	 */
	constructor(paper)
	{
		this.paper = paper
		this.paper.draw.push(() => { this.draw() })
		this.paper.resize.push(() => { this.metrics.calculate() })

		this.actions  = new Actions(this)
		this.cursor   = new Cursor(this)
		this.edit     = new Edit(this)
		this.keymap   = new Keymap(this)
		this.metrics  = new Metrics(this)
		this.settings = new Settings()
	}

	/**
	 * Calculate the displayed version of the line : tabs are changed into spaces
	 *
	 * @param line_or_row number|string the line number into lines, or the text itself
	 * @returns string the texte of the line, without tabs : they are all changed to spaces
	 */
	displayedLine(line_or_row)
	{
		const line = (typeof(line_or_row) === 'string') ? line_or_row : this.lines[line_or_row]
		return (line === undefined) ? '' : line.replace("\t", this.metrics.tab_string).replace("\r", '')
	}

	/**
	 * Fully redraw the editor and cursor
	 *
	 * To avoid non-optimized multiple redraws :
	 * - Avoid calling this directly, prefer :    editor.will_draw = true.
	 * - Only the event caller should implement : if (editor.will_draw) editor.draw()
	 */
	draw()
	{
		const metrics  = this.metrics
		const paper    = this.paper
		const pen      = paper.pen
		const settings = this.settings
		const margin   = settings.margin
		pen.fillStyle  = settings.color.paper
		pen.fillRect(0, 0, paper.width, paper.height)

		pen.rect(margin.left, margin.top, metrics.width, metrics.height)
		pen.clip()
		pen.fillStyle     = settings.color.default
		pen.font          = metrics.font
		pen.textBaseline  = 'top'

		let bottom = paper.height - margin.bottom
		let left   = margin.left - this.left
		let row    = Math.round(this.top / metrics.line_height)
		let top    = margin.top + (row * metrics.line_height) - this.top

		while ((row < this.lines.length) && (top < bottom)) {
			pen.fillText(this.displayedLine(row), left, top)
			row ++
			top += metrics.line_height
		}

		this.cursor.visible = false
		this.cursor.draw()

		this.will_draw = false
	}

	/**
	 * Calculate the column position into a string (or a line), taking account of tabs
	 *
	 * @param line_or_row number|string the line number into lines, or the text itself
	 * @param column      number the visible column number, into the line where tabs are changed to spaces
	 * @returns number the real column number into the string, shifted left depending on how many tabs precede column
	 */
	realColumnInLine(line_or_row, column)
	{
		const line      = (typeof(line_or_row) === 'string') ? line_or_row : this.lines[line_or_row]
		const tab_size  = this.settings.tab_size
		let   tab_count = 0
		while (((tab_count * tab_size) < column) && (line[tab_count] === "\t")) {
			tab_count ++
			column -= tab_size - 1
		}
		return column
	}

	/**
	 * Move the editor so this rectangle (eg the cursor) is fully visible
	 *
	 * The parameters are coordinates relative to the 0,0 point of the text document (not the canvas)
	 *
	 * @param left   number
	 * @param top    number
	 * @param right  number
	 * @param bottom number
	 */
	view(left, top, right, bottom)
	{
		const metrics = this.metrics
		if (left < this.left) {
			this.left      = left
			this.will_draw = true
		}
		if (top < this.top) {
			this.top       = top
			this.will_draw = true
		}
		if (right > this.left + metrics.width) {
			this.left      = right - metrics.width
			this.will_draw = true
		}
		if (bottom > this.top + metrics.height) {
			this.top       = bottom - metrics.height
			this.will_draw = true
		}
	}

}

export default Code_Editor
