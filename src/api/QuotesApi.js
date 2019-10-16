import axios from "axios";

export default class QuotesApi {
    loadQuotes = async () => {
        try {
            const { data } = await axios.get('/api/quotes');
            return data;
        } catch (err) {
            return null;
        }
    };

    updateQuote = async quote => {
        try {
            const data = await axios.put(`/api/quotes/${quote.id}`, quote.asJSON);
            if (!data) return false;
        } catch (err) {
            return false;
        }
        return true;
    };

    deleteQuote = async quote => {
        try {
            const data = await axios.delete(`/api/quotes/${quote.id}`);
            if (!data) return false;
        } catch (err) {
            return false;
        }
        return true;
    };
};