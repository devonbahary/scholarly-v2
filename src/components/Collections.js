import React, { Component } from "react";
import axios from "axios";

class Collections extends Component {
    state = {
        collections: [],
    };

    async componentDidMount() {
        const response = await axios.get('/api/collections');
        this.setState(() => ({
            collections: response.data,
        }));
    };

    render() {
        return (
            <div>
                <h1>Collections</h1>
                <ul>
                    {this.state.collections.map(collection => (
                        <li key={collection._id}>{collection.name}</li>
                    ))}
                </ul>
            </div>
        );
    };
}

export default Collections;