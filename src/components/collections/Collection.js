import React, { Component, Fragment } from "react";
import ApiService from "../../ApiService";

import CollectionIcon from "../icons/CollectionIcon";
import { Quote } from "../quotes/Quotes";
import PlusIcon from "../icons/PlusIcon";
import View from "../common/View";

class Collection extends Component {
    state = {
        collection: null,
        quotes: [],
    };

    async componentDidMount() {
        const collectionId = this.props.match.params.id;
        const data = await ApiService.getRequest(`/api/collections/${collectionId}`);
        if (data) {
            const { collection, quotes } = data;
            this.setState({
                collection,
                quotes,
            });
        }
    };

    render() {
        const { collection, quotes } = this.state;
        const body = (
            <Fragment>
                {quotes.map(quote => (
                    <Quote key={quote.id} {...quote} displayCollectionTitle={false} />
                ))}
            </Fragment>
        );
        return (
            <View
                body={body}
                headerNavIcon={<CollectionIcon />}
                headerNavText={collection ? collection.title : ''}
                headerButton={<PlusIcon />}
            />
        );
    };
}

export default Collection;