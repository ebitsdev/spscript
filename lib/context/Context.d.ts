import { RequestOptions } from "./request";
import List from "../List";
import Search from "../search/Search";
export default class Context {
    webUrl: string;
    search: Search;
    private clientId;
    private clientSecret;
    private ensureToken;
    private accessToken;
    constructor(url: string, clientId?: string, clientSecret?: string);
    private executeRequest(url, opts);
    get(url: string, opts?: RequestOptions): Promise<any>;
    post(url: string, body?: any, opts?: RequestOptions): Promise<any>;
    authorizedPost(url: string, body?: any, verb?: string): Promise<any>;
    ensureRequestDigest(digest?: string): Promise<string>;
    getRequestDigest(): Promise<string>;
    lists(name: string): List;
    private _packagePostBody(body, opts);
}
