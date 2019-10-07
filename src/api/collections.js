import ApiService from "./ApiService";

export const getUserCollections = () => {
    return ApiService.getRequest('/api/collections');
};

export const saveCollection = collection => {
    return ApiService.postRequest('/api/collections', collection);
};

export const getCollection = collectionId => {
    return ApiService.getRequest(`/api/collections/${collectionId}`);
};