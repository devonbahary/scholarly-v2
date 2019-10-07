import React, { Component } from "react";

import styles from "../../styles/Collections.scss";

const KEY_CODE_ENTER = 13;

class InputTitle extends Component {
    handleKeyDown = e => {
        if (e.keyCode === KEY_CODE_ENTER) {
            this.props.onExit(e);
        }
    };

    render() {
        const { isSaving, onExit } = this.props;
        const className = isSaving ? styles.isSaving : '';
        return (
            <input
                className={className}
                type="text"
                onBlur={onExit}
                onKeyDown={this.handleKeyDown}
                autoFocus
                readOnly={isSaving}
            />
        );
    };
}

export default InputTitle