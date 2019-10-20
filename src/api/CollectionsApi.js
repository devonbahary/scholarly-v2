import axios from "axios";

export default class CollectionsApi {
    loadCollections = async () => {
        try {
            const { data } = await axios.get('/api/collections');
            return data;
        } catch (err) {
            return null;
        }
    };

    createCollection = async collection => {
        try {
            return await axios.post('/api/collections', collection.asJSON);
        } catch (err) {
            return null;
        }
    };

    updateCollection = async collection => {
        try {
            const data = await axios.put(`/api/collections/${collection.id}`, collection.asJSON);
            if (!data) return false;
        } catch (err) {
            return false;
        }
        return true;
    };

    deleteCollection = async collection => {
        try {
            const data = await axios.delete(`/api/collections/${collection.id}`);
            if (!data) return false;
        } catch (err) {
            return false;
        }
        return true;
    };
};