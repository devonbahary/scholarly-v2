import React from "react";
import Icon from "./Icon";

const TrashIcon = ({ className, onClick }) => (
    <Icon className={className} onClick={onClick}>
        <i className="fas fa-trash"></i>
    </Icon>
);

export default TrashIcon;