import React from "react";
import Icon from "./Icon";

import styles from "./icons.scss";

const ErrorIcon = () => (
    <Icon className={styles.error}>
        <i className="fas fa-exclamation-triangle"></i>
    </Icon>
);

export default ErrorIcon;