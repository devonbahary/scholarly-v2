import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";

import CollectionsStore from "./stores/CollectionsStore";
import QuotesStore from "./stores/QuotesStore";

import Collection from "./components/collections/Collection";
import Collections from "./components/collections/Collections";
import Home from "./components/Home";
import Quotes from "./components/quotes/Quotes";

import styles from "./styles/App.scss";
import CollectionStore from "./stores/CollectionStore";


const collectionStore = new CollectionStore();
const collectionsStore = new CollectionsStore();
const quotesStore = new QuotesStore();


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
        component: Collection,
        path: '/collections/:id',
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
        <Provider collectionStore={collectionStore} collectionsStore={collectionsStore} quotesStore={quotesStore}>
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
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));