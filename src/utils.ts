export interface Utils {
    parseJSON(any): () => any;
    validateODataV2(any): () => any;
}

function parseJSON(data:any) : any {
    if (typeof data === "string") {
        try {
            data = JSON.parse(data);
        } catch (e) {
            return null;
        }
    }
    return data;
}

function validateODataV2(data:any) : any {
    data = parseJSON(data);
    var results = null;
    if (data.d && data.d.results && data.d.results.length != null) {
        results = data.d.results;
    } else if (data.d) {
        results = data.d;
    }
    return results || data;	
}

var utils: Utils = { parseJSON, validateODataV2 };
export default utils;