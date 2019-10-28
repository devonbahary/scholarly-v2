import axios from "axios";
import BaseApi from "./BaseApi";

export default class CollectionsApi extends BaseApi {
    constructor() {
        super('/api/collections');
    };

    getById(id) {
        return this.request(async () => {
            return await axios.get(`${this.path}/${id}`);
        });
    };
};