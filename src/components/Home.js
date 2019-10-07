import React, { Component } from "react";
import { getRandomUserQuote } from "../api/quotes";

import { Quote } from "./quotes/Quotes";
import View from "./common/View";

import styles from "../styles/Home.scss";


class Home extends Component {
    state = {
        quote: null,
        isLoading: true,
        isLoadingError: false,
    };

    async componentDidMount() {
        this.getRandomUserQuote();
    };

    getRandomUserQuote = async () => {
        this.setState({ isLoading: true, isLoadingError: false });
        const data = await getRandomUserQuote();

        if (data) {
            this.setState({
                quote: data.length ? data[0]: null,
                isLoading: false,
                isLoadingError: false,
            });
        } else {
            this.setState({
                isLoading: false,
                isLoadingError: true,
            });
        }
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
                onLoadRetry={this.getRandomUserQuote}
            />
        );
    };
};

export default Home;