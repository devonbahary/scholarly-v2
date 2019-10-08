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

    return (
        <View
            body={<QuoteList quotes={quotes} />}
            headerNavIcon={<CollectionIcon />}
            headerNavText={collection ? collection.title : ''}
            headerButton={<PlusIcon />}
            isLoading={isLoading}
            isLoadingError={isLoadingError}
            onLoadRetry={loadData}
        />
    );
};

export default Collection;