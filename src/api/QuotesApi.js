import BaseApi from "./BaseApi";

export default class QuotesApi extends BaseApi {
    constructor() {
        super('/api/quotes');
    };
};