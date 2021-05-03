import Paper from './Paper.js';

class Code_Editor
{

	/**
	 * @var string
	 */
	code = ''

	/**
	 * @var Paper
	 */
	paper

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
		pen.fillStyle = '#2b2b2b';
		pen.fillRect(0, 0, paper.width, paper.height)
		pen.fillStyle     = '#a9b7c6';
		pen.font          = '13px monospace'
		pen.textBaseline  = 'top'
		const left       = 4
		const separator  = 6
		const tab_size   = 4
		let   top        = 4
		const height     = pen.getFontHeight('A')
		const tab_string = ' '.repeat(tab_size)
		for (let line of this.code.split("\n")) {
			line = line.replace("\t", tab_string)
			pen.fillText(line, left, top)
			top += height + separator
		}
	}

}

export default Code_Editor
