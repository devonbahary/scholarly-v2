import React from "react";
import Icon from "./Icon";

const EditIcon = ({ className, onClick }) => (
    <Icon className={className} onClick={onClick}>
        <i className="fas fa-edit"></i>
    </Icon>
);

export default EditIcon;