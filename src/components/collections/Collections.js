import React, { Component, Fragment } from "react";
import ApiService from "../../ApiService";

import Card from "../common/Card";
import ExclamationIcon from "../icons/ExclamationIcon";
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

const Collection = ({ title, quoteCount, isNew }) => {
    const footer = <QuoteCount count={quoteCount} />;
    return (
        <Card
            body={title}
            classNameBody={collectionStyles.cardBody}
            classNameCard={isNew ? cardStyles.success : ''}
            footer={footer}
        />
    );
};

class Collections extends Component {
    state = {
        collections: [],
        isAddingCollection: false,
        isErrorSaving: false,
        isSavingCollection: false,
        newTitle: '',
    };

    async componentDidMount() {
        const data = await ApiService.getRequest('/api/collections');
        if (!data) return;

        this.setState({ collections: data });
    };

    // we implement open- and close- functions instead of just a toggle so that the onBlur event does not trigger the
    // toggle twice when manually closing with the close button
    openIsAddingCollection = () => {
        this.setState({ isAddingCollection: true });
    };

    // setTimeout because clicking the close button would trigger the onBlur 'isAddingCollection: false' event,
    // causing the close button to trigger an 'isAddingCollection: true' event
    closeIsAddingCollection = () => {
        setTimeout(() => this.setState({
            isAddingCollection: false,
            isErrorSaving: false,
            isSavingCollection: false,
        }), 0);
    };

    handleTitleChange = e => {
        this.setState({
            newTitle: e.target.value,
            isErrorSaving: false,
        });
    };

    handleExit = async () => {
        const { newTitle: title } = this.state;
        if (!title) return this.closeIsAddingCollection();

        this.setState({
            isSavingCollection: true,
            isErrorSaving: false,
        });

        const collection = { title };
        const data = await ApiService.postRequest('/api/collections', collection);

        if (data) {
            const { insertId: id } = data;
            const newCollection = {
                id,
                isNew: true, // to flag css
                ...collection,
            };

            this.setState(prevState => ({
                collections: [
                    newCollection,
                    ...prevState.collections,
                ],
            }));

            this.setState({
                isSavingCollection: false,
                isErrorSaving: false,
            });
            this.closeIsAddingCollection();
        } else {
            this.setState({
                isSavingCollection: false,
                isErrorSaving: true,
            });
        }
    };

    render() {
        const {
            isAddingCollection,
            isErrorSaving,
            isSavingCollection,
            newTitle,
        } = this.state;

        const toggleAddCollection = isAddingCollection ? this.closeIsAddingCollection : this.openIsAddingCollection;
        const header = (
            <div className={viewStyles.rightAlign} onClick={toggleAddCollection}>
                <PlusIcon rotate={isAddingCollection} />
            </div>
        );

        let classNameCard;
        if (!isAddingCollection) {
            classNameCard = cardStyles.hidden;
        } else if (isErrorSaving) {
            classNameCard = cardStyles.error;
        }
        const cardBody = isAddingCollection && (
            <InputTitle
                value={newTitle}
                onChange={this.handleTitleChange}
                onExit={this.handleExit}
                isSaving={isSavingCollection}
            />
        );

        let cardFooter;
        if (isErrorSaving) {
            cardFooter = (
                <Fragment>
                    <ExclamationIcon /> Error
                </Fragment>
            );
        } else if (isAddingCollection) {
            cardFooter = (
                <Fragment>
                    {newTitle.length} / 255
                </Fragment>
            );
        }

        const body = (
            <Fragment>
                <Card
                    classNameCard={classNameCard}
                    body={cardBody}
                    footer={cardFooter}
                />
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