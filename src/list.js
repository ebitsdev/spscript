var utils = require("./utils");
var Permissions = require("./permissions");
var headers = require("./requestHeaders");

/**
 * Represents a SharePoint list. You shouldn't ever be new'ing this class up up yourself, instead you'll get it from your dao as shown in first example.
 * @class
 * @param {IBaseDao} dao - Data access object used to make requests.
 * @property {Permissions} permissions - allows checking security information of the Web
 * @property {string} baseUrl - API relative url (value = "/web")
 * @example <caption>You access a 'List' by passing a name to the 'lists' property of the dao.</caption>
 * var dao = new SPScript.RestDao(_spPageContextInfo.webAbsoluteUrl);
 * var list = dao.lists("Tasks");
 * list.getItemById(12).then(function(item) { console.log(item) });
 */
var List = function(listname, dao) {
	this.listname = listname;
	this.baseUrl = "/web/lists/getbytitle('" + listname + "')";
	this._dao = dao;
	this.permissions = new Permissions(this.baseUrl, this._dao);
};

List.prototype.getFields = function(odataQuery) {
	var url = (this.baseUrl + "/fields" + appendOData(odataQuery));
	return this._dao
		.get(url)
		.then(utils.validateODataV2);
};

List.prototype.getField = function(fieldName) {
	return this.getFields(`$filter=InternalName eq '${fieldName}'`).then(fields => {
		if (fields.length) return fields[0];
		else throw new Error("Unable to find field: " + fieldName);
	})
};

List.prototype.updateField = function(fieldName, updates) {
	this.getField(fieldName).then(f => {
		var url = `${this.baseUrl}/Fields(guid'${f.Id}')`
		updates.__metadata = { type: "SP.Field" };
		return this._dao.authorizedPost(url, updates, "MERGE");
	})
}
/**
 * Retrieves items in the lists
 * @param {string} [odata] - OData string
 * @returns {Promise<Array>} - A Promise that resolves an array of list items
 * @example <caption>Get all items</caption>
 * list.getItems().then(function(items) { console.log(items) });
 * @example <caption>Get first 5 items by passing in optional OData.</caption>
 * list.getItems("$top=5").then(function(items) { console.log(items) });
 */
List.prototype.getItems = function(odataQuery) {
	return this._dao
		.get(this.baseUrl + "/items" + appendOData(odataQuery))
		.then(utils.validateODataV2);
};

/**
 * Retrieves a specific item based on SharePoint ID
 * @param {int} id - SharePoint integer Id
 * @param {string} [odata] - OData string
 * @returns {Promise} - A Promise that resolves to a single list item
 * @example <caption>Get the item with ID of 5.</caption>
 * list.getItemById(5).then(function(item) { console.log(item) });
 * @example <caption>Only bring back 'Title' and 'Status' using optional OData string</caption>
 * list.getItemById(5, "$select=Title,Status").then(function(items) { console.log(items) });
 */
List.prototype.getItemById = function(id, odata) {
	var url = this.baseUrl + "/items(" + id + ")" + appendOData(odata);
	return this._dao.get(url).then(utils.validateODataV2);
};

/**
 * Retrieves basic information about the list
 * @returns {Promise<SP.Web>} - A Promise that resolves to an object containing non-deferred properties of an SP.List (https://msdn.microsoft.com/en-us/library/office/jj244873.aspx)
 * @example
 * list.info().then(function(info) { console.log(info) });
 */
List.prototype.info = function() {
	return this._dao.get(this.baseUrl).then(utils.validateODataV2);
};

/**
 * Creates a SharePoint list item
 * @param {object} item - Javascript object representing the list item
 * @param {string} [requestDigest] - Optional request digest token used to authorize the action. One will be automatically retrieved if not provided.
 * @returns {Promise} - A Promise that resolves to the inserted list item
 * @example <caption>Add a list item. Set Title and Status.</caption>
 * var newItem = {
 *    Title: "Test Created Item",
 *    MyStatus: "Red"
 * };
 * list.addItem(newItem).then(function(item) { console.log(item) });
 */

List.prototype.addItem = function(item, digest) {
	return this._dao.ensureRequestDigest(digest).then(digest => {
		return this._dao.get(this.baseUrl).then(data => {

				//decorate the item with the 'type' metadata
				item = Object.assign({}, {
					"__metadata": {
						"type": data.d.ListItemEntityTypeFullName
					}
				}, item);

				var customOptions = {
					headers: headers.getAddHeaders(digest)
				};
				return this._dao.post(this.baseUrl + "/items", item, customOptions)
			})
			.then(utils.validateODataV2);
	})
};

/**
 * Updates a SharePoint list item
 * @param {int} itemId - The SharePoint Id of the item to update
 * @param {object} updates - Javascript object representing columns you want to update
 * @param {string} [requestDigest] - Optional request digest token used to authorize the action. One will be automatically retrieved if not provided.
 * @returns {Promise} - A Promise
 * @example <caption>Update the item's Title</caption>
 * var updates = {
 *    Title: "Updated Title"
 * };
 * list.updateItem(12, updates).then(function() { console.log"Success") });
 */
