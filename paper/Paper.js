
class Paper
{

	/**
	 * @type HTMLCanvasElement
	 */
	canvas

	/**
	 * @type function[]
	 */
	draw = []

	/**
	 * @type number
	 */
	height

	/**
	 * @type Image[]|object
	 */
	images = {}

	/**
	 * @type boolean
	 */
	imagesLoaded = false

	/**
	 * @type CanvasRenderingContext2D
	 */
	pen

	/**
	 * @type function[]
	 */
	resize = []

	/**
	 * @type number
	 */
	width

	/**
	 * @param canvas HTMLCanvasElement
	 * @param images Image[]
	 */
	constructor(canvas, images)
	{
		if (canvas === undefined) canvas = document.getElementsByTagName('canvas')[0]
		if (images === undefined) images = document.getElementsByTagName('img')
		this.canvas = canvas
		this.pen    = canvas.getContext('2d')
		this.loadImages(images)
		document.addEventListener('DOMContentLoaded', () => {
			window.addEventListener('resize', () => { this.onResize() })
			this.onResize()
		})
	}

	example()
	{
		// You will need an HTML page with at least a canvas (images are not used here)
		const paper = new Paper
		paper.draw = () => {
			for (let [index, image] of Object.entries(this.images)) {
				this.pen.drawImage(image, index * 32, index * 32)
			}
			this.pen.setFontSize(32)
			this.pen.textAlign    = 'center'
			this.pen.textBaseline = 'middle'
			this.pen.fillText('Hello, World!', this.width / 2, this.height / 2)
		}
	}

	/**
	 * @param images Image[]
	 */
	loadImages(images)
	{
		let counter = images.length
		for (let image of images) {
			this.images[image.id] = image
			if (image.loaded) {
				counter --
			}
			else {
				image.addEventListener('load', (event) => {
					event.target.loaded = true
					counter --
					if (!counter) {
						this.imagesLoaded = true
						for (let draw of this.draw) draw.call(this)
					}
				})
			}
		}
	}

	onResize()
	{
		const size = this.canvas.getBoundingClientRect()
		this.canvas.height = this.height = size.height
		this.canvas.width  = this.width  = size.width
		for (let resize of this.resize) resize.call(this)
		for (let draw   of this.draw)   draw.call(this)
	}

}

export default Paper
