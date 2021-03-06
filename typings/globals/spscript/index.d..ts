interface RoleMember {
    login: string;
    name: string;
    id: string;
}

interface RolePermission {
    name: string;
    description: string;
    basePermissions: string[];
}

interface RoleAssignment {
    member:RoleMember;
    roles: RolePermission[];
}

 // ==== AJAX ====
interface AjaxOptions {
    /**
     * REQUIRED
     */
    url: string,
    headers: Object, //undefined
    /**
     * Default: 'GET'
     * 
     */
    method?:string, //GET
    /**
     * Default: true
     */
    async?: boolean, //true
    /**
     * XMLHttpRequest.responseType
     * Default: 'json'
     */
    type?: string, //json
    /**
     * Used for POST requests
     */
    data: string, //undefined
}

declare abstract class BaseDao {
    customActions:CustomActions
    profiles:Profiles
    search: Search
    web: Web
    /**
     * If a list name is passed, an SPScript.List object, otherwise performs a request to get all the site's lists
     * Ex: dao.lists('MyList').getItemById(12).then(i => console.log(i));
     */
    lists(name: string): List

    /**
     * Returns all the lists on a site
     * Ex: dao.lists().then(lists => console.log(lists));
     */
    lists(): Promise<any>

    /**
     * Generic helper to make AJAX GET request. Do not put '/_api' in your url.
     * Ex: dao.get('/web/contentTypes').then(function(data) { console.log(data.d.results)})
     */
    get(apiRelativeUrl:string, extendedAjaxOptions:string): Promise<any>

    /**
     * Generic helper to make AJAX POST request. Do not put '/_api' in your url.
     */
    post(apiRelativeUrl:string, body:Object, extendedAjaxOptions:string): Promise<any>


    /**
     * Retrieves a token needed to authorize any updates
     */
    getRequestDigest(): Promise<string>
}

interface CustomActionScope {
    id:number;
    name:string;
    url:string;
}

interface CustomAction {
    Name:string;
    Title:string;
    Description:string;
    Group:string;
    Sequence:number;
    Scope:string;
    Location:string;
    ScriptSrc:string;
    ScriptBlock:string;
}

declare class CustomActions {

    _dao:BaseDao;
    scopes: {
        Web: CustomActionScope,
        Site: CustomActionScope
    }

    /**
     * Gets all Site and Web scoped custom actions.
     */
    get(): Promise<CustomAction[]>

    /**
     * Gets a custom action by name.
     */
    get(name:string): Promise<CustomAction>

    /**
     * Updates a custom action. You must set 'Name' property.
     */
    update(updates:CustomAction): Promise<any>

    /**
     * Removes a custom action.
     */
    remove(name:string): Promise<any>

    /**
     * Adds a custom action
     */
    add(customAction:CustomAction): Promise<any>

    /**
     * Injects a javascript file onto the site
     */
    addScriptLink(name:string, url:string, opts:CustomAction): Promise<any>

    /**
     * Injects a CSS file onto the site
     */
    addCssLink(name:string, url:string, opts:CustomAction): Promise<any>
}
declare class Permissions {
    baseUrl:string;
    _dao:BaseDao;

    /**
     * Gets all the role assignments on that securable
     * Ex: dao.web.permissions.getRoleAssignments().then(r => console.log(r));
     */
    getRoleAssignments(): Promise<RoleAssignment>;
    
    /**
     * Gets all the role assignments on that securable.
     * Default: Current User
     */
    check(email?:string): Promise<string[]>
}

declare class List {
    listname:string;
    baseUrl:string;
    _dao:BaseDao;
    permissions: Permissions;

    /**
     * Retrieves items in the lists. Allows optional odata. Defaults to return all items if no odata.
     */
    getItems(odata?:string): Promise<any[]>;
    
    /**
     * Retrieves a specific item based on SharePoint ID
     */
    getItemById(id:any, odata?:string) : Promise<any>
    
    /**
     * Retrieves basic information about the list
     */
    info() : Promise<any>

    /**
     * Creates a SharePoint list item
     */
    addItem(item, digest?:string) : Promise<any>

    /**
     * Deletes a SharePoint list item
     */
    deleteItem(itemId:number, digest?:string) : Promise<any>

    /**
     * Retrieves items in the list based on the value of a column
     */
    findItems(key:string, value:string, odata?:string): Promise<any[]>;

    /**
     * Retrieves the first list item that matches the column value you pass
     */
    findItem(key:string, value:string, odata?:string): Promise<any[]>;
}

declare class Profiles {
    _dao:BaseDao;
    baseUrl:string;

    /**
     * Gets the profile of the current user
     */
    current(): Promise<any>

    /**
     * Sets a profile property
     */
    setProperty(emailOrUser, key:string, value:any): Promise<any>

    /**
     * Gets a profile based on a User object w/ have 'LoginName'
     */
    getProfile(user:any) : Promise<any>

    /** 
     * Gets a profile based on an email address.
     */
    getByEmail(email:string): Promise<any>
}

interface SearchQueryOptions {
    sourceid:string,
    startrow:number,
    rowlimit:number,
    selectedproperties:string[],
    refiners:string[]
}

