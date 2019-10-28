import React, {Fragment, useRef} from "react";
import { inject, observer } from "mobx-react";
import Textarea from "react-textarea-autosize";

import EditIcon from "../common/icons/EditIcon";
import Icon from "../common/icons/Icon";
import Resource from "../common/Resource";
import TrashIcon from "../common/icons/TrashIcon";

import cardStyles from "../common/Card.scss";
import collectionStyles from "./Collection.scss";

const CollectionCard = inject('collectionsStore')(observer(({
    collection,
    collectionsStore,
    onClick,
    showOptions = false,
}) => {
    const textareaRef = useRef(null);

    const handleEditClick = () => textareaRef.current.focus();

    const handleTextareaBlur = () => {
        setTimeout(async () => {
            collectionsStore.resetActive();
            if (collection.id) return;

            if (collection.title) await collectionsStore.create(collection);
            else collectionsStore.resetAdding();
        }, 0);
    };

    const handleTextChange = e => {
        collection.title = e.target.value;
        if (collection.id) collectionsStore.debouncedUpdate(collection);
    };

    const requestDelete = async () => await collectionsStore.delete(collection);

    const isActive = collectionsStore.activeUIKey === collection.uiKey;
    const isError = collectionsStore.errorUIKey === collection.uiKey;

    const body = (
        <Textarea
            autoFocus={!collection.id}
            className={collectionStyles.title}
            inputRef={textareaRef}
            onBlur={handleTextareaBlur}
            onChange={handleTextChange}
            onClick={!isActive ? onClick : () => {}}
            readOnly={!isActive}
            value={collection.title}
        />
    );

    const activeOptions = (
        <Fragment>
            <EditIcon className={cardStyles.active} onClick={handleEditClick} />
            <TrashIcon onClick={requestDelete} />
        </Fragment>
    );

    const passiveOptions = (
        <Fragment>
            <Icon>
                <i className="fas fa-quote-left"></i>
            </Icon>
            {collection.quoteCount}
        </Fragment>
    );

    return (
        <Resource
            activeOptions={activeOptions}
            body={body}
            collectionId={collection.id}
            isActive={isActive}
            isDeleted={collection.isDeleted}
            isError={isError}
            passiveOptions={passiveOptions}
            resource={collection}
            showOptions={showOptions}
            showPassiveOptions={Boolean(collection.quoteCount)}
            store={collectionsStore}
        />
    );
}));

export default CollectionCard;