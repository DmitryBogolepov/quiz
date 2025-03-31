import {QueryParams} from "../types/query-params.type";

export class UrlManager {

    public static getQueryParams():QueryParams {
        const qs:string = document.location.hash.split('+').join(' ');
        let params:QueryParams = {},
            tokens : RegExpExecArray | null,
            re:RegExp = /[?&]([^=]+)=([^&]*)/g;

        while(tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    }
}