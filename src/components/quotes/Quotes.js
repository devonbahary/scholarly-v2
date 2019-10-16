import { inject, observer } from "mobx-react";
import React, { useEffect, Fragment } from "react";

import Icon from "../common/icons/Icon";
import Quote from "../common/Quote";
import View from "../common/View";
import PlusIcon from "../common/icons/PlusIcon";


const Quotes = inject('store')(observer(({ store }) => {
    const { quotes } = store;

    useEffect(() => {
        store.loadQuotes();
    }, []);

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

    const headerButton = <PlusIcon />;

    const headerIcon = (
        <Icon>
            <i className="fas fa-quote-left"></i>
        </Icon>
    );

    return (
        <View
            body={body}
            headerIcon={headerIcon}
            headerButton={headerButton}
            headerTitle="Quotes"
        />
    );
}));

export default Quotes;