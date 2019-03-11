import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import SideSheet from "../components/side-sheet";

const Loading = <div>Loading...</div>;

const Home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */"./home"),
    loading: Loading,
    modules: ["home"]
});


const NotFound = () => "Not Found";

export default props => (
    <div className="App">
        <SideSheet />
        <Switch>
            <Route exact path="/" component={Home} />

            <Route component={NotFound} />
        </Switch>
    </div>
);
