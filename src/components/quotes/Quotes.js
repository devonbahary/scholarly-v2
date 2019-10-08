import React, { useState, Fragment } from "react";
import useLoadingState from "../hooks/useLoadingState";
import { getUserQuotes } from "../../api/quotes";

import Card from "../common/Card";
import CollectionIcon from "../icons/CollectionIcon";
import PlusIcon from "../icons/PlusIcon";
import QuoteLeftIcon from "../icons/QuoteLeftIcon";
import QuoteRightIcon from "../icons/QuoteRightIcon";
import View from "../common/View";

import quotesStyles from "../../styles/Quotes.scss";


// history is used as a flag to display footer with link
export const Quote = ({ text, collectionId, collectionTitle, history }) => {
    const body = (
        <Fragment>
            <QuoteLeftIcon className={quotesStyles.quoteLeft} />
            {text}
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
            footer={footer}
            onFooterClick={onFooterClick}
        />
    );
};

const Quotes = ({ history }) => {
    const [ quotes, setQuotes ] = useState([]);

    const {
        isLoading,
        isLoadingError,
        loadData,
    } = useLoadingState(setQuotes, getUserQuotes);

    const body = quotes && (
        <Fragment>
            {quotes.map(quote => (
                <Quote key={quote.id} {...quote} history={history} />
            ))}
        </Fragment>
    );

    return (
        <View
            body={body}
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