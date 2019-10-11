import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";

import styles from "./styles/App.scss";

const Tab = ({ children, exact, to}) => (
    <NavLink
        exact={exact}
        to={to}
        className={styles.navLink}
        activeClassName={styles.navLinkActive}
    >
        {children}
    </NavLink>
);

const App = () => {
    const routes = [];

    return (
        <Router>
            <main className={styles.main}>
                <Switch>
                    {routes.map(({ component, exact, path }) => (
                        <Route key={path} exact={exact} path={path} component={component} />
                    ))}
                </Switch>
            </main>
            <footer className={styles.footer}>
                {routes.filter(route => route.tabIcon).map(({ exact, path, tabIcon }) => (
                    <Tab key={path} exact={exact} to={path}>
                        {tabIcon}
                    </Tab>
                ))}
            </footer>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));