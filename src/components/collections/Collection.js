import React, {Fragment, useState} from "react";
import useLoadingState from "../hooks/useLoadingState";
import { getCollection } from "../../api/collections";

import CollectionIcon from "../icons/CollectionIcon";
import { Quote, QuoteList } from "../quotes/Quotes";
import PlusIcon from "../icons/PlusIcon";
import View from "../common/View";

import cardStyles from "../../styles/Card.scss";

const AddQuote = ({ isAddingQuote }) => {
    const classNameCard = !isAddingQuote ? cardStyles.hidden : '';

    return (
        <Quote classNameCard={classNameCard} isAddingQuote={isAddingQuote} />
    );
};

const Collection = ({ match }) => {
    const collectionId = match.params.id;

    const [ collection, setCollection ] = useState(null);
    const [ quotes, setQuotes ] = useState([]);

    const loadFunction = () => getCollection(collectionId);

    const setCollectionAndQuotes = data => {
        if (data) {
            const { collection, quotes } = data;
            setCollection(collection);
            setQuotes(quotes);
        } else {
            setCollection(null);
            setQuotes([]);
        }
    };

    const {
        isLoading,
        isLoadingError,
        loadData,
    } = useLoadingState(setCollectionAndQuotes, loadFunction);

    const [ isAddingQuote, setIsAddingQuote ] = useState(false);

    const toggleIsAddingResource = () => setIsAddingQuote(!isAddingQuote);

    const body = (
        <Fragment>
            <AddQuote isAddingQuote={isAddingQuote} />
            <QuoteList quotes={quotes} />
        </Fragment>
    );

    return (
        <View
            body={body}
            headerNavIcon={<CollectionIcon />}
            headerNavText={collection ? collection.title : ''}
            headerButton={<PlusIcon rotate={isAddingQuote} />}
            headerButtonOnClick={toggleIsAddingResource}
            isLoading={isLoading}
            isLoadingError={isLoadingError}
            onLoadRetry={loadData}
        />
    );
};

export default Collection;