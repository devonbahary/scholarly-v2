import React, { Component, Fragment } from "react";
import ApiService from "../../ApiService";

import Card from "../common/Card";
import InputTitle from "./InputTitle";
import PlusIcon from "../icons/PlusIcon";
import QuoteRightIcon from "../icons/QuoteRightIcon";
import View from "../common/View";

import cardStyles from "../../styles/Card.scss";
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

const Collection = ({ title, quoteCount }) => {
    const footer = <QuoteCount count={quoteCount} />;
    return (
        <Card
            body={title}
            bodyClassName={collectionStyles.cardBody}
            footer={footer}
        />
    );
};

class Collections extends Component {
    state = {
        collections: [],
        isAddingCollection: false,
    };

    async componentDidMount() {
        const data = await ApiService.getRequest('/api/collections');
        if (!data) return;

        this.setState({
            collections: data,
        });
    };

    // we implement open- and close- functions instead of just a toggle so that the onBlur event does not trigger the
    // toggle twice when manually closing with the close button
    openIsAddingCollection = () => {
        this.setState({ isAddingCollection: true });
    };

    // setTimeout because clicking the close button would trigger the onBlur 'isAddingCollection: false' event,
    // causing the close button to trigger an 'isAddingCollection: true' event
    closeIsAddingCollection = () => {
        setTimeout(() => this.setState({ isAddingCollection: false }), 0);
    };

    handleExit = e => {
        if (!e.target.value) this.closeIsAddingCollection();
    };

    render() {
        const { isAddingCollection } = this.state;

        const toggleAddCollection = isAddingCollection ? this.closeIsAddingCollection : this.openIsAddingCollection;
        const header = (
            <div className={viewStyles.rightAlign} onClick={toggleAddCollection}>
                <PlusIcon rotate={isAddingCollection} />
            </div>
        );

        const classNameCard = `${cardStyles.card} ${!isAddingCollection ? cardStyles.hidden: ''}`;
        const body = (
            <Fragment>
                <div className={classNameCard}>
                    {isAddingCollection && (
                        <InputTitle onExit={this.handleExit} />
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