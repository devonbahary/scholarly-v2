import React, { useRef, useState } from "react";

import styles from "./Card.scss";


const Card = ({
    body,
    footer,
    isDeleted,
    isError
}) => {
    const [ isCardDeleted, setIsCardDeleted ] = useState(false);
    const cardRef = useRef(null);

    const handleDelete = () => {
        // to smoothly collapse auto-height parent div, we must first assign an explicit height on deletion and then
        // trigger the CSS to collapse and transition the height to 0
        const offsetHeight = cardRef.current.offsetHeight;
        cardRef.current.style.height = `${offsetHeight}px`;
        setTimeout(() => {
            cardRef.current.style.height = '';
            setIsCardDeleted(true);
        }, 25);
    };

    if (isDeleted) handleDelete();

    let className = styles.card;
    if (isError) className += ` ${styles.isError}`;
    if (isCardDeleted) className += ` ${styles.isDeleted}`;

    return (
        <div className={className} ref={cardRef}>
            <div className={styles.body}>
                {body}
            </div>
            <div className={styles.footer}>
                {footer}
            </div>
        </div>
    );
};

export default Card;