import { action, observable } from "mobx";
import Quote from "../models/Quote";

export default class Store {
    @observable quotes = [];
    @observable activeQuoteId;
    @observable errorQuoteId;

    constructor(quotesApi) {
        this.quotesApi = quotesApi;
    };

    @action resetErrorQuoteId = () => {
        this.errorQuoteId = null;
    };

    @action loadQuotes = async () => {
        this.resetErrorQuoteId();
        const data = await this.quotesApi.loadQuotes();
        if (!data) return;
        this.quotes = data.map(quote => new Quote(quote));
    };

    @action updateQuote = async quote => {
        this.resetErrorQuoteId();
        const success = await this.quotesApi.updateQuote(quote);
        if (!success) this.errorQuoteId = quote.id;
    };

    @action deleteQuote = async quote => {
        this.resetErrorQuoteId();
        const success = await this.quotesApi.deleteQuote(quote);
        if (!success) this.errorQuoteId = quote.id;
        return success;
    };

    @action setActiveQuote = quote => {
        this.activeQuoteId = this.activeQuoteId === quote.id ? null : quote.id;
    };
};

