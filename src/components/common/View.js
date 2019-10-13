import React from "react";

import styles from "./View.scss";

const View = ({ body, header }) => (
    <section className={styles.view}>
        <header className={styles.header}>
            {header}
        </header>
        <div className={styles.body}>
            {body}
        </div>
    </section>
);

export default View;