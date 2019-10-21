import axios from "axios";

export default class BaseApi {
    constructor(path) {
        this.path = path;
    };

    request(cb) {
        try {
            return cb();
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

    async create(resource) {
        return this.request(async () => {
            return await axios.post(this.path, resource.asJSON);
        });
    };

    async update(resource) {
        return this.request(async () => {
            return await axios.put(`${this.path}/${resource.id}`, resource.asJSON);
        });
    };

    async delete(resource) {
        return this.request(async () => {
            return await axios.delete(`${this.path}/${resource.id}`);
        });
    };
};