import React, { Fragment, useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router";

import Icon from "../common/icons/Icon";
import PlusIcon from "../common/icons/PlusIcon";
import QuoteCard from "../common/QuoteCard";
import QuoteCollectionModal from "../quotes/QuoteCollectionModal";
import View from "../common/View";


const Collection = inject('collectionStore', 'collectionsStore', 'quotesStore')(observer((({
    collectionStore,
    collectionsStore,
    history,
    match,
    quotesStore,
}) => {
    const { collection, resources: quotes = []} = collectionStore;
    const [ quoteCollectionModalQuote, setQuoteCollectionModalQuote ] = useState(null);

    const collectionId = match.params.id;

    useEffect(() => {
        collectionStore.load(collectionId);
        collectionsStore.load();
    }, []);

    const closeQuoteCollectionModal = () => {
        setQuoteCollectionModalQuote(null);
        quotesStore.resetActive();
        return () => collectionStore.load(collectionId);
    };

    const handleAddQuote = () => {
        if (!collectionStore.isAdding) collectionStore.add();
    };

    const handleCollectionsLink = () => history.push('/collections');

    const body = (
        <Fragment>
            {quotes.map(quote => (
                <QuoteCard
                    key={quote.uiKey}
                    collectionId={collection.id}
                    quote={quote}
                    setQuoteCollectionModalQuote={setQuoteCollectionModalQuote}
                    showOptions
                    storeWithQuotes={collectionStore}
                />
            ))}
            <QuoteCollectionModal onClose={closeQuoteCollectionModal} quote={quoteCollectionModalQuote} />
        </Fragment>
    );

    const headerButton = <PlusIcon onClick={handleAddQuote} shouldRotate={collectionStore.isAdding} />;

    const headerIcon = (
        <Icon onClick={handleCollectionsLink}>
            <i className="fas fa-chevron-left"></i>
        </Icon>
    );

    return (
        <View
            body={body}
            headerButton={headerButton}
            headerIcon={headerIcon}
            headerTitle={collection ? collection.title : ''}
        />
    );
})));

export default withRouter(Collection);