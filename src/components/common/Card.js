import React from "react";
import styles from "../../styles/Card.scss";

const Card = ({ body, classNameBody, classNameCard, footer }) => (
    <div className={`${styles.card} ${classNameCard}`}>
        <div className={`${styles.body} ${classNameBody}`}>
            {body}
        </div>
        <div className={styles.footer}>
            {footer}
        </div>
    </div>
);

export default Card;