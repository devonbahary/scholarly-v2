import BaseStore from "./BaseStore";
import CollectionModel from "../models/CollectionModel";
import CollectionsApi from "../api/CollectionsApi";

export default class CollectionsStore extends BaseStore {
    constructor() {
        super(new CollectionsApi(), CollectionModel);
    };
};