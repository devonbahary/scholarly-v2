import React, { Fragment } from "react";
import { getUserCollections, saveCollection } from "../../api/collections";

import Card from "../common/Card";
import CollectionIcon from "../icons/CollectionIcon";
import ExclamationIcon from "../icons/ExclamationIcon";
import InputTitle from "./InputTitle";
import { LoadingComponent } from "../common/LoadingComponent";
import PlusIcon from "../icons/PlusIcon";
import QuoteRightIcon from "../icons/QuoteRightIcon";
import View from "../common/View";

import cardStyles from "../../styles/Card.scss";
import collectionStyles from "../../styles/Collections.scss";


const QuoteCount = ({ count }) => {
    if (!count) return null;
    return (
        <Fragment>
            <QuoteRightIcon /> {count}
        </Fragment>
    );
};

const Collection = ({ id, isNew, onClick, title, quoteCount }) => {
    const footer = <QuoteCount count={quoteCount} />;
    return (
        <Card
            body={title}
            classNameBody={collectionStyles.cardBody}
            classNameCard={isNew ? cardStyles.success : ''}
            footer={footer}
            onCardClick={onClick}
        />
    );
};

class Collections extends LoadingComponent {
    state = {
        collections: [],
        isAddingCollection: false,
        isErrorSaving: false,
        isSavingCollection: false,
        newTitle: '',
    };

    loadApiCall = getUserCollections;
    onLoadSuccess = data => {
        this.setState({
            collections: data,
        });
    };

    toggleIsAddingCollection = () => {
        this.setState(prevState => ({
            isAddingCollection: !prevState.isAddingCollection,
            isErrorSaving: false,
            isSavingCollection: false,
            newTitle: '',
        }));
    };

    handleTitleChange = e => {
        this.setState({
            newTitle: e.target.value,
            isErrorSaving: false,
        });
    };

    handleExit = () => {
        // setTimeout to allow time for isAddingCollection to read false if the user clicks close
        setTimeout(async () => {
            const { isAddingCollection, newTitle: title } = this.state;
            if (!isAddingCollection) return;
            if (!title) return this.toggleIsAddingCollection();

            this.setState({
                isSavingCollection: true,
                isErrorSaving: false,
            });

            const collection = { title };
            const data = await saveCollection(collection);

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
                this.toggleIsAddingCollection();
            } else {
                this.setState({
                    isSavingCollection: false,
                    isErrorSaving: true,
                });
            }
        }, 0);
    };

    linkTo = collectionId => this.props.history.push(`/collections/${collectionId}`);

    render() {
        const {
            isAddingCollection,
            isErrorSaving,
            isLoading,
            isLoadingError,
            isSavingCollection,
            newTitle,
        } = this.state;

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
                    <Collection
                        key={collection.id}
                        onClick={() => this.linkTo(collection.id)}
                        {...collection}
                    />
                ))}
            </Fragment>
        );

        return (
            <View
                body={body}
                headerNavIcon={<CollectionIcon />}
                headerNavText="Collections"
                headerButton={<PlusIcon rotate={isAddingCollection} />}
                headerButtonOnClick={this.toggleIsAddingCollection}
                isLoading={isLoading}
                isLoadingError={isLoadingError}
                onLoadRetry={this.loadState}
            />
        );
    };
}

export default Collections;