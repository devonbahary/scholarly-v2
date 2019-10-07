import React, { Component } from "react";

export class LoadingComponent extends Component {
    state = {
        isLoading: true,
        isLoadingError: false,
    };

    loadApiCall = () => {};
    onLoadSuccess = () => {};

    componentDidMount() {
        this.loadState();
    }

    loadState = async () => {
        this.setState({ isLoading: true, isLoadingError: false });

        const data = await this.loadApiCall();
        if (data) {
            this.setState({ isLoading: false, isLoadingError: false });
            this.onLoadSuccess(data);
        } else {
            this.setState({ isLoading: false, isLoadingError: true });
        }
    };
}