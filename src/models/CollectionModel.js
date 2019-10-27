import uuidv4 from "uuid/v4";
import { computed, observable } from "mobx";

export default class CollectionModel {
    @observable id;
    @observable title = '';
    @observable isDeleted = false;

    uiKey = uuidv4();

    constructor({ id = 0, quoteCount, title } = {}) {
        this.id =  id;
        this.quoteCount = quoteCount;
        this.title = title;
    };

    @computed get asJSON() {
        return {
            id: this.id,
            title: this.title,
        };
    };
};