import React from "react";
import { getRandomUserQuote } from "../api/quotes";

import { LoadingComponent } from "./common/LoadingComponent";
import { Quote } from "./quotes/Quotes";
import View from "./common/View";

import styles from "../styles/Home.scss";


class Home extends LoadingComponent {
    state = {
        quote: null,
    };

    loadApiCall = getRandomUserQuote;
    onLoadSuccess = data => {
        this.setState({
            quote: data.length ? data[0] : null, // TODO: need to be findOne?
        })
    };

    render() {
        const { quote, isLoading, isLoadingError } = this.state;

        const body = (
            <div className={styles.home}>
                {quote && <Quote {...quote} history={this.props.history} />}
            </div>
        );

        return (
            <View
                body={body}
                isLoading={isLoading}
                isLoadingError={isLoadingError}
                onLoadRetry={this.loadState}
            />
        );
    };
};

export default Home;