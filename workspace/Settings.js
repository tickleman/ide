class Settings
{

	color = {
		directory: '#a9b7c6',
		file:      '#a9b7c6',
		paper:     '#2b2b2b',
		selected:  '#5a5a5a',
		storage:   '#a9b7c6',
		workspace: '#a9b7c6'
	}

	font = {
		family: 'monospace',
		size:   13
	}

	/**
	 * @type number
	 */
	line_separator = .5

	/**
	 * Margin inside of the canvas where the editor displays (you can do what you want around it
	 *
	 * @type number{}
	 */
	margin = { bottom: 4, left: 4, right: 4, top: 4 }

	/**
	 * Workspace layout size
	 *
	 * @type number{}|string{}
	 */
	size = { height: 'auto', width: 200 }

	/**
	 * The workspace storage information
	 *
	 * @type string{}
	 */
	storage = {
		name: 'ide:workspace',
		type: 'localStorage'
	}

}

export default Settings
