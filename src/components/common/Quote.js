import { inject, observer } from "mobx-react";
import React, { useRef, useState } from "react";
import Textarea from "react-textarea-autosize";

import BookIcon from "./icons/BookIcon";
import EditIcon from "./icons/EditIcon";
import OptionsIcon from "./icons/OptionsIcon";
import TrashIcon from "./icons/TrashIcon";

import styles from "./Quote.scss";


const QuoteLeft = () => (
    <div className={styles.quoteLeft}>
        <i className="fas fa-quote-left"></i>
    </div>
);

const QuoteRight = () => (
    <div className={styles.quoteRight}>
        <i className="fas fa-quote-right"></i>
    </div>
);

const Quote = inject('store')(observer(({
    displayOption = false,
    quote,
    store,
}) => {
    const [ isDeleted, setIsDeleted ] = useState(false);
    const quoteRef = useRef(null);
    const textareaRef = useRef(null);

    const handleDelete = () => {
        // to smoothly collapse auto-height parent div, we must first assign an explicit height on deletion and then
        // trigger the CSS to collapse and transition the height to 0
        const offsetHeight = quoteRef.current.offsetHeight;
        quoteRef.current.style.height = `${offsetHeight}px`;
        setTimeout(() => {
            quoteRef.current.style.height = '';
            setIsDeleted(true);
        }, 0);
    };

    if (quote.isDeleted) handleDelete();

    const handleEditClick = () => textareaRef.current.focus();
    const handleOpenOptions = () => store.setActiveQuote(quote);
    const handleTextareaBlur = async () => {
        store.setActiveQuote();
        await store.updateQuote(quote);
    };
    const handleTextChange = e => (quote.text = e.target.value);

    const requestDelete = async () => await store.deleteQuote(quote);

    const isActive = store.activeQuoteUIKey === quote.uiKey;
    const isError = store.errorQuoteUIKey === quote.uiKey;

    let className = styles.quote;
    if (isError) className += ` ${styles.isError}`;
    if (isDeleted) className += ` ${styles.isDeleted}`;

    const classNameButtonOpenOptions = `${styles.buttonOpenOptions} ${isActive ? styles.optionsActive : ''}`;
    const classNameCollectionLink = `${styles.collectionLink} ${isActive ? styles.optionsActive : ''}`;
    const classNameOptions = `${styles.options} ${isActive ? styles.optionsActive : ''}`;

    return (
        <div className={className} ref={quoteRef}>
            <div className={styles.body}>
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
            </div>
            <div className={styles.footer}>
                {displayOption && (
                    <OptionsIcon className={classNameButtonOpenOptions} onClick={handleOpenOptions} />
                )}
                <div className={classNameCollectionLink}>
                    <BookIcon />
                    {quote.collectionTitle}
                </div>
                <div className={classNameOptions}>
                    <BookIcon />
                    <EditIcon className={styles.active} onClick={handleEditClick} />
                    <TrashIcon onClick={requestDelete} />
                </div>
            </div>
        </div>
    );
}));

export default Quote;