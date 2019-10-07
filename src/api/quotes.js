import ApiService from "./ApiService";

export const getUserQuotes = () => {
    return ApiService.getRequest('/api/quotes');
};

export const getRandomUserQuote = () => {
    return ApiService.getRequest('/api/quotes/random');
};