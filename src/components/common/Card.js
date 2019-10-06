import React from "react";
import styles from "../../styles/cards.scss";

const Card = ({ body, bodyClassName, footer }) => (
    <div className={styles.card}>
        <div className={`${styles.body} ${bodyClassName}`}>
            {body}
        </div>
        <div className={styles.footer}>
            {footer}
        </div>
    </div>
);

export default Card;