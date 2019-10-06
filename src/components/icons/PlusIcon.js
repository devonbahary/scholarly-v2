import React from "react";

import styles from "../../styles/icons.scss";

const PlusIcon = ({ rotate }) => (
    <i className={`fas fa-plus ${styles.icon} ${rotate ? styles.rotate45 : ''}`}></i>
);

export default PlusIcon;