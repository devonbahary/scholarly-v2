import uuid from "uuid";
import React, { useState } from "react";
import useLoadingState from "../hooks/useLoadingState";
import { getCollection } from "../../api/collections";

import CollectionIcon from "../icons/CollectionIcon";
import { QuoteList } from "../quotes/Quotes";
import PlusIcon from "../icons/PlusIcon";
import View from "../common/View";


const Collection = ({ match }) => {
    const collectionId = match.params.id;

    const [ collection, setCollection ] = useState(null);
    const [ quotes, setQuotes ] = useState([]);
    const [ isAddingQuote, setIsAddingQuote ] = useState(false);

    const loadFunction = () => getCollection(collectionId);

    const setCollectionAndQuotes = data => {
        if (!data) return;
        const { collection, quotes } = data;
        setCollection(collection);
        setQuotes(quotes);
    };

    const {
        isLoading,
        isLoadingError,
        loadData,
    } = useLoadingState(setCollectionAndQuotes, loadFunction);


    const toggleIsAddingQuote = () => {
        if (isAddingQuote) {
            quotes.forEach(quote => {
                if (quote.isNew) quote.shouldNotRender = true;
            });
        } else {
            setQuotes([
                {
                    id: uuid(),
                    collectionId,
                    text: '',
                    isNew: true,
                },
                ...quotes,
            ]);
        }
        setIsAddingQuote(!isAddingQuote);
    };

    return (
        <View
            body={<QuoteList quotes={quotes} />}
            headerNavIcon={<CollectionIcon />}
            headerNavText={collection ? collection.title : ''}
            headerButton={<PlusIcon rotate={isAddingQuote} />}
            headerButtonOnClick={toggleIsAddingQuote}
            isLoading={isLoading}
            isLoadingError={isLoadingError}
            onLoadRetry={loadData}
        />
    );
};

export default Collection;