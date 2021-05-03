import Paper    from './Paper.js';
import Settings from './Settings.js';

class Code_Editor
{

	/**
	 * @type string
	 */
	code = ''

	/**
	 * @type number
	 */
	left = 0

	/**
	 * @type Paper
	 */
	paper

	/**
	 * @type Settings
	 */
	settings = new Settings

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
	}

	draw()
	{
		const paper   = this.paper
		const pen     = paper.pen
		pen.fillStyle = this.settings.color.paper
		pen.fillRect(0, 0, paper.width, paper.height)

		pen.fillStyle     = this.settings.color.default;
		pen.font          = this.settings.font.size.toString() + 'px ' + this.settings.font.family
		pen.textBaseline  = 'top'

		const font_height    = pen.getFontHeight('Q')
		const line_separator = Math.round(this.settings.line_separator * font_height)
		const line_height    = font_height + line_separator
		const lines          = this.code.split("\n")
		const tab_string     = ' '.repeat(this.settings.tab_size)
		let   line_number    = Math.round(this.top / line_height)
		let   top            = line_number * line_height - this.top

		while ((line_number < lines.length) && (top < paper.height)) {
			const line = lines[line_number].replace("\t", tab_string)
			pen.fillText(line, -this.left, top)
			line_number ++
			top += line_height
		}
	}

}

export default Code_Editor
