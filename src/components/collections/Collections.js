import React, { useState, Fragment } from "react";
import useAddResourceState from "../hooks/useAddResourceState";
import useLoadingState from "../hooks/useLoadingState";
import { getUserCollections, saveCollection } from "../../api/collections";

import Card from "../common/Card";
import CollectionIcon from "../icons/CollectionIcon";
import ExclamationIcon from "../icons/ExclamationIcon";
import InputTitle from "./InputTitle";
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

const AddCollection = ({
    handleTextChange,
    handleSubmit,
    isSavingResource,
    isAddingResource,
    isErrorSavingResource,
    text,
}) => {
    let classNameCard;
    if (!isAddingResource) {
        classNameCard = cardStyles.hidden;
    }
    if (isErrorSavingResource) {
        classNameCard += ` ${cardStyles.error}`;
    }

    const cardBody = isAddingResource && (
        <InputTitle
            value={text}
            onChange={handleTextChange}
            onSubmit={handleSubmit}
            isSaving={isSavingResource}
        />
    );

    let cardFooter;
    if (isErrorSavingResource) {
        cardFooter = (
            <Fragment>
                <ExclamationIcon /> Error
            </Fragment>
        );
    } else if (isAddingResource) {
        cardFooter = (
            <Fragment>
                {text.length} / 255
            </Fragment>
        );
    }

    return (
        <Card
            classNameCard={classNameCard}
            body={cardBody}
            footer={cardFooter}
        />
    );
};

const Collections = ({ history }) => {
    const [ collections, setCollections ] = useState([]);

    const {
        isLoading,
        isLoadingError,
        loadData,
    } = useLoadingState(setCollections, getUserCollections);

    const {
        handleTextChange,
        isAddingResource,
        isSavingResource,
        isErrorSavingResource,
        saveData,
        text,
        toggleIsAddingResource,
    } = useAddResourceState(saveCollection, setCollections);

    const handleSubmit = async () => {
        const collection = { title: text };
        await saveData(collection , collections)
    };

    const linkTo = collectionId => history.push(`/collections/${collectionId}`);

    const body = (
        <Fragment>
            <AddCollection
                isAddingResource={isAddingResource}
                isErrorSavingResource={isErrorSavingResource}
                isSavingResource={isSavingResource}
                handleSubmit={handleSubmit}
                handleTextChange={handleTextChange}
                text={text}
            />
            {collections && collections.map(collection => (
                <Collection
                    key={collection.id}
                    onClick={() => linkTo(collection.id)}
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
            headerButton={<PlusIcon rotate={isAddingResource} />}
            headerButtonOnClick={toggleIsAddingResource}
            isLoading={isLoading}
            isLoadingError={isLoadingError}
            onLoadRetry={loadData}
        />
    );
};

export default Collections;