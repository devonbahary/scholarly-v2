import uuidv4 from "uuid/v4";
import { computed, observable } from "mobx";

export default class QuoteModel {
    @observable id;
    @observable collectionId;
    @observable collectionTitle;
    @observable isDeleted = false;
    @observable text = '';

    uiKey = uuidv4();

    constructor({ id = 0, collectionId, collectionTitle, text } = {}) {
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
