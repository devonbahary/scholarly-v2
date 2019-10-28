import { action, observable } from "mobx";
import BaseStore from "./BaseStore";
import CollectionsApi from "../api/CollectionsApi";
import QuotesApi from "../api/QuotesApi";
import QuoteModel from "../models/QuoteModel";
import CollectionModel from "../models/CollectionModel";

export default class CollectionStore extends BaseStore {
    @observable collection;

    constructor() {
        super(new QuotesApi(), QuoteModel);
        this.collectionsApi = new CollectionsApi();
    };

    @action load = async id => {
        this.resetError();
        const { data } = await this.collectionsApi.getById(id);
        if (!data) return;

        const { collection, quotes } = data;

        this.collection = new CollectionModel(collection);
        this.resources = quotes.map(quote => new this.model(quote));
    };
};