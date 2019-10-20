import React, { Fragment, useRef } from "react";
import { inject, observer } from "mobx-react";
import Textarea from "react-textarea-autosize";

import BookIcon from "./icons/BookIcon";
import Card from "./Card";
import EditIcon from "./icons/EditIcon";
import ErrorIcon from "./icons/ErrorIcon";
import OptionsIcon from "./icons/OptionsIcon";
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

const Quote = inject('quotesStore')(observer(({
    displayOption = false,
    quote,
    quotesStore,
}) => {
    const textareaRef = useRef(null);

    const handleEditClick = () => textareaRef.current.focus();
    const handleOpenOptions = () => quotesStore.setActiveQuote(quote);

    const handleTextareaBlur = () => {
        setTimeout(async () => {
            quotesStore.resetActiveQuote();
            if (quote.id) return;

            if (quote.text) await quotesStore.createQuote(quote);
            else quotesStore.resetAddingQuote();
        }, 0);
    };

    const handleTextChange = e => {
        quote.text = e.target.value;
        if (quote.id) quotesStore.debouncedUpdateQuote(quote);
    };

    const requestDelete = async () => await quotesStore.deleteQuote(quote);

    const isActive = quotesStore.activeQuoteUIKey === quote.uiKey;
    const isError = quotesStore.errorQuoteUIKey === quote.uiKey;

    const classNameButtonOpenOptions = `${cardStyles.buttonOpenOptions} ${isActive ? cardStyles.optionsActive : ''}`;
    const classNameCollectionLink = `${cardStyles.collectionLink} ${isActive ? cardStyles.optionsActive : ''}`;
    const classNameOptions = `${cardStyles.options} ${isActive ? cardStyles.optionsActive : ''}`;

    const showOptions = displayOption && (Boolean(quote.id) || isError);

    const body = (
        <Fragment>
            <QuoteLeft />
            <Textarea
                autoFocus={!quote.id}
                inputRef={textareaRef}
                onBlur={handleTextareaBlur}
                onChange={handleTextChange}
                readOnly={!isActive}
                value={quote.text}
            />
            <QuoteRight />
        </Fragment>
    );

    const footer = (
        <Fragment>
            {isError && (
                <div className={cardStyles.footerRow}>
                    <div className={cardStyles.errorRow}>
                        <ErrorIcon />
                        <span className={cardStyles.errorMessage}>{quotesStore.errorMessage}</span>
                    </div>
                </div>
            )}
            {showOptions && (
                <div className={cardStyles.footerRow}>
                    <OptionsIcon className={classNameButtonOpenOptions} onClick={handleOpenOptions} />
                    {quote.collectionTitle && (
                        <div className={classNameCollectionLink}>
                            <BookIcon />
                            {quote.collectionTitle}
                        </div>
                    )}
                    <div className={classNameOptions}>
                        <BookIcon />
                        <EditIcon className={cardStyles.active} onClick={handleEditClick} />
                        <TrashIcon onClick={requestDelete} />
                    </div>
                </div>
            )}
        </Fragment>
    );

    return (
        <Card
            body={body}
            footer={footer}
            isDeleted={quote.isDeleted}
            isError={isError}
        />
    );
}));

export default Quote;