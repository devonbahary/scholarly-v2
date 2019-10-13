import React from "react";
import Icon from "./Icon";

const BookIcon = ({ className, children, onClick }) => (
    <Icon className={className} onClick={onClick}>
        <i className="fas fa-book"></i> {children}
    </Icon>
);

export default BookIcon;