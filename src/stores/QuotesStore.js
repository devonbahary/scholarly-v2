import BaseStore from "./BaseStore";
import Quote from "../models/Quote";
import QuotesApi from "../api/QuotesApi";

export default class QuotesStore extends BaseStore {
    constructor() {
        super(new QuotesApi(), Quote);
    };
};

