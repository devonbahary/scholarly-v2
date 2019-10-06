import React, { Component } from "react";
import axios from "axios";

import CollectionIcon from "../icons/CollectionIcon";
import QuoteLeftIcon from "../icons/QuoteLeftIcon";
import QuoteRightIcon from "../icons/QuoteRightIcon";

import cardStyles from "../../styles/cards.scss";
import quotesStyles from "../../styles/Quotes.scss";

export const Quote = ({ text, collectionTitle }) => (
    <div className={cardStyles.card}>
        <div className={cardStyles.cardBody}>
            <QuoteLeftIcon className={quotesStyles.quoteLeft} />
            {text}
            <QuoteRightIcon className={quotesStyles.quoteRight} />
        </div>
        <div className={cardStyles.cardFooter}>
            <CollectionIcon /> {collectionTitle}
        </div>
    </div>
);

class Quotes extends Component {
    state = {
        quotes: [],
    };

    async componentDidMount() {
        const { data } = await axios.get('/api/quotes');
        this.setState(({
            quotes: data,
        }));
    };

    render() {
        return (
            <div>
                {this.state.quotes.map(quote => (
                    <Quote key={quote.id} {...quote} />
                ))}
            </div>
        );
    };
};

export default Quotes;