import axios from "axios";

export default class ApiService {
    static handleError(err) {
        console.error(err);
    };

    static async getRequest(url) {
        try {
            const { data } = await axios.get(url);
            return data;
        } catch (err) {
            ApiService.handleError(err);
        }
    };
};