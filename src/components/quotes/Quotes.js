import { inject, observer } from "mobx-react";
import React, { Fragment, useEffect, useState } from "react";

import Icon from "../common/icons/Icon";
import PlusIcon from "../common/icons/PlusIcon";
import QuoteCard from "../common/QuoteCard";
import QuoteCollectionModal from "./QuoteCollectionModal";
import View from "../common/View";


const Quotes = inject('collectionsStore', 'quotesStore')(observer(({ collectionsStore, quotesStore }) => {
    const { resources } = quotesStore;

    const [ quoteCollectionModalQuote, setQuoteCollectionModalQuote ] = useState(null);

    useEffect(() => {
        collectionsStore.load();
        quotesStore.load();
    }, []);

    const closeQuoteCollectionModal = () => {
        setQuoteCollectionModalQuote(null);
        quotesStore.resetActive();
    };

    const handleAddQuote = () => {
        if (!quotesStore.isAdding) quotesStore.add();
    };

    const body = resources && (
        <Fragment>
            {resources.map(quote => (
                <QuoteCard
                    key={quote.uiKey}
                    showOptions
                    quote={quote}
                    setQuoteCollectionModalQuote={setQuoteCollectionModalQuote}
                />
            ))}
            <QuoteCollectionModal onClose={closeQuoteCollectionModal} quote={quoteCollectionModalQuote} />
        </Fragment>
    );

    const headerButton = <PlusIcon onClick={handleAddQuote} shouldRotate={quotesStore.isAdding} />;

    const headerIcon = (
        <Icon>
            <i className="fas fa-quote-left"></i>
        </Icon>
    );

    return (
        <View
            body={body}
            headerButton={headerButton}
            headerIcon={headerIcon}
            headerTitle="Quotes"
        />
    );
}));

export default Quotes;