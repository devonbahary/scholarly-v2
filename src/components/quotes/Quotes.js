import React, { Component } from "react";
import axios from "axios";

import styles from "../../styles/cards.scss";
import CollectionIcon from "../icons/CollectionIcon";

const Quote = ({ text, collectionTitle }) => (
    <div className={styles.card}>
        <div className={styles.cardBody}>
            {text}
        </div>
        <div className={styles.cardFooter}>
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