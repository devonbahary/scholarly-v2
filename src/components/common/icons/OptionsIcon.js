import React from "react";
import Icon from "./Icon";

const OptionsIcon = ({ className, onClick }) => (
    <Icon className={className} onClick={onClick}>
        <i className="fas fa-ellipsis-h"></i>
    </Icon>
);

export default OptionsIcon;