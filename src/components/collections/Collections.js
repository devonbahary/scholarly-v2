import React, { Component, Fragment } from "react";
import axios from "axios";
import QuoteRightIcon from "../icons/QuoteRightIcon";

import cardStyles from "../../styles/cards.scss";
import collectionStyles from "../../styles/Collections.scss";

const QuoteCount = ({ count }) => {
    if (!count) return null;
    return (
        <Fragment>
            <QuoteRightIcon /> {count}
        </Fragment>
    );
};

const Collection = ({ title, quoteCount }) => (
    <div className={cardStyles.card}>
        <div className={`${cardStyles.cardBody} ${collectionStyles.cardTitle}`}>
            {title}
        </div>
        <div className={cardStyles.cardFooter}>
            <QuoteCount count={quoteCount} />
        </div>
    </div>
);

class Collections extends Component {
    state = {
        collections: [],
    };

    async componentDidMount() {
        const { data } = await axios.get('/api/collections');
        this.setState(({
            collections: data,
        }));
    };

    render() {
        return (
            <div>
                {this.state.collections.map(collection => (
                    <Collection key={collection.id} {...collection} />
                ))}
            </div>
        );
    };
}

export default Collections;