import React from "react";
import styles from "../../styles/Card.scss";

const Card = ({ body, classNameBody, classNameCard, footer, onCardClick, onFooterClick }) => (
    <div className={`${styles.card} ${classNameCard}`} onClick={onCardClick}>
        <div className={`${styles.body} ${classNameBody}`}>
            {body}
        </div>
        <div className={styles.footer} onClick={onFooterClick}>
            {footer}
        </div>
    </div>
);

export default Card;