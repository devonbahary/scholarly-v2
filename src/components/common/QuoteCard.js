import React, { Fragment, useRef } from "react";
import { inject, observer } from "mobx-react";
import Textarea from "react-textarea-autosize";

import BookIcon from "./icons/BookIcon";
import EditIcon from "./icons/EditIcon";
import Resource from "./Resource";
import TrashIcon from "./icons/TrashIcon";

import cardStyles from "./Card.scss";
import quoteStyles from "./Quote.scss";


const QuoteLeft = () => (
    <div className={quoteStyles.quoteLeft}>
        <i className="fas fa-quote-left"></i>
    </div>
);

const QuoteRight = () => (
    <div className={quoteStyles.quoteRight}>
        <i className="fas fa-quote-right"></i>
    </div>
);

const QuoteCard = inject('collectionsStore')(observer(({
    collectionId,
    collectionsStore,
    quote,
    showOptions,
    showPassiveOptions,
    storeWithQuotes,
    setQuoteCollectionModalQuote,
}) => {
    const textareaRef = useRef(null);

    const handleEditClick = () => textareaRef.current.focus();

    const handleTextareaBlur = () => {
        setTimeout(async () => {
            storeWithQuotes.resetActive();
            if (quote.id) return;

            if (quote.text) await storeWithQuotes.create(Object.assign(quote, { collectionId }));
            else storeWithQuotes.resetAdding();
        }, 0);
    };

    const handleTextChange = e => {
        quote.text = e.target.value;
        if (quote.id) storeWithQuotes.debouncedUpdate(quote);
    };

    const openQuoteCollectionModal = () => setQuoteCollectionModalQuote(quote);
    const requestDelete = async () => await storeWithQuotes.delete(quote);

    const isActive = storeWithQuotes && storeWithQuotes.activeUIKey === quote.uiKey;
    const isError = storeWithQuotes && storeWithQuotes.errorUIKey === quote.uiKey;

    const body = (
        <Fragment>
            <Textarea
                autoFocus={!quote.id}
                inputRef={textareaRef}
                onBlur={handleTextareaBlur}
                onChange={handleTextChange}
                readOnly={!isActive}
                value={quote.text}
            />
            <QuoteLeft />
            <QuoteRight />
        </Fragment>
    );

    const activeOptions = (
        <Fragment>
            {Boolean(collectionsStore.resources.length) && <BookIcon onClick={openQuoteCollectionModal} />}
            <EditIcon className={cardStyles.active} onClick={handleEditClick} />
            <TrashIcon onClick={requestDelete} />
        </Fragment>
    );

    const passiveOptions = showPassiveOptions && (
        <Fragment>
            <BookIcon />
            {quote.collectionTitle}
        </Fragment>
    );

    return (
        <Resource
            activeOptions={activeOptions}
            body={body}
            collectionId={quote.collectionId}
            isActive={isActive}
            isDeleted={quote.isDeleted}
            isError={isError}
            passiveOptions={passiveOptions}
            resource={quote}
            showOptions={showOptions && (Boolean(quote.id) || isError)}
            showPassiveOptions={quote.collectionTitle}
            store={storeWithQuotes}
        />
    );
}));

export default QuoteCard;