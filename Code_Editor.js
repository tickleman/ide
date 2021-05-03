import Cursor   from './Cursor.js'
import Metrics  from './Metrics.js'
import Paper    from './Paper.js'
import Settings from './Settings.js'

class Code_Editor
{

	/**
	 * @type string
	 */
	code = ''

	/**
	 * @type Cursor
	 */
	cursor

	/**
	 * @type number
	 */
	left = 0

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
		if (container === undefined) container = document
		this.paper = (container === document)
			? new Paper(container.getElementsByTagName('canvas')[0], container.getElementsByTagName('img'))
			: new Paper(container.querySelectorAll('canvas')[0], container.querySelectorAll('img'))
		this.paper.draw = () => { this.draw() }
		this.settings   = new Settings()
		this.metrics    = new Metrics(this)
		this.cursor     = new Cursor(this)
	}

	draw()
	{
		const metrics = this.metrics
		const paper   = this.paper
		const pen     = paper.pen
		pen.fillStyle = this.settings.color.paper
		pen.fillRect(0, 0, paper.width, paper.height)

		pen.fillStyle     = this.settings.color.default
		pen.font          = this.metrics.font
		pen.textBaseline  = 'top'

		const lines       = this.code.split("\n")
		let   line_number = Math.round(this.top / metrics.line_height)
		let   top         = line_number * metrics.line_height - this.top

		while ((line_number < lines.length) && (top < paper.height)) {
			const line = lines[line_number].replace("\t", metrics.tab_string)
			pen.fillText(line, -this.left, top)
			line_number ++
			top += metrics.line_height
		}

		this.cursor.draw()
	}

}

export default Code_Editor
