import React, { useEffect, useState } from "react";
import { inject } from "mobx-react";

import QuoteCard from "./common/QuoteCard";
import View from "./common/View";

import styles from "./Home.scss";


const Home = inject('quotesStore')(({ quotesStore }) => {
    const [ quote, setQuote ] = useState(null);

    useEffect(() => {
        const loadRandomQuote= async () => {
            await quotesStore.load();

            const { resources: quotes } = quotesStore;
            if (!quotes.length) return;

            const randIndex = Math.floor(Math.random() * quotes.length);
            setQuote(quotes[randIndex]);
        };

        loadRandomQuote();
    }, []);

    const body = quote && (
        <div className={styles.home}>
            <QuoteCard quote={quote} />
        </div>
    );

    return (
        <View body={body} />
    );
});

export default Home;