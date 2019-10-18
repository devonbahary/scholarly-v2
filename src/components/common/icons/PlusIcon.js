import React from "react";
import Icon from "./Icon";

import styles from "./icons.scss";

const PlusIcon = ({ onClick, shouldRotate }) => (
    <Icon className={shouldRotate ? styles.rotated : ''} onClick={onClick}>
        <i className="fas fa-plus"></i>
    </Icon>
);

export default PlusIcon;