import React from "react";

import RedoIcon from "../icons/RedoIcon";
import SpinnerIcon from "../icons/Spinner";

import styles from "../../styles/Loading.scss";

const Loading = ({ isLoading, isLoadingError, onRetry }) => {
    let loadingIcon;
    if (isLoading) {
        loadingIcon = <SpinnerIcon />;
    } else if (isLoadingError) {
        loadingIcon = <RedoIcon />;
    }

    return (
        <div className={styles.loading} onClick={onRetry}>
            {loadingIcon}
        </div>
    );
};

export default Loading;