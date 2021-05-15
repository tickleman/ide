import Repository from './Repository.js'
import Workspace  from '../Workspace.js'

class Local_Storage extends Repository
{

	/**
	 * @type string
	 */
	url = 'localStorage://IDE/workspaces'

	/**
	 * @param workspace Workspace
	 */
	add(workspace)
	{
		super.add(workspace)
		this.saveRepository()
	}

	/**
	 * @param workspace Workspace|null
	 */
	constructor(workspace = null)
	{
		super(workspace)
		this.loadRepository()
	}

	/**
	 * @param workspace Workspace
	 */
	delete(workspace)
	{
		super.delete(workspace)
		this.saveRepository()
	}

	/**
	 * @returns string
	 */
	localUrl()
	{
		return this.url.rParse('://')
	}

	/**
	 * Load the list of workspaces from the local storage
	 */
	loadRepository()
	{
		this.workspaces = Object.unserialize(window.localStorage.getItem(this.localUrl()))
	}

	/**
	 * Save the list of workspaces to the local storage
	 */
	saveRepository()
	{
		window.localStorage.setItem(this.localUrl(), Object.serialize(this.workspaces))
	}

}

export default Local_Storage
