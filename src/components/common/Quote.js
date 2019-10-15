import axios from "axios";
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

const Quote = ({
    activeQuoteId,
    displayOption = false,
    handleSetActiveQuote,
    quote,
}) => {
    const [ isDeleted, setIsDeleted ] = useState(false);
    const [ text, setText ] = useState(quote.text);
    const quoteRef = useRef(null);
    const textareaRef = useRef(null);

    const handleDelete = async () => {
        const data = await axios.delete(`/api/quotes/${quote.id}`);
        if (!data) return;
        // to smoothly collapse auto-height parent div, we must first assign an explicit height on deletion and then
        // trigger the CSS to collapse and transition the height to 0
        const offsetHeight = quoteRef.current.offsetHeight;
        quoteRef.current.style.height = `${offsetHeight}px`;
        setTimeout(() => {
            quoteRef.current.style.height = '';
            setIsDeleted(true);
        }, 0);
    };

    const handleEditClick = () => textareaRef.current.focus();
    const handleOpenOptions = () => handleSetActiveQuote(quote.id);
    const handleTextareaBlur = async () => {
        handleSetActiveQuote(null);
        await axios.put(`/api/quotes/${quote.id}`, { ...quote, text });
    };
    const handleTextChange = e => setText(e.target.value);

    const isActive = activeQuoteId === quote.id;

    const className = `${styles.quote} ${isDeleted ? styles.isDeleted : ''}`;
    const classNameButtonOpenOptions = `${styles.buttonOpenOptions} ${isActive ? styles.optionsActive : ''}`;
    const classNameCollectionLink = `${styles.collectionLink} ${isActive ? styles.optionsActive : ''}`;
    const classNameOptions = `${styles.options} ${isActive ? styles.optionsActive : ''}`;

    return (
        <div className={className} ref={quoteRef}>
            <div className={styles.body}>
                <QuoteLeft />
                <Textarea
                    inputRef={textareaRef}
                    onBlur={handleTextareaBlur}
                    onChange={handleTextChange}
                    readOnly={!isActive}
                    value={text}
                />
                <QuoteRight />
            </div>
            <div className={styles.footer}>
                {displayOption && (
                    <OptionsIcon className={classNameButtonOpenOptions} onClick={handleOpenOptions} />
                )}
                <BookIcon className={classNameCollectionLink}> {quote.collectionTitle} </BookIcon>
                <div className={classNameOptions}>
                    <BookIcon />
                    <EditIcon className={styles.active} onClick={handleEditClick} />
                    <TrashIcon onClick={handleDelete} />
                </div>
            </div>
        </div>
    );
};

export default Quote;