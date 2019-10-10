import ApiService from "./ApiService";

export const getUserQuotes = () => {
    return ApiService.getRequest('/api/quotes');
};

export const getRandomUserQuote = () => {
    return ApiService.getRequest('/api/quotes/random');
};

export const saveQuote = quote => {
    if (!quote.id) {
        return ApiService.postRequest('/api/quotes', quote);
    }
    return ApiService.putRequest(`/api/quotes/${quote.id}`, quote);
};