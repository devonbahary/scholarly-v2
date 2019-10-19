import _ from "lodash";
import { action, computed, observable } from "mobx";
import Quote from "../models/Quote";

const DEBOUNCE_UPDATE_QUOTE_MS = 200;

export default class Store {
    @observable quotes = [];
    @observable activeQuoteUIKey;
    @observable errorQuoteUIKey;

    constructor(quotesApi) {
        this.quotesApi = quotesApi;
    };

    debouncedUpdateQuote = _.debounce(quote => this.updateQuote(quote), DEBOUNCE_UPDATE_QUOTE_MS);

    @action resetErrorQuoteId = () => {
        this.errorQuoteUIKey = null;
    };

    @action loadQuotes = async () => {
        this.resetErrorQuoteId();
        const data = await this.quotesApi.loadQuotes();
        if (!data) return;
        this.quotes = data.map(quote => new Quote(quote));
    };

    @action addQuote = () => {
        const quote = new Quote();
        this.quotes = [ quote, ...this.quotes ];
        this.setActiveQuote(quote);
    };

    @action createQuote = async quote => {
        const { data } = await this.quotesApi.createQuote(quote);
        quote.id = data.insertId;
    };

    @action updateQuote = async quote => {
        this.resetErrorQuoteId();
        const success = await this.quotesApi.updateQuote(quote);
        if (!success) this.errorQuoteUIKey = quote.uiKey;
    };

    @action deleteQuote = async quote => {
        this.resetErrorQuoteId();
        const success = await this.quotesApi.deleteQuote(quote);
        if (!success) this.errorQuoteUIKey = quote.uiKey;
        else quote.isDeleted = true;
    };

    @action setActiveQuote = quote => {
        this.activeQuoteUIKey = this.activeQuoteUIKey === quote.uiKey ? null : quote.uiKey;
    };

    @action resetActiveQuote = () => {
        this.activeQuoteUIKey = null;
    };

    @action resetAddingQuote = () => {
        this.quotes.forEach(quote => {
            if (!quote.id) quote.isDeleted = true;
        });
    };

    @computed get isAddingQuote() {
        return this.quotes.some(quote => !quote.id && !quote.isDeleted);
    };
};

