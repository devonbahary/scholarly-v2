import axios from "axios";

export default class BaseApi {
    constructor(path) {
        this.path = path;
    };

    async load() {
        try {
            const { data } = await axios.get(this.path);
            return data;
        } catch (err) {
            return null;
        }
    }

    async create(resource) {
        try {
            return await axios.post(this.path, resource.asJSON);
        } catch (err) {
            return null;
        }
    };

    async update(resource) {
        try {
            const data = await axios.put(`${this.path}/${resource.id}`, resource.asJSON);
            if (!data) return false;
        } catch (err) {
            return false;
        }
        return true;
    };

    async delete(resource) {
        try {
            const data = await axios.delete(`${this.path}/${resource.id}`);
            if (!data) return false;
        } catch (err) {
            return false;
        }
        return true;
    };
};