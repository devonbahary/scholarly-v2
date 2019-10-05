import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Collections from "./components/Collections";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" component={Collections} />
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));