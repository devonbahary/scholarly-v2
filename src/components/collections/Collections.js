import React, {Fragment, useEffect} from "react";
import { observer, inject } from "mobx-react";

import BookIcon from "../common/icons/BookIcon";
import CollectionCard from "./CollectionCard";
import PlusIcon from "../common/icons/PlusIcon";
import View from "../common/View";

const Collections = inject('collectionsStore')(observer(({ collectionsStore }) => {
    const { resources: collections } = collectionsStore;

    useEffect(() => {
        collectionsStore.load();
    }, []);

    const handleAddCollection = () => {
        if (!collectionsStore.isAdding) collectionsStore.add();
    };

    const body = collections && (
        <Fragment>
            {collections.map(collection => (
                <CollectionCard
                    key={collection.uiKey}
                    collection={collection}
                    showOptions
                />
            ))}
        </Fragment>
    );

    const headerButton = <PlusIcon onClick={handleAddCollection} shouldRotate={collectionsStore.isAdding} />;

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