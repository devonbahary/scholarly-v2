import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";

import Collections from "./components/collections/Collections";
import Home from "./components/Home";
import Quotes from "./components/quotes/Quotes";

import styles from "./styles/App.scss";


const Tab = ({ children, exact, to}) => (
    <NavLink
        activeClassName={styles.navLinkActive}
        className={styles.navLink}
        exact={exact}
        to={to}
    >
        {children}
    </NavLink>
);

const App = () => {
    const routes = [{
        component: Home,
        exact: true,
        path: '/',
        tabIcon: <i className="fas fa-home"></i>,
    }, {
        component: Collections,
        path: '/collections',
        tabIcon: <i className="fas fa-book"></i>,
    }, {
        component: Quotes,
        path: '/quotes',
        tabIcon: <i className="fas fa-quote-right"></i>,
    }];

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