import React from "react";
import { render, hydrate } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
// import { routerMiddleware } from "react-router-redux";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import createHistory from "history/createBrowserHistory";
import Loadable from "react-loadable";

import callAPIMiddleware from "./callFetchMiddleware";
import createRootReducer from "./reducers";
import Routes from "./routes";
import RoutesLoadable from "./routes/index.loadable";

// cookies
import { cookies } from "./shared/cookies";
// import registerServiceWorker from './registerServiceWorker';

const isDevelopmentMode = process.env.NODE_ENV === "development";

const initialState = { user: { item: cookies.get("account") } };

const history = createHistory();
const store = createStore(
    createRootReducer(history),
    initialState,
    isDevelopmentMode
        ? applyMiddleware(thunk, createLogger(), callAPIMiddleware, routerMiddleware(history))
        : applyMiddleware(thunk, callAPIMiddleware, routerMiddleware(history))
);

const root = document.getElementById("root");

if (isDevelopmentMode) {
    const Application = (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Routes />
            </ConnectedRouter>
        </Provider>
    );
    console.log("running mode: development");
    // If we're not running on the server, just render like normal
    render(Application, root);
} else {
    const Application = (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <RoutesLoadable />
            </ConnectedRouter>
        </Provider>
    );
    console.log("running mode: production");
    // If we're running in production, we use hydrate to get fast page loads by just
    // attaching event listeners after the initial render
    Loadable.preloadReady().then(() => {
        hydrate(Application, root);
    });
}

// registerServiceWorker();
