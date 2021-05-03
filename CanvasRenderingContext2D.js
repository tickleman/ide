/**
 * This extends a CanvasRenderingContext2D object with simplified call functions
 *
 * @param pen CanvasRenderingContext2D
 * @returns CanvasRenderingContext2D
 */
export default function(pen)
{

	/**
	 * Measure actual text height : may be higher than fontHeight()
	 *
	 * @param text string
	 * @returns number
	 */
	pen.getActualHeight = function(text)
	{
		const metrics = this.measureText(text)
		return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
	}

	/**
	 * Measure actual text width : may be wider than fontWidth() eg when font is italic
	 *
	 * @param text string
	 * @returns number
	 */
	pen.getActualWidth = function(text)
	{
		const measure = this.measureText(text)
		return Math.abs(measure.actualBoundingBoxLeft) + Math.abs(measure.actualBoundingBoxRight)
	}

	/**
	 * @returns string
	 */
	pen.getFontFamily = function()
	{
		return this.font.split(' ', 2)[1]
	}

	/**
	 * @param text string
	 * @returns number
	 */
	pen.getFontHeight = function(text)
	{
		const metrics = this.measureText(text)
		return (metrics.fontBoundingBoxAscent === undefined)
			? this.getActualHeight(text)
			: metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
	}

	/**
	 * @returns number
	 */
	pen.getFontSize = function()
	{
		return parseInt(this.font)
	}

	/**
	 * @param text string
	 * @returns number
	 */
	pen.getFontWidth = function(text)
	{
		return this.measureText(text).width
	}

	/**
	 * @param name string
	 */
	pen.setFontFamily = function(name)
	{
		this.font = this.font.split(' ', 2)[1] + ' ' + name
	}

	/**
	 * @param size number
	 */
	pen.setFontSize = function(size)
	{
		this.font = size.toString() + 'px ' + this.font.split(' ', 2)[1]
	}

	return pen
}