List.prototype.updateItem = function(itemId, updates, digest) {
	return this._dao.ensureRequestDigest(digest).then(digest => {
		return this.getItemById(itemId).then(item => {
			//decorate the item with the 'type' metadata
			updates = Object.assign({}, {
				"__metadata": {
					"type": item.__metadata.type
				}
			}, updates);

			var customOptions = {
				headers: headers.getUpdateHeaders(digest, item.__metadata.etag)
			};

			return this._dao.post(item.__metadata.uri, updates, customOptions);
		});
	})
};

/**
 * Updates a SharePoint list item
 * @param {int} itemId - The SharePoint Id of the item to update
 * @param {string} [requestDigest] - Optional request digest token used to authorize the action. One will be automatically retrieved if not provided.
 * @returns {Promise} - A Promise
 * @example <caption>Delete the item with an ID of 12</caption>
 * list.deleteItem(12).then(function() { console.log"Success") });
 */
List.prototype.deleteItem = function(itemId, digest) {
	return this._dao.ensureRequestDigest(digest).then(digest => {
		return this.getItemById(itemId).then(item => {
			var customOptions = {
				headers: headers.getDeleteHeaders(digest, item.__metadata.etag)
			};
			return this._dao.post(item.__metadata.uri, "", customOptions);
		});
	});
};

/**
 * Attach file to an item in the list
 * @param {int} itemId - The SharePoint Id of the item to update
 * @param {string} filename - Filename to be put in SharePoint
 * @param {string} content - File content
 * @returns {Promise} - A Promise
 * @example <caption>Attach 'hello.txt' with content 'Hello World' to itemId 12</caption>
 * list.addAttachment(12, 'hello.txt', 'Hello World').then(function() { console.log"Success") });
 */
List.prototype.addAttachment = function(itemId, filename, content, requestDigest) {
	if (requestDigest) return this._addAttachment(itemId, filename, content, requestDigest);
	return this._dao.getRequestDigest().then(requestDigest => {
		return this._addAttachment(itemId, filename, content, requestDigest)
	});
};

List.prototype._addAttachment = function(itemId, filename, content, requestDigest) {
	var customOptions = {
		headers: headers.getFilestreamHeaders(requestDigest),
		data: content
	};
	return this._dao.post(this.baseUrl + "/items(" + itemId + ")/AttachmentFiles/add(FileName='" + filename + "')", null, customOptions)
};

/**
 * Delete attachment of an item in the list
 * @param {int} itemId - The SharePoint Id of the item to update
 * @param {string} filename - Filename to be deleted in SharePoint
 * @returns {Promise} - A Promise
 * @example <caption>Delete attachment 'hello.txt' in itemId 12</caption>
 * list.deleteAttachment(12, 'hello.txt').then(function() { console.log"Success") });
 */
List.prototype.deleteAttachment = function(itemId, filename, requestDigest) {
	if (requestDigest) return this._deleteAttachment(itemId, filename, requestDigest);
	return this._dao.getRequestDigest().then(requestDigest => {
		return this._deleteAttachment(itemId, filename, requestDigest)
	});
}
List.prototype._deleteAttachment = function(itemId, filename, requestDigest) {
	return this._dao.get(this.baseUrl).then(data => {
		var customOptions = {
			headers: {
				'Accept': 'application/json;odata=verbose',
				'X-RequestDigest': requestDigest,
				'X-HTTP-Method': "DELETE"
			}
		};
		return this._dao.post(this.baseUrl + "/items(" + itemId + ")/AttachmentFiles('" + filename + "')", null, customOptions)
	});
}

/**
 * Retrieves items in the list based on the value of a column
 * @param {string} key - The column name
 * @param {string} value - The column value to match on
 * @param {string} [odata] - OData string
 * @returns {Promise<Array>} - A Promise that resolves an array of list items
 * @example <caption>Get all items whose status is "In Progress"</caption>
 * list.findItems("Status", "In Progress").then(function(items) { console.log(items) });
 * @example <caption>Get first 5 items whose Yes/No field is 'Yes'</caption>
 * list.getItems("MyYesNoField", true, "$top=5").then(function(items) { console.log(items) });
 */
List.prototype.findItems = function(key, value, extraOData) {
	//if its a string, wrap in single quotes
	var filterValue = typeof value === "string" ? "'" + value + "'" : value;
	var odata = "$filter=" + key + " eq " + filterValue + appendOData(extraOData, "&");

	return this.getItems(odata);
};

/**
 * Retrieves the first list item that matches the column value you pass
 * @param {string} key - The column name
 * @param {string} value - The column value to match on
 * @param {string} [odata] - OData string
 * @returns {Promise} - A Promise that resolves to a list items
 * @example <caption>The first item whose Title is "TODO"</caption>
 * list.findItem("Title", "TODO").then(function(item) { console.log(item) });
 */
List.prototype.findItem = function(key, value, odata) {
	return this.findItems(key, value, odata).then(items => {
		if (items && items.length && items.length > 0) {
			return items[0];
		}
		return null;
	});
};

var appendOData = function(odata, prefix) {
	prefix = prefix || "?";
	if (odata) return prefix + odata;
	return "";
};

module.exports = List;