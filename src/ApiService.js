import axios from "axios";

export default class ApiService {
    static handleRequest(request) {
        try {
            return request();
        } catch (err) {
            console.error(err);
            alert(err);
            return null;
        }
    };

    static getRequest(url) {
        const request = async () => {
            const { data } = await axios.get(url);
            return data;
        };

        return ApiService.handleRequest(request);
    };
};