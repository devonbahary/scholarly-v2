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

const Quote = inject('collectionsStore', 'quotesStore')(observer(({
    collectionsStore,
    displayOption = false,
    quote,
    quotesStore,
}) => {
    const textareaRef = useRef(null);

    const handleEditClick = () => textareaRef.current.focus();

    const handleTextareaBlur = () => {
        setTimeout(async () => {
            quotesStore.resetActive();
            if (quote.id) return;

            if (quote.text) await quotesStore.create(quote);
            else quotesStore.resetAdding();
        }, 0);
    };

    const handleTextChange = e => {
        quote.text = e.target.value;
        if (quote.id) quotesStore.debouncedUpdate(quote);
    };

    const requestDelete = async () => await quotesStore.delete(quote);

    const isActive = quotesStore.activeUIKey === quote.uiKey;
    const isError = quotesStore.errorUIKey === quote.uiKey;

    const showOptions = displayOption && (Boolean(quote.id) || isError);

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

    const passiveOptions = (
        <Fragment>
            <BookIcon />
            {quote.collectionTitle}
        </Fragment>
    );

    return (
        <Resource
            activeOptions={activeOptions}
            body={body}
            isActive={isActive}
            isDeleted={quote.isDeleted}
            isError={isError}
            passiveOptions={passiveOptions}
            resource={quote}
            showOptions={showOptions}
            showPassiveOptions={quote.collectionTitle}
            store={quotesStore}
        />
    );
}));

export default Quote;