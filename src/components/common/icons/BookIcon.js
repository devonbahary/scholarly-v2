import React from "react";
import Icon from "./Icon";

const BookIcon = ({ className, onClick }) => (
    <Icon className={className} onClick={onClick}>
        <i className="fas fa-book"></i>
    </Icon>
);

export default BookIcon;