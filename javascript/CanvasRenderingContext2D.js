/**
 * This extends a CanvasRenderingContext2D object with simplified call functions
 */

/**
 * Measure actual text height : may be higher than fontHeight()
 *
 * @param text string
 * @returns number
 */
CanvasRenderingContext2D.prototype.getActualHeight = function(text)
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
CanvasRenderingContext2D.prototype.getActualWidth = function(text)
{
	const measure = this.measureText(text)
	return Math.abs(measure.actualBoundingBoxLeft) + Math.abs(measure.actualBoundingBoxRight)
}

/**
 * @returns string
 */
CanvasRenderingContext2D.prototype.getFontFamily = function()
{
	return this.font.split(' ', 2)[1]
}

/**
 * @param text string
 * @returns number
 */
CanvasRenderingContext2D.prototype.getFontHeight = function(text)
{
	const metrics = this.measureText(text)
	return (metrics.fontBoundingBoxAscent === undefined)
		? this.getActualHeight(text)
		: metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
}

/**
 * @returns number
 */
CanvasRenderingContext2D.prototype.getFontSize = function()
{
	return parseInt(this.font)
}

/**
 * @param text string
 * @returns number
 */
CanvasRenderingContext2D.prototype.getFontWidth = function(text)
{
	return this.measureText(text).width
}

/**
 * @param name string
 */
CanvasRenderingContext2D.prototype.setFontFamily = function(name)
{
	this.font = this.font.split(' ', 2)[1] + ' ' + name
}

/**
 * @param size number
 */
CanvasRenderingContext2D.prototype.setFontSize = function(size)
{
	this.font = size.toString() + 'px ' + this.font.split(' ', 2)[1]
}
