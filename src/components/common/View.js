import React from "react";

import styles from "../../styles/views.scss";

const View = ({ body, headerNavIcon, headerNavText, headerButton, headerButtonOnClick }) => (
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

export default View;