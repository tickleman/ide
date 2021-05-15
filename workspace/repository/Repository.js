class Repository
{

	/**
	 * @type string
	 */
	url

	/**
	 * @type string[] @ordered
	 */
	workspaces = []

	/**
	 * @param workspace string
	 */
	add(workspace)
	{
		this.workspaces.push(workspace)
		this.workspaces.sort()
	}

	/**
	 * @param workspace string|null
	 */
	constructor(workspace = null)
	{
		if (workspace) this.add(workspace)
	}

	/**
	 * @param workspace string
	 */
	delete(workspace)
	{
		delete this.workspaces[this.workspaces.indexOf(workspace)]
	}

	/**
	 * @returns string[] @ordered
	 */
	list()
	{
		return this.workspaces
	}

	/**
	 * @param workspace string
	 */
	remove(workspace)
	{
		delete this.workspaces[this.workspaces.indexOf(workspace)]
	}

}

export default Repository
