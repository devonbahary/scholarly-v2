import React, { Component, Fragment } from "react";
import ApiService from "../../ApiService";

import Card from "../common/Card";
import CollectionIcon from "../icons/CollectionIcon";
import QuoteLeftIcon from "../icons/QuoteLeftIcon";
import QuoteRightIcon from "../icons/QuoteRightIcon";
import View from "../common/View";

import quotesStyles from "../../styles/Quotes.scss";


export const Quote = ({ text, collectionId, collectionTitle, onFooterClick, displayCollectionTitle = true }) => {
    const body = (
        <Fragment>
            <QuoteLeftIcon className={quotesStyles.quoteLeft} />
            {text}
            <QuoteRightIcon className={quotesStyles.quoteRight} />
        </Fragment>
    );

    const footer = displayCollectionTitle && collectionTitle && (
        <Fragment>
            <CollectionIcon /> {collectionTitle}
        </Fragment>
    );

    return (
        <Card
            body={body}
            footer={footer}
            onFooterClick={onFooterClick}
        />
    );
};

class Quotes extends Component {
    state = {
        quotes: [],
    };

    async componentDidMount() {
        const data = await ApiService.getRequest('/api/quotes');
        if (!data) return;

        this.setState({
            quotes: data,
        });
    };

    linkToCollection({ collectionId }) {
        if (!collectionId) return;
        this.props.history.push(`/collections/${collectionId}`);
    };

    render() {
        const body = (
            <Fragment>
                {this.state.quotes.map(quote => (
                    <Quote key={quote.id} {...quote} onFooterClick={() => this.linkToCollection(quote)} />
                ))}
            </Fragment>
        );

        return (
            <View body={body} />
        );
    };
};

export default Quotes;