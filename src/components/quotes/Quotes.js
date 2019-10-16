import axios from "axios";
import React, {useState, useEffect, Fragment} from "react";

import Icon from "../common/icons/Icon";
import Quote from "../common/Quote";
import View from "../common/View";


const Quotes = () => {
    const [ quotes, setQuotes ] = useState([]);
    const [ activeQuoteId, setActiveQuoteId ] = useState(null);

    useEffect(() => {
        const loadQuotes = async () => {
            const { data } = await axios.get('/api/quotes');
            if (data) setQuotes(data);
        };

        loadQuotes();
    }, []);

    const handleSetActiveQuote = id => {
        if (id === activeQuoteId) return setActiveQuoteId(null); // toggle
        setActiveQuoteId(id);
    };

    const body = quotes && (
        <Fragment>
            {quotes.map(quote => (
                <Quote
                    key={quote.id}
                    activeQuoteId={activeQuoteId}
                    displayOption
                    handleSetActiveQuote={handleSetActiveQuote}
                    quote={quote}
                />
            ))}
        </Fragment>
    );

    const headerIcon = (
        <Icon>
            <i className="fas fa-quote-left"></i>
        </Icon>
    );

    return (
        <View body={body} headerIcon={headerIcon} headerTitle="Quotes" />
    );
};

export default Quotes;