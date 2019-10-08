import { useState } from "react";

export default (saveResource, setResources) => {
    const [ text, setText ] = useState('');

    const [ isAddingResource, setIsAddingResource ] = useState(false);
    const [ isSavingResource, setIsSavingResource ] = useState(false);
    const [ isErrorSavingResource, setIsErrorSavingResource ] = useState(false);

    const saveData = async (resource, resources) => {
        if (!isAddingResource) return;
        if (!text) return toggleIsAddingResource();

        setIsSavingResource(true);
        setIsErrorSavingResource(false);

        const data = await saveResource(resource);

        if (data) {
            setIsSavingResource(false);
            setIsErrorSavingResource(false);
            toggleIsAddingResource();

            const { insertId: id } = data;

            const newResource = {
                id,
                isNew: true, // to flag css
                ...resource,
            };

            setResources([ newResource, ...resources ]);
        } else {
            setIsSavingResource(false);
            setIsErrorSavingResource(true);
        }
    };

    const handleTextChange = e => {
        setText(e.target.value);
        setIsErrorSavingResource(false);
    };

    const toggleIsAddingResource = () => {
        setIsAddingResource(!isAddingResource   );
        setIsSavingResource(false);
        setIsErrorSavingResource(false);
        setText('');
    };

    return {
        handleTextChange,
        isAddingResource,
        isSavingResource,
        isErrorSavingResource,
        saveData,
        setIsAddingResource,
        setIsSavingResource,
        setIsErrorSavingResource,
        text,
        toggleIsAddingResource,
    };
};