import { inject, observer } from "mobx-react";
import React, { Fragment, useEffect } from "react";

import Icon from "./common/icons/Icon";
import PlusIcon from "./common/icons/PlusIcon";
import Quote from "./common/Quote";
import View from "./common/View";


const Quotes = inject('quotesStore')(observer(({ quotesStore }) => {
    const { resources } = quotesStore;

    useEffect(() => {
        quotesStore.load();
    }, []);

    const handleAddQuote = () => {
        if (!quotesStore.isAdding) quotesStore.add();
    };

    const body = resources && (
        <Fragment>
            {resources.map(quote => (
                <Quote
                    key={quote.uiKey}
                    showOptions
                    quote={quote}
                />
            ))}
        </Fragment>
    );

    const headerButton = <PlusIcon onClick={handleAddQuote} shouldRotate={quotesStore.isAdding} />;

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