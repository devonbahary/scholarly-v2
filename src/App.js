import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import Collections from "./components/collections/Collections";
import Quotes from "./components/quotes/Quotes";
import CollectionIcon from "./components/icons/CollectionIcon";
import QuoteIcon from "./components/icons/QuoteIcon";

import styles from "./styles/App.scss";

const Tab = props => (
    <NavLink
        exact={props.exact}
        to={props.to}
        className={styles.navLink}
        activeClassName={styles.navLinkActive}
    >
        {props.children}
    </NavLink>
);

const App = () => {
    const routes = [{
        path: "/collections",
        component: Collections,
        tabIcon: <CollectionIcon />,
    }, {
        path: "/quotes",
        component: Quotes,
        tabIcon: <QuoteIcon />,
    }];

    return (
        <Router>
            <main className={styles.main}>
                <Switch>
                    {routes.map(({ component, path }) => (
                        <Route key={path} path={path} component={component} />
                    ))}
                </Switch>
            </main>
            <footer className={styles.footer}>
                {routes.map(({ path, tabIcon }) => (
                    <Tab key={path} to={path}>
                        {tabIcon}
                    </Tab>
                ))}
            </footer>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));