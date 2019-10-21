import _ from "lodash";
import { action, computed, observable } from "mobx";

const DEBOUNCE_UPDATE_RESOURCE_MS = 200;

const ERR_MSG_CREATE = 'Error creating';
const ERR_MSG_UPDATE = 'Error updating';
const ERR_MSG_DELETE = 'Error deleting';

export default class BaseStore {
    @observable resources = [];
    @observable activeUIKey;
    @observable errorUIKey;
    @observable errorMessage = '';

    constructor(api, model) {
        this.api = api;
        this.model = model;
    };

    debouncedUpdate = _.debounce(resource => this.update(resource), DEBOUNCE_UPDATE_RESOURCE_MS);

    @action resetError = () => {
        this.errorUIKey = null;
        this.errorMessage = '';
    };

    @action setError = (uiKey, message) => {
        this.errorUIKey = uiKey;
        this.errorMessage = message;
    };

    @action load = async () => {
        this.resetError();
        const data = await this.api.load();
        if (!data) return;
        this.resources = data.map(resource => new this.model(resource));
    };

    @action add = () => {
        const resource = new this.model();
        this.resources = [ resource, ...this.resources ];
        this.setActive(resource);
    };

    @action create = async resource => {
        const response = await this.api.create(resource);
        if (!response) return this.setError(resource.uiKey, ERR_MSG_CREATE);
        const { data } = response;
        resource.id = data.insertId;
    };

    @action update = async resource => {
        this.resetError();
        const success = await this.api.update(resource);
        if (!success) this.setError(resource.uiKey, ERR_MSG_UPDATE);
    };

    @action delete = async resource => {
        this.resetError();
        const success = await this.api.delete(resource);
        if (!success) this.setError(resource.uiKey, ERR_MSG_DELETE);
        else resource.isDeleted = true;
    };

    @action setActive = resource => {
        this.activeUIKey = this.activeUIKey === resource.uiKey ? null : resource.uiKey;
    };

    @action resetActive = () => {
        this.activeUIKey = null;
    };

    @action resetAdding = () => {
        this.resources.forEach(resource => {
            if (!resource.id) resource.isDeleted = true;
        });
    };

    @computed get isAdding() {
        return this.resources.some(resource => !resource.id && !resource.isDeleted);
    };
};