import _ from "lodash";
import { action, computed, observable } from "mobx";
import Quote from "../models/Quote";

const DEBOUNCE_UPDATE_QUOTE_MS = 200;

const ERR_MSG_CREATE = 'Error creating quote.';
const ERR_MSG_UPDATE = 'Error updating quote.';
const ERR_MSG_DELETE = 'Error deleting quote.';

export default class QuotesStore {
    @observable quotes = [];
    @observable activeQuoteUIKey;
    @observable errorQuoteUIKey;
    @observable errorMessage = '';

    constructor(quotesApi) {
        this.quotesApi = quotesApi;
    };

    debouncedUpdateQuote = _.debounce(quote => this.updateQuote(quote), DEBOUNCE_UPDATE_QUOTE_MS);

    @action resetError = () => {
        this.errorQuoteUIKey = null;
        this.errorMessage = '';
    };

    @action setError = (quoteId, message) => {
        this.errorQuoteUIKey = quoteId;
        this.errorMessage = message;
    };

    @action loadQuotes = async () => {
        this.resetError();
        const data = await this.quotesApi.load();
        if (!data) return;
        this.quotes = data.map(quote => new Quote(quote));
    };

    @action addQuote = () => {
        const quote = new Quote();
        this.quotes = [ quote, ...this.quotes ];
        this.setActiveQuote(quote);
    };

    @action createQuote = async quote => {
        const response = await this.quotesApi.create(quote);
        if (!response) return this.setError(quote.uiKey, ERR_MSG_CREATE);
        const { data } = response;
        quote.id = data.insertId;
    };

    @action updateQuote = async quote => {
        this.resetError();
        const success = await this.quotesApi.update(quote);
        if (!success) this.setError(quote.uiKey, ERR_MSG_UPDATE);
    };

    @action deleteQuote = async quote => {
        this.resetError();
        const success = await this.quotesApi.delete(quote);
        if (!success) this.setError(quote.uiKey, ERR_MSG_DELETE);
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

