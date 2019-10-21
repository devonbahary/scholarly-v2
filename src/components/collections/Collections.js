import React, {Fragment, useEffect} from "react";
import { observer, inject } from "mobx-react";

import BookIcon from "../common/icons/BookIcon";
import Collection from "./Collection";
import PlusIcon from "../common/icons/PlusIcon";
import View from "../common/View";

const Collections = inject('collectionsStore')(observer(({ collectionsStore }) => {
    const { resources } = collectionsStore;

    useEffect(() => {
        collectionsStore.load();
    }, []);

    const handleAddCollection = () => {
        if (!collectionsStore.isAdding) collectionsStore.add();
    };

    const body = resources && (
        <Fragment>
            {resources.map(collection => (
                <Collection
                    key={collection.uiKey}
                    collection={collection}
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