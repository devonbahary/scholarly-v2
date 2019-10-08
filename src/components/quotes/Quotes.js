import React, { Fragment, useEffect, useRef, useState } from "react";
import Textarea from "react-textarea-autosize";
import useLoadingState from "../hooks/useLoadingState";
import { getUserQuotes } from "../../api/quotes";

import Card from "../common/Card";
import CollectionIcon from "../icons/CollectionIcon";
import PlusIcon from "../icons/PlusIcon";
import QuoteLeftIcon from "../icons/QuoteLeftIcon";
import QuoteRightIcon from "../icons/QuoteRightIcon";
import View from "../common/View";

import quotesStyles from "../../styles/Quotes.scss";


export const Quote = ({
    classNameCard,
    collectionId,
    collectionTitle,
    history, // history is used as a flag to display footer with link
    isAddingQuote,
    text: quoteText = '',
}) => {
    const [ text, setText ] = useState(quoteText);
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (isAddingQuote) {
            setText('');
            textAreaRef.current.focus();
        }
    }, [ isAddingQuote ]);

    const handleChange = e => setText(e.target.value);

    const body = (
        <Fragment>
            <QuoteLeftIcon className={quotesStyles.quoteLeft} />
            <Textarea
                inputRef={textAreaRef}
                onChange={handleChange}
                value={text}
            />
            <QuoteRightIcon className={quotesStyles.quoteRight} />
        </Fragment>
    );

    const footer = history && collectionTitle && (
        <Fragment>
            <CollectionIcon /> {collectionTitle}
        </Fragment>
    );

    const onFooterClick = () => {
        if (!collectionId || !history) return;
        history.push(`/collections/${collectionId}`);
    } ;

    return (
        <Card
            body={body}
            classNameCard={classNameCard}
            footer={footer}
            onFooterClick={onFooterClick}
        />
    );
};

export const QuoteList = ({ history, quotes }) => {
    return quotes && (
        <Fragment>
            {quotes.map(quote => (
                <Quote key={quote.id} {...quote} history={history} />
            ))}
        </Fragment>
    );
};

const Quotes = ({ history }) => {
    const [ quotes, setQuotes ] = useState([]);

    const {
        isLoading,
        isLoadingError,
        loadData,
    } = useLoadingState(setQuotes, getUserQuotes);

    return (
        <View
            body={<QuoteList quotes={quotes} history={history} />}
            headerNavIcon={<QuoteRightIcon />}
            headerNavText="Quotes"
            headerButton={<PlusIcon />}
            isLoading={isLoading}
            isLoadingError={isLoadingError}
            onLoadRetry={loadData}
        />
    );
};

export default Quotes;