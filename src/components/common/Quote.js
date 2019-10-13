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
    const [ text, setText ] = useState(quote.text);
    const textareaRef = useRef(null);

    const handleEditClick = () => textareaRef.current.focus();
    const handleOpenOptions = () => handleSetActiveQuote(quote.id);
    const handleTextareaBlur = () => handleSetActiveQuote(null);
    const handleTextChange = e => setText(e.target.value);

    const isActive = activeQuoteId === quote.id;

    const classNameButtonOpenOptions = `${styles.buttonOpenOptions} ${isActive ? styles.optionsActive : ''}`;
    const classNameCollectionLink = `${styles.collectionLink} ${isActive ? styles.optionsActive : ''}`;
    const classNameOptions = `${styles.options} ${isActive ? styles.optionsActive : ''}`;

    return (
        <div className={styles.quote}>
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
                    <TrashIcon />
                </div>
            </div>
        </div>
    );
};

export default Quote;