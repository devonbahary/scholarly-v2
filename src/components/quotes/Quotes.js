import React, { Component, Fragment } from "react";
import ApiService from "../../ApiService";

import Card from "../common/Card";
import CollectionIcon from "../icons/CollectionIcon";
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

    render() {
        const body = (
            <Fragment>
                {this.state.quotes.map(quote => (
                    <Quote key={quote.id} {...quote} history={this.props.history} />
                ))}
            </Fragment>
        );

        return (
            <View body={body} />
        );
    };
};

export default Quotes;