import { useState, useEffect } from "react";

export default (handleLoad, loadFn) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isLoadingError, setIsLoadingError ] = useState(false);

    const handleLoading = async loadFn => {
        setIsLoading(true);
        setIsLoadingError(false);

        const data = await loadFn();
        handleLoad(data);

        setIsLoading(false);

        setIsLoadingError(!Boolean(data));
    };

    const loadData = () => handleLoading(loadFn);

    useEffect(() => {
        loadData();
    }, []); // componentDidMount, componentWillUnmount

    return {
        isLoading,
        isLoadingError,
        loadData,
    };
};