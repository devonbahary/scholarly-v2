import { inject, observer } from "mobx-react";
import React, { Fragment, useEffect } from "react";

import Icon from "./common/icons/Icon";
import PlusIcon from "./common/icons/PlusIcon";
import Quote from "./common/Quote";
import View from "./common/View";


const Quotes = inject('store')(observer(({ store }) => {
    const { quotes } = store;

    useEffect(() => {
        store.loadQuotes();
    }, []);

    const handleAddQuote = () => {
        if (!store.isAddingQuote) store.addQuote();
    };

    const body = quotes && (
        <Fragment>
            {quotes.map(quote => (
                <Quote
                    key={quote.uiKey}
                    displayOption
                    quote={quote}
                />
            ))}
        </Fragment>
    );

    const headerButton = <PlusIcon onClick={handleAddQuote} shouldRotate={store.isAddingQuote} />;

    const headerIcon = (
        <Icon>
            <i className="fas fa-quote-left"></i>
        </Icon>
    );

    return (
        <View
            body={body}
            headerButton={headerButton}
            headerIcon={headerIcon}
            headerTitle="Quotes"
        />
    );
}));

export default Quotes;