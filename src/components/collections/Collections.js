import React, { useState, Fragment } from "react";
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

const Collections = ({ history }) => {
    const [ collections, setCollections ] = useState([]);
    const [ isAddingCollection, setIsAddingCollection ] = useState(false);
    const [ isSavingCollection, setIsSavingCollection ] = useState(false);
    const [ isErrorSavingCollection, setIsErrorSavingCollection ] = useState(false);
    const [ newTitle, setNewTitle ] = useState('');

    const {
        isLoading,
        isLoadingError,
        loadData,
    } = useLoadingState(setCollections, getUserCollections);

    const toggleIsAddingCollection = () => {
        setIsAddingCollection(!isAddingCollection);
        setIsSavingCollection(false);
        setIsErrorSavingCollection(false);
        setNewTitle('');
    };

    const handleTitleChange = e => {
        setNewTitle(e.target.value);
        setIsErrorSavingCollection(false);
    };

    const handleSubmit = async () => {
        if (!isAddingCollection) return;
        if (!newTitle) return toggleIsAddingCollection();

        setIsSavingCollection(true);
        setIsErrorSavingCollection(false);

        const collection = { title: newTitle };
        const data = await saveCollection(collection);

        if (data) {
            const { insertId: id } = data;
            const newCollection = {
                id,
                isNew: true, // to flag css
                ...collection,
            };

            setCollections([ newCollection, ...collections ]);
            setIsSavingCollection(false);
            setIsErrorSavingCollection(false);
            toggleIsAddingCollection();
        } else {
            setIsSavingCollection(false);
            setIsErrorSavingCollection(true);
        }
    };

    const linkTo = collectionId => history.push(`/collections/${collectionId}`);

    let classNameCard;
    if (!isAddingCollection) {
        classNameCard = cardStyles.hidden;
    } else if (isErrorSavingCollection) {
        classNameCard = cardStyles.error;
    }
    const cardBody = isAddingCollection && (
        <InputTitle
            value={newTitle}
            onChange={handleTitleChange}
            onSubmit={handleSubmit}
            isSaving={isSavingCollection}
        />
    );

    let cardFooter;
    if (isErrorSavingCollection) {
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
            headerButton={<PlusIcon rotate={isAddingCollection} />}
            headerButtonOnClick={toggleIsAddingCollection}
            isLoading={isLoading}
            isLoadingError={isLoadingError}
            onLoadRetry={loadData}
        />
    );
};

export default Collections;