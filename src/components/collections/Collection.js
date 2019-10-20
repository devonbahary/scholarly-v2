import React, {Fragment, useRef} from "react";
import { inject, observer } from "mobx-react";
import Textarea from "react-textarea-autosize";

import Card from "../common/Card";
import EditIcon from "../common/icons/EditIcon";
import Icon from "../common/icons/Icon";
import OptionsIcon from "../common/icons/OptionsIcon";
import TrashIcon from "../common/icons/TrashIcon";

import cardStyles from "../common/Card.scss";
import collectionStyles from "./Collection.scss";
import ErrorIcon from "../common/icons/ErrorIcon";

const Collection = inject('collectionsStore')(observer(({ collection, collectionsStore }) => {
    const textareaRef = useRef(null);

    const handleEditClick = () => textareaRef.current.focus();
    const handleOpenOptions = () => collectionsStore.setActiveCollection(collection);

    const handleTextareaBlur = () => {
        setTimeout(async () => {
            collectionsStore.resetActiveCollection();
            if (collection.id) return;

            if (collection.title) await collectionsStore.createCollection(collection);
            else collectionsStore.resetAddingCollection();
        }, 0);
    };

    const handleTextChange = e => {
        collection.title = e.target.value;
        if (collection.id) collectionsStore.debouncedUpdateCollection(collection);
    };

    const requestDelete = async () => await collectionsStore.deleteCollection(collection);

    const isActive = collectionsStore.activeCollectionUIKey === collection.uiKey;
    const isError = collectionsStore.errorCollectionUIKey === collection.uiKey;

    const classNameButtonOpenOptions = `${cardStyles.buttonOpenOptions} ${isActive ? cardStyles.optionsActive : ''}`;
    const classNameCollectionLink = `${cardStyles.collectionLink} ${isActive ? cardStyles.optionsActive : ''}`;
    const classNameOptions = `${cardStyles.options} ${isActive ? cardStyles.optionsActive : ''}`;

    const body = (
        <Textarea
            autoFocus={!collection.id}
            className={collectionStyles.title}
            inputRef={textareaRef}
            onBlur={handleTextareaBlur}
            onChange={handleTextChange}
            readOnly={!isActive}
            value={collection.title}
        />
    );

    const footer = (
        <Fragment>
            {isError && (
                <div className={cardStyles.footerRow}>
                    <div className={cardStyles.errorRow}>
                        <ErrorIcon />
                        <span className={cardStyles.errorMessage}>{collectionsStore.errorMessage}</span>
                    </div>
                </div>
            )}
            <div className={cardStyles.footerRow}>
                <OptionsIcon className={classNameButtonOpenOptions} onClick={handleOpenOptions} />
                {Boolean(collection.quoteCount) && (
                    <div className={classNameCollectionLink}>
                        <Icon>
                            <i className="fas fa-quote-left"></i>
                        </Icon>
                        {collection.quoteCount}
                    </div>
                )}
                <div className={classNameOptions}>
                    <EditIcon className={cardStyles.active} onClick={handleEditClick} />
                    <TrashIcon onClick={requestDelete} />
                </div>
            </div>
        </Fragment>
    );

    return (
        <Card
            body={body}
            footer={footer}
            isDeleted={collection.isDeleted}
            isError={isError}
        />
    );
}));

export default Collection;