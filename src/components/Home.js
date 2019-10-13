import axios from "axios";
import React, { useEffect, useState } from "react";
import Quote from "./common/Quote";
import View from "./common/View";

import styles from "./Home.scss";

const Home = () => {
    const [ quote, setQuote ] = useState(null);

    useEffect(() => {
        const loadRandomQuote = async () => {
            const { data } = await axios.get('/api/quotes/random');
            if (data) setQuote(data);
        };

        loadRandomQuote();
    }, []);

    const body = quote && (
        <div className={styles.home}>
            <Quote quote={quote} />
        </div>
    );

    return (
        <View body={body} />
    );
};

export default Home;