import React, {Fragment} from "react";
import { inject } from "mobx-react";

import PlusIcon from "./icons/PlusIcon";
import Collection from "../collections/Collection";
import View from "./View";

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
        onClose();
    };

    const body = (
        <Fragment>
            {resources.map(collection =>
                <Collection
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