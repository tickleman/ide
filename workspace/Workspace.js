import Settings from './Settings.js'

class Workspace
{

	/**
	 * @type Code_Editor
	 */
	editor

	/**
	 * @type Paper
	 */
	paper

	/**
	 * @type Settings
	 */
	settings

	constructor(paper, editor)
	{
		this.editor   = editor
		this.paper    = paper
		this.settings = new Settings
	}

}

export default Workspace
