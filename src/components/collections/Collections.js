import React, {Fragment, useEffect} from "react";
import { observer, inject } from "mobx-react";

import Collection from "./Collection";
import View from "../common/View";
import PlusIcon from "../common/icons/PlusIcon";
import Icon from "../common/icons/Icon";
import BookIcon from "../common/icons/BookIcon";

const Collections = inject('collectionsStore')(observer(({ collectionsStore }) => {
    const { collections } = collectionsStore;

    useEffect(() => {
        collectionsStore.loadCollections();
    }, []);

    const handleAddCollection = () => {
        if (!collectionsStore.isAddingCollection) collectionsStore.addCollection();
    };

    const body = collections && (
        <Fragment>
            {collections.map(collection => (
                <Collection
                    key={collection.uiKey}
                    collection={collection}
                />
            ))}
        </Fragment>
    );

    const headerButton = <PlusIcon onClick={handleAddCollection} shouldRotate={collectionsStore.isAddingCollection} />;

    return (
        <View
            body={body}
            headerButton={headerButton}
            headerIcon={<BookIcon />}
            headerTitle="Collections"
        />
    );
}));

export default Collections;