import BaseStore from "./BaseStore";
import Collection from "../models/Collection";
import CollectionsApi from "../api/CollectionsApi";

export default class CollectionsStore extends BaseStore {
    constructor() {
        super(new CollectionsApi(), Collection);
    };
};