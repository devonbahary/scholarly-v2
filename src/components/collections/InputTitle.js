import React, { Component } from "react";

const KEY_CODE_ENTER = 13;

class InputTitle extends Component {
    handleKeyDown = e => {
        if (e.keyCode === KEY_CODE_ENTER) {
            this.props.onExit(e);
        }
    };

    render() {
        return (
            <input
                type="text"
                onBlur={this.props.onExit}
                onKeyDown={this.handleKeyDown}
                autoFocus
            />
        );
    };
}

export default InputTitle