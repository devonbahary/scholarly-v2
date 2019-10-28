import React, {Fragment} from "react";
import { inject } from "mobx-react";

import PlusIcon from "../common/icons/PlusIcon";
import CollectionCard from "../collections/CollectionCard";
import View from "../common/View";

import styles from "./QuoteCollectionModal.scss";


const QuoteCollectionModal = inject('collectionsStore', 'quotesStore')(({
    collectionsStore,
    quotesStore,
    onClose,
    quote,
}) => {
    if (!quote) return null;

    const { resources } = collectionsStore;

    const updateQuoteCollection = async collection => {
        await quotesStore.updateCollectionId(quote, collection);
        const cb = onClose();
        if (cb) cb();
    };

    const body = (
        <Fragment>
            {resources.map(collection =>
                <CollectionCard
                    key={collection.uiKey}
                    collection={collection}
                    onClick={() => updateQuoteCollection(collection)}
                />
            )}
        </Fragment>
    );

    const headerButton = <PlusIcon onClick={onClose} shouldRotate={true} />;

    return (
        <div className={styles.modal}>
            <div className={styles.overlay} onClick={onClose}>
            </div>
            <div className={styles.dialog}>
                <View
                    body={body}
                    headerButton={headerButton}
                />
            </div>
        </div>
    );
});

export default QuoteCollectionModal;