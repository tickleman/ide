import Actions  from './Actions.js'
import Cursor   from './Cursor.js'
import Keymap   from './Keymap.js'
import Metrics  from './Metrics.js'
import Paper    from './Paper.js'
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
	 *
	 * @param container
	 */
	constructor(container)
	{
		if (container === undefined) {
			container = document
		}
		this.paper = (container === document)
			? new Paper(container.getElementsByTagName('canvas')[0], container.getElementsByTagName('img'))
			: new Paper(container.querySelectorAll('canvas')[0], container.querySelectorAll('img'))
		this.paper.draw   = () => { this.draw() }
		this.paper.resize = () => { this.metrics.calculate() }

		this.actions  = new Actions(this)
		this.keymap   = new Keymap(this)
		this.settings = new Settings()
		this.metrics  = new Metrics(this)
		this.cursor   = new Cursor(this)
	}

	displayedLine(number)
	{
		const line = this.lines[number]
		return (line === undefined) ? '' : line.replace("\t", this.metrics.tab_string).replace("\r", '')
	}

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

		let bottom      = paper.height - margin.bottom
		let left        = margin.left - this.left
		let line_number = Math.round(this.top / metrics.line_height)
		let top         = margin.top + (line_number * metrics.line_height) - this.top

		while ((line_number < this.lines.length) && (top < bottom)) {
			pen.fillText(this.displayedLine(line_number), left, top)
			line_number ++
			top += metrics.line_height
		}

		this.cursor.draw()
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
		let   redraw  = false
		if (left < this.left) {
			this.left = left
			redraw    = true
		}
		if (top < this.top) {
			this.top = top
			redraw   = true
		}
		if (right > this.left + metrics.width) {
			this.left = right - metrics.width
			redraw    = true
		}
		if (bottom > this.top + metrics.height) {
			this.top = bottom - metrics.height
			redraw   = true
		}
		if (redraw) {
			this.draw()
		}
	}

}

export default Code_Editor
