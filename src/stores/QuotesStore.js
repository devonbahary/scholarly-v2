import { action } from "mobx";
import BaseStore from "./BaseStore";
import Quote from "../models/Quote";
import QuotesApi from "../api/QuotesApi";

const ERR_MSG_UPDATE_COLLECTION_ID = 'Error updating collection';

export default class QuotesStore extends BaseStore {
    constructor() {
        super(new QuotesApi(), Quote);
    };

    @action updateCollectionId = async (quote, collection) => {
        this.resetError();
        quote.collectionId = collection.id;
        const success = await this.api.update(quote);
        if (success) {
            quote.collectionId = collection.id;
            quote.collectionTitle = collection.title;
        } else {
            this.setError(quote.uiKey, ERR_MSG_UPDATE_COLLECTION_ID);
        }
    };
};

