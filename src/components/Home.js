import React, { useState } from "react";
import useLoadingState from "./hooks/useLoadingState";
import { getRandomUserQuote } from "../api/quotes";

import { Quote } from "./quotes/Quotes";
import View from "./common/View";

import styles from "../styles/Home.scss";


const Home = ({ history }) => {
    const [ quote, setQuote ] = useState(null);

    const {
        isLoading,
        isLoadingError,
        loadData,
    } = useLoadingState(setQuote, getRandomUserQuote);

    const body = (
        <div className={styles.home}>
            {quote && <Quote {...quote} history={history} />}
        </div>
    );

    return (
        <View
            body={body}
            isLoading={isLoading}
            isLoadingError={isLoadingError}
            onLoadRetry={loadData}
        />
    );
};

export default Home;