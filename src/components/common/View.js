import React from "react";

import styles from "./View.scss";

const View = ({ body, headerIcon, headerTitle }) => (
    <section className={styles.view}>
        <header className={styles.header}>
            {headerIcon}
            <div className={styles.headerTitle}>
                {headerTitle}
            </div>
        </header>
        <div className={styles.body}>
            {body}
        </div>
    </section>
);

export default View;