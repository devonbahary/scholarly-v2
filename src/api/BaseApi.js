import axios from "axios";

export default class BaseApi {
    constructor(path) {
        this.path = path;
    };

    async request(cb) {
        try {
            return await cb();
        } catch (err) {
            return null;
        }
    };

    load() {
        return this.request(async () => {
            const { data } = await axios.get(this.path);
            return data;
        });
    }

    create(resource) {
        return this.request(async () => {
            return await axios.post(this.path, resource.asJSON);
        });
    };

    update(resource) {
        return this.request(async () => {
            return await axios.put(`${this.path}/${resource.id}`, resource.asJSON);
        });
    };

    delete(resource) {
        return this.request(async () => {
            return await axios.delete(`${this.path}/${resource.id}`);
        });
    };
};