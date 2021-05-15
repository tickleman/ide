
String.prototype.lParse = function(delimiter)
{
	return this.substr(0, this.indexOf(delimiter))
}

String.prototype.rParse = function(delimiter)
{
	return this.substr(this.indexOf(delimiter) + delimiter.length)
}
