import React, { Component, Fragment } from "react";
import { getCollection } from "../../api/collections";

import CollectionIcon from "../icons/CollectionIcon";
import { Quote } from "../quotes/Quotes";
import PlusIcon from "../icons/PlusIcon";
import View from "../common/View";

class Collection extends Component {
    state = {
        collection: null,
        quotes: [],
        isLoading: true,
        isLoadingError: false,
    };

    async componentDidMount() {
        this.getCollection();
    };

    getCollection = async () => {
        this.setState({ isLoading: true, isLaodingError: false });

        const collectionId = this.props.match.params.id;
        const data = await getCollection(collectionId);

        if (data) {
            const { collection, quotes } = data;
            this.setState({
                collection,
                quotes,
                isLoading: false,
                isLoadingError: false,
            });
        } else {
            this.setState({
                isLoading: false,
                isLoadingError: true,
            });
        }
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
                onLoadRetry={this.getCollection}
            />
        );
    };
}

export default Collection;