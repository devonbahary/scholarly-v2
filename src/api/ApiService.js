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

    static async postRequest(url, data) {
        try {
            const { data: responseData } = await axios.post(url, data);
            return responseData;
        } catch (err) {
            ApiService.handleError(err);
        }
    };

    static async putRequest(url, data) {
        try {
            return await axios.put(url, data);
        } catch (err) {
            ApiService.handleError(err);
        }
    }
};