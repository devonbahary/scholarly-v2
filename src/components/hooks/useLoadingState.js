import { useState, useEffect } from "react";

export default (setData, loadFn) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isLoadingError, setIsLoadingError ] = useState(false);

    const handleLoading = async loadFn => {
        setIsLoading(true);
        setIsLoadingError(false);

        const data = await loadFn();
        setData(data);

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