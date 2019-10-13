import axios from "axios";
import React, {useState, useEffect, Fragment} from "react";
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
    return (
        <View body={body} />
    );
};

export default Quotes;