import React from "react";
import styles from "../../styles/Card.scss";

const Card = ({ body, bodyClassName, cardClassName, footer }) => (
    <div className={`${styles.card} ${cardClassName}`}>
        <div className={`${styles.body} ${bodyClassName}`}>
            {body}
        </div>
        <div className={styles.footer}>
            {footer}
        </div>
    </div>
);

export default Card;