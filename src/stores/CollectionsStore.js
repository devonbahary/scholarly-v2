import _ from "lodash";
import { action, computed, observable } from "mobx";
import Collection from "../models/Collection";

const DEBOUNCE_UPDATE_QUOTE_MS = 200;

const ERR_MSG_CREATE = 'Error creating collection.';
const ERR_MSG_UPDATE = 'Error updating collection.';
const ERR_MSG_DELETE = 'Error deleting quote.';

export default class CollectionsStore {
    @observable collections = [];
    @observable activeCollectionUIKey;
    @observable errorCollectionUIKey;
    @observable errorMessage = '';

    constructor(collectionsApi) {
        this.collectionsApi = collectionsApi;
    };

    debouncedUpdateCollection = _.debounce(collection => this.updateCollection(collection), DEBOUNCE_UPDATE_QUOTE_MS);

    @action resetError = () => {
        this.errorCollectionUIKey = null;
        this.errorMessage = '';
    };

    @action setError = (collectionId, message) => {
        this.errorCollectionUIKey = collectionId;
        this.errorMessage = message;
    };

    @action loadCollections = async () => {
        this.resetError();
        const data = await this.collectionsApi.loadCollections();
        if (!data) return;
        this.collections = data.map(collection => new Collection(collection));
    };

    @action addCollection = () => {
        const collection = new Collection();
        this.collections = [ collection, ...this.collections ];
        this.setActiveCollection(collection);
    };

    @action createCollection = async collection => {
        const response = await this.collectionsApi.createCollection(collection);
        if (!response) return this.setError(collection.uiKey, ERR_MSG_CREATE);
        const { data } = response;
        collection.id = data.insertId;
    };

    @action updateCollection = async collection => {
        this.resetError();
        const success = await this.collectionsApi.updateCollection(collection);
        if (!success) this.setError(collection.uiKey, ERR_MSG_UPDATE);
    };

    @action deleteCollection = async collection => {
        this.resetError();
        const success = await this.collectionsApi.deleteCollection(collection);
        if (!success) this.setError(collection.uiKey, ERR_MSG_DELETE);
        else collection.isDeleted = true;
    };

    @action setActiveCollection = collection => {
        this.activeCollectionUIKey = this.activeCollectionUIKey === collection.uiKey ? null : collection.uiKey;
    };

    @action resetActiveCollection = () => {
        this.activeCollectionUIKey = null;
    };

    @action resetAddingCollection = () => {
        this.collections.forEach(collection => {
            if (!collection.id) collection.isDeleted = true;
        });
    };

    @computed get isAddingCollection() {
        return this.collections.some(collection => !collection.id && !collection.isDeleted);
    };
};