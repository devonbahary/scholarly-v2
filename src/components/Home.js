import React, { Component } from "react";
import ApiService from "../api/ApiService";

import { Quote } from "./quotes/Quotes";

import styles from "../styles/Home.scss";


class Home extends Component {
    state = {
        quote: null,
    };

    async componentDidMount() {
        const data = await ApiService.getRequest('/api/quotes/random');
        if (!data) return;

        this.setState({
            quote: data.length ? data[0]: null,
        });
    };

    render() {
        const { quote } = this.state;
        if (!quote) return null;

        return (
            <div className={styles.home}>
                <Quote {...quote} history={this.props.history} />
            </div>
        );
    };
};

export default Home;