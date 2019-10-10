import uuid from 'uuid';
import React, { Fragment, useState } from "react";
import Textarea from "react-textarea-autosize";
import useLoadingState from "../hooks/useLoadingState";
import { getUserQuotes } from "../../api/quotes";

import Card from "../common/Card";
import CollectionIcon from "../icons/CollectionIcon";
import PlusIcon from "../icons/PlusIcon";
import QuoteLeftIcon from "../icons/QuoteLeftIcon";
import QuoteRightIcon from "../icons/QuoteRightIcon";
import View from "../common/View";

import cardStyles from "../../styles/Card.scss";
import quotesStyles from "../../styles/Quotes.scss";


export const Quote = ({
    collectionId,
    collectionTitle,
    history, // history is used as a flag to display footer with link
    id,
    isError,
    keyId,
    onSave,
    shouldNotRender,
    text: quoteText = '',
}) => {
    const isAdding = !id && !shouldNotRender;

    const [ text, setText ] = useState(quoteText);

    const handleChange = e => setText(e.target.value);

    const handleSave = () => {
        onSave({ id, keyId, collectionId, text });
    };

    const body = (
        <Fragment>
            <QuoteLeftIcon className={quotesStyles.quoteLeft} />
            <Textarea
                autoFocus={isAdding}
                onBlur={handleSave}
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
    };

    let classNameCard = '';
    if (isError) classNameCard = cardStyles.error;
    else if (isAdding) classNameCard = cardStyles.new;

    return (
        <Card
            body={body}
            classNameCard={classNameCard}
            footer={footer}
            onFooterClick={onFooterClick}
            shouldNotRender={shouldNotRender}
        />
    );
};

export const QuoteList = ({ errorKeyId, history, onSave, quotes }) => {
    return quotes && (
        <Fragment>
            {quotes.map(quote => (
                <Quote key={quote.keyId} {...quote} history={history} isError={errorKeyId === quote.keyId} onSave={onSave} />
            ))}
        </Fragment>
    );
};

const Quotes = ({ history }) => {
    const [ quotes, setQuotes ] = useState([]);

    const handleLoad = data => {
        if (!data) return;
        setQuotes(data.map(data => ({
            keyId: uuid(),
            ...data,
        })));
    };

    const {
        isLoading,
        isLoadingError,
        loadData,
    } = useLoadingState(handleLoad, getUserQuotes);

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