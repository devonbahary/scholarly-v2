import BaseApi from "./BaseApi";

export default class CollectionsApi extends BaseApi {
    constructor() {
        super('/api/collections');
    };
};