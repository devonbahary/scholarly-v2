import React from "react";
import Loading from "./Loading";

import styles from "../../styles/views.scss";

const View = ({
    body,
    headerNavIcon,
    headerNavText,
    headerButton,
    headerButtonOnClick,
    isLoading,
    isLoadingError,
    onLoadRetry,
}) => {
    if (isLoading || isLoadingError) {
        return (
            <Loading
                isLoading={isLoading}
                isLoadingError={isLoadingError}
                onRetry={onLoadRetry}
            />
        );
    }

    return (
        <div className={styles.view}>
            <div className={styles.header}>
                <div className={styles.navIcon}>
                    {headerNavIcon}
                </div>
                <div className={styles.navText}>
                    {headerNavText}
                </div>
                <div className={styles.button} onClick={headerButtonOnClick}>
                    {headerButton}
                </div>
            </div>
            <div className={styles.body}>
                {body}
            </div>
        </div>
    );
};

export default View;