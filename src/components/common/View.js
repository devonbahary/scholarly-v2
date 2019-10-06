import React from "react";

import styles from "../../styles/views.scss";

const View = ({ body, header }) => (
    <div className={styles.view}>
        <div className={styles.header}>
            {header}
        </div>
        <div className={styles.body}>
            {body}
        </div>
    </div>
);

export default View;