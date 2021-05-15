/**
 * Sorts an associative array object by key
 *
 * @param object mixed{}
 * @returns mixed{}
 */
Object.prototype.ksort = function(object)
{
	const result = {}
	for (const key of Object.keys(object).sort()) {
		result[key] = object[key]
	}
	return result
}

/**
 * @param object object
 * @returns string serialized object
 * @todo missing a way to get the .js file back for import
 */
Object.prototype.serialize = function(object)
{
	object['#'] = object.constructor.name
	return JSON.stringify(object)
}

/**
 * @param string string serialized object
 * @returns object
 * @todo missing an import
 */
Object.prototype.unserialize = function(string)
{
	const reClass = (anonymous) => {
		const object = new anonymous['#']
		delete anonymous['#']
		for (const [key, value] in Object.entries(anonymous)) {
			object[key] = ((typeof(value) === 'object') && value['#']) ? reClass(value) : value
		}
		return object
	}
	return reClass(JSON.parse(string))
}