interface Refiner {
    RefinerName:string,
    RefinerOptions: any[],
};

interface SearchResults {
    elapsedTime:string,
    suggestion:any,
    resultsCount:number,
    totalResults:number,
    totalResultsIncludingDuplicates:number,
    items: any[],
    refiners: Refiner[]
}

declare class Search {
    _dao:BaseDao

    /**
     * Performs a query using the search service
     */
    query(queryText:string, opts:SearchQueryOptions) : Promise<SearchResults>
    
    /**
     * Performs Search Service query for just People results
     */
    people(queryText:string, opts:SearchQueryOptions) : Promise<SearchResults>
}

interface SPScriptFile {
    name:string,
    serverRelativeUrl:string,
    title:string,
    checkoutType:string,
    byteLength:number,
    majorVersion:number,
    minorVersion:number,
    uri:string
}

interface SPScriptFolder {
    name:string,
    serverRelativeUrl:string,
    itemCount:number,
    guid:string,
    uri:string,
    files: SPScriptFile[]
}

declare class Web {
    _dao:BaseDao
    baseUrl:string
    permissions:Permissions

    /**
     * Retrieves basic info about the site
     */
    info(): Promise<any>

    /** Retrieves all of the subsites */
    subsites(): Promise<any[]>

    /** Retrieves a folder */
    getFolder(servverRelativeUrl:string): Promise<SPScriptFolder>

    /**
     * Uploads a file to the server relative folder url. Make sure to set 'fields.name'
     */
    uploadFile(fileContent:File, folderUrl, fields, digest?): Promise<any>

    /**
     * Uploads a text content as a file to the server relative folder url. Make sure to set 'fields.name'
     */
    uploadFile(fileContent:string, folderUrl, fields, digest?): Promise<any>

    /** Retrieves a file */
    getFile(serverRelativeUrl:string): Promise<SPScriptFile>

    /** Copies a file. Both urls are server relative */
    copyFile(sourceUrl:string, destinationUrl:string, digest?:string): Promise<any>

    /** Deletes a file at the server relative url */
    deleteFile(serverRelativeUrl:string, digest?:string): Promise<any>

    /** Retrieves a users object based on an email address */
    getUser(email:string): Promise<any>

    /** Performs an action on the file at the server relative url. Actions = SP.File method names */
    fileAction(serverRelativeUrl:string, action:string, params:any, digest?:string) 

}
declare namespace SPScript {
    export class RestDao extends BaseDao {
        constructor(url?:string);
    }

    export namespace utils {
        /**
         * Helps parse raw json response to remove ceremonious OData data.d namespace. 
         * Tries JSON.parse() and then pulling out actual result from data.d or data.d.results
        */
        export function validateODataV2(data: any) : Object       

        /**
         * A method to allow you to wait for a single script dependency to load.
         * Looks on the global scope for the namespace you provide.
         * Example: 'jQuery' or '$' or 'SP.UI.Dialog'
         */
        function waitForLibrary(namespace: string) : Promise<any>

        /**
         * A method to allow you to wait for script dependencies to load.
         * Looks on the global scope for the namespaces you provide.
         * Example: 'jQuery' or '$' or 'SP.UI.Dialog'
         */
        function waitForLibraries(namespaces: string[]) : Promise<any>

        /**
         * A method to allow you to check a deeply nested namespace.
         * Looks on the global scope for the namespace you provide.
         * Example: 'SP.UI.Dialog'
         */
        function validateNamespace(namespace: string) : boolean

        /**
        * A method to load a javascript file onto your page
        */
        function getScript(url: string) : Promise<any>

        /**
        * A method to load javascript files onto your page.  
        */
        function getScripts(url: string) : Promise<any>

        /**
        * A method to load a css file onto your page  
        */
        function loadCss(url: string) : Promise<any>

        /**
        * Performs and AJAX request based on options you pass you. Your options must at least have a url.
        */
        export function ajax(options:AjaxOptions) : Promise<any>;
        export module ajax {
            /**
            * Inject a function in to handle errors.  
            * This function will be called BEFORE promise is rejected.
            */
            function addErrorHandler(handler: Function) : void;
            /**
             * Override any default values. 
             * Object.assign(defaults, options);
             */
            function setDefaults(options: AjaxOptions) : void;
        }

        
        // ==== QUERY STRING ====
        /**
        * Utility methods for getting query string values and turning an object into a query string
        */
        export module queryString {

            /**
            * Turns a normal js Object into a string in form of "key1=value1&key2=value2..."
            * By default, if the value has a space, it will be single quoted. 
            * Passing true for 'quoteValues' will cause all values to be quoted.
            */
            function fromObj(obj:Object, quoteValues?:boolean) : string;
            
            /**
            * Default: window.location.search,
            * Turns a string in form of "key1=value1&key2=value2..." into a javascript object
            */
            function toObj(str?: string) : Object;
        }

        export module headers {
            function getStandardHeaders(digest?:string)
            function getAddHeaders(digest:string)
            function getUpdateHeaders(digest:string)
            function getDeleteHeaders(digest:string)
            function getFilestreamHeaders(digest:string)
        }
    }
}

declare module 'spscript' {
	export = SPScript;
}
