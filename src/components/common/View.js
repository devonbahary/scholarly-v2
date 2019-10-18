import React from "react";

import styles from "./View.scss";

const View = ({ body, headerButton, headerIcon, headerTitle }) => (
    <section className={styles.view}>
        <header className={styles.header}>
            {headerIcon}
            <div className={styles.headerTitle}>
                {headerTitle}
            </div>
            {headerButton}
        </header>
        <div className={styles.body}>
            {body}
        </div>
    </section>
);

export default View;