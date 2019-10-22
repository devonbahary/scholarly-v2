import React, {Fragment} from "react";

import Card from "./Card";
import ErrorIcon from "./icons/ErrorIcon";
import OptionsIcon from "./icons/OptionsIcon";

import cardStyles from "./Card.scss";

const Resource = ({
    activeOptions,
    body,
    isActive,
    isDeleted,
    isError,
    passiveOptions,
    resource,
    showOptions = true,
    showPassiveOptions,
    store,
}) => {
    const handleOpenOptions = () => store.setActive(resource);

    const classNameButtonOpenOptions = `${cardStyles.buttonOpenOptions} ${isActive ? cardStyles.optionsActive : ''}`;
    const classNamePassiveOptions = `${cardStyles.passiveOptions} ${isActive ? cardStyles.optionsActive : ''}`;
    const classNameOptions = `${cardStyles.options} ${isActive ? cardStyles.optionsActive : ''}`;

    const footer = (
        <Fragment>
            {isError && (
                <div className={cardStyles.footerRow}>
                    <div className={cardStyles.errorRow}>
                        <ErrorIcon />
                        <span className={cardStyles.errorMessage}>{store.errorMessage}</span>
                    </div>
                </div>
            )}
            {showOptions && (
                <div className={cardStyles.footerRow}>
                    <OptionsIcon className={classNameButtonOpenOptions} onClick={handleOpenOptions} />
                    {showPassiveOptions && (
                        <div className={classNamePassiveOptions}>
                            {passiveOptions}
                        </div>
                    )}
                    <div className={classNameOptions}>
                        {activeOptions}
                    </div>
                </div>
            )}
        </Fragment>
    );

    return (
        <Card
            body={body}
            footer={footer}
            isDeleted={isDeleted}
            isError={isError}
        />
    );
};

export default Resource;