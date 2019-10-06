import React, {Component, Fragment} from "react";
import axios from "axios";

import Card from "../common/Card";
import CollectionIcon from "../icons/CollectionIcon";
import QuoteLeftIcon from "../icons/QuoteLeftIcon";
import QuoteRightIcon from "../icons/QuoteRightIcon";
import View from "../common/View";

import quotesStyles from "../../styles/Quotes.scss";


export const Quote = ({ text, collectionTitle }) => {
    const body = (
        <Fragment>
            <QuoteLeftIcon className={quotesStyles.quoteLeft} />
            {text}
            <QuoteRightIcon className={quotesStyles.quoteRight} />
        </Fragment>
    );

    const footer = (
        <Fragment>
            <CollectionIcon /> {collectionTitle}
        </Fragment>
    );

    return (
        <Card
            body={body}
            footer={footer}
        />
    );
};

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
        const body = (
            <Fragment>
                {this.state.quotes.map(quote => (
                    <Quote key={quote.id} {...quote} />
                ))}
            </Fragment>
        );

        return (
            <View body={body} />
        );
    };
};

export default Quotes;