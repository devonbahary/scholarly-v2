import React, { Component, Fragment } from "react";
import axios from "axios";
import QuoteRightIcon from "../icons/QuoteRightIcon";
import PlusIcon from "../icons/PlusIcon";
import View from "../View";

import cardStyles from "../../styles/cards.scss";
import collectionStyles from "../../styles/Collections.scss";
import viewStyles from "../../styles/views.scss";


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
        isAddingCollection: false,
    };

    async componentDidMount() {
        const { data } = await axios.get('/api/collections');
        this.setState(({
            collections: data,
        }));
    };

    // we implement open- and close- functions instead of just a toggle so that the onBlur event does not trigger the
    // toggle twice when manually closing with the close button
    openIsAddingCollection = () => {
        this.setState(({ isAddingCollection: true }));
    };

    // setTimeout because clicking the close button would trigger the onBlur 'isAddingCollection: false' event,
    // causing the close button to trigger an 'isAddingCollection: true' event
    closeIsAddingCollection = () => {
        setTimeout(() => this.setState(({ isAddingCollection: false })), 0);
    };

    handleInputBlur = e => {
        if (!e.target.value) this.closeIsAddingCollection();
    };

    render() {
        const { isAddingCollection } = this.state;
        const classNameCard = `${cardStyles.card} ${!isAddingCollection ? cardStyles.hidden: ''}`;

        const header = (
            <div className={viewStyles.rightAlign} onClick={isAddingCollection ? this.closeIsAddingCollection : this.openIsAddingCollection}>
                <PlusIcon rotate={this.state.isAddingCollection} />
            </div>
        );

        const body = (
            <Fragment>
                <div className={classNameCard}>
                    {isAddingCollection && (
                        <input type="text" autoFocus onBlur={this.handleInputBlur} />
                    )}
                </div>
                {this.state.collections.map(collection => (
                    <Collection key={collection.id} {...collection} />
                ))}
            </Fragment>
        );

        return (
            <View header={header} body={body} />
        );
    };
}

export default Collections;