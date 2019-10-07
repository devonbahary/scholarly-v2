import React, { Fragment } from "react";
import { getCollection } from "../../api/collections";

import CollectionIcon from "../icons/CollectionIcon";
import { LoadingComponent } from "../common/LoadingComponent";
import { Quote } from "../quotes/Quotes";
import PlusIcon from "../icons/PlusIcon";
import View from "../common/View";

class Collection extends LoadingComponent {
    state = {
        collection: null,
        quotes: [],
    };

    loadApiCall = () => {
        const collectionId = this.props.match.params.id;
        return getCollection(collectionId);
    };
    onLoadSuccess = data => {
        const { collection, quotes } = data;
        this.setState({
            collection,
            quotes,
        });
    };

    render() {
        const { collection, quotes, isLoading, isLoadingError } = this.state;
        const body = (
            <Fragment>
                {quotes.map(quote => (
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
                onLoadRetry={this.loadState}
            />
        );
    };
}

export default Collection;