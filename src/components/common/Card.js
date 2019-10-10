import React, { useEffect, useState} from "react";
import styles from "../../styles/Card.scss";

const DISMOUNT_DELAY = 1000;

const Card = ({
    body,
    classNameBody,
    classNameCard,
    footer,
    onCardClick,
    onFooterClick,
    shouldNotRender,
}) => {
    const [ isMounted, setIsMounted ] = useState(!shouldNotRender);

    useEffect(() => {
        if (!shouldNotRender) return;
        setTimeout(() => setIsMounted(false), DISMOUNT_DELAY);
    }, [ shouldNotRender ]);

    let className = styles.card;
    if (classNameCard) className += ` ${classNameCard}`;
    if (shouldNotRender) className += ` ${styles.hide}`;

    return isMounted && (
        <div className={className} onClick={onCardClick}>
            <div className={`${styles.body} ${classNameBody ? classNameBody : ''}`}>
                {body}
            </div>
            <div className={styles.footer} onClick={onFooterClick}>
                {footer}
            </div>
        </div>
    );
};

export default Card;