import uuid from "uuid";
import React, { useState } from "react";
import useLoadingState from "../hooks/useLoadingState";
import { getCollection } from "../../api/collections";
import { saveQuote } from "../../api/quotes";

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

    const handleLoad = data => {
        if (!data) return;
        const { collection, quotes } = data;
        setCollection(collection);
        setQuotes(quotes.map(quote => ({
            keyId: uuid(), // we can't use id as React keys here, because overwriting id after quote save will corrupt keys
            ...quote,
        })));
    };

    const {
        isLoading,
        isLoadingError,
        loadData,
    } = useLoadingState(handleLoad, loadFunction);

    const handleSave = async savingQuote => {
        if (!savingQuote.text) return;
        const data = await saveQuote(savingQuote);
        if (data && !savingQuote.id) {
            const savedQuote = quotes.find(quote => quote.keyId === savingQuote.keyId);
            savedQuote.id = data.insertId;
            toggleIsAddingQuote();
        }
    };

    const toggleIsAddingQuote = () => {
        if (isAddingQuote) {
            quotes.forEach(quote => {
                if (!quote.id) quote.shouldNotRender = true;
            });
        } else {
            const newQuote = {
                keyId: uuid(),
                collectionId,
                text: '',
            };
            setQuotes([
                newQuote,
                ...quotes,
            ]);
        }
        setIsAddingQuote(!isAddingQuote);
    };

    return (
        <View
            body={<QuoteList quotes={quotes} onSave={handleSave} />}
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