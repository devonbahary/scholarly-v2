import uuidv4 from "uuid/v4";
import { computed, observable } from "mobx";

export default class Quote {
    @observable collectionId;
    @observable collectionTitle;
    @observable isDeleted = false;
    @observable text = '';

    uiKey = uuidv4();

    constructor({ id, collectionId, collectionTitle, text }) {
        this.id = id;
        this.collectionId = collectionId;
        this.collectionTitle = collectionTitle;
        this.text = text;
    };

    @computed get asJSON() {
        return {
            id: this.id,
            text: this.text,
            collectionId: this.collectionId,
        };
    };
};