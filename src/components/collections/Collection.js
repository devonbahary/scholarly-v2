import React, { useState, Fragment } from "react";
import useLoadingState from "../hooks/useLoadingState";
import { getCollection } from "../../api/collections";

import CollectionIcon from "../icons/CollectionIcon";
import { Quote } from "../quotes/Quotes";
import PlusIcon from "../icons/PlusIcon";
import View from "../common/View";

const Collection = ({ match }) => {
    const [ collection, setCollection ] = useState(null);
    const [ quotes, setQuotes ] = useState([]);

    const loadFunction = () => {
        const collectionId = match.params.id;
        return getCollection(collectionId);
    };

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

    const body = (
        <Fragment>
            {quotes && quotes.map(quote => (
                <Quote key={quote.id} {...quote} />
            ))}
        </Fragment>
    );
    return (
        <View
            body={body}
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