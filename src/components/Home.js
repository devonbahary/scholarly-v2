import React, { Component } from "react";
import axios from "axios";
import { Quote } from "./quotes/Quotes";

import styles from "../styles/Home.scss";

class Home extends Component {
    state = {
        quote: null,
    };

    async componentDidMount() {
        const { data } = await axios.get('/api/quotes/random');
        this.setState(({
            quote: data.length ? data[0]: null,
        }));
    };

    render() {
        const { quote } = this.state;
        if (!quote) return null;

        return (
            <div className={styles.home}>
                <Quote {...quote} />
            </div>
        );
    };
};

export default Home;