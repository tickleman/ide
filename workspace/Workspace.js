import Local_Storage from './repository/Local_Storage.js'
import Settings      from './Settings.js'

class Workspace
{

	/**
	 * @type Code_Editor
	 */
	editor

	/**
	 * @type string
	 */
	name = 'Workspace'

	/**
	 * @type Paper
	 */
	paper

	/**
	 * @type Settings
	 */
	settings

	constructor(name, paper, editor)
	{
		this.editor   = editor
		this.name     = name
		this.paper    = paper
		this.settings = new Settings
	}

	serialize(object, key, value)
	{

	}

	unserialize(object, key, value)
	{

	}

}

export default Workspace
