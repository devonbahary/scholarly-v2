import React from "react";

import styles from "./icons.scss";

const Icon = ({ children, className, onClick }) => (
    <div className={`${styles.icon} ${className ? className : ''}`} onClick={onClick}>
        {children}
    </div>
);

export default Icon;