import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import cs from "classnames";
import { isGranted } from "../../shared/cookies";
import {debuggor} from '../../shared/debuggor';
import { data as links } from "./links.json";

const link = links.reduce(
    (result, { to, show_header = true }) => Object.assign(result, { [to]: show_header }),
    {}
);

const isCurrent = (to, current) =>
    to === "/" ? current === to : `${current}/`.startsWith(`${to}/`);

const isShowHeader = (pathname = "/") => {
    const parent_path = "/" + (pathname.split("/")[1] || "");
    debuggor(parent_path, link[parent_path]);
    return link[parent_path];
};

const Nav = React.memo(({ location: { pathname: current } }) => {
    if (!isShowHeader(current)) return null;

    const _links = links.map(
        ({ to, text }, index) =>
            isGranted(to) ? (
                <Link to={to} key={index} className={cs({ current: isCurrent(to, current) })}>
                    <span className="block">{text}</span>
                </Link>
            ) : null
    );

    return (<React.Fragment>{_links}</React.Fragment>);
});

export default withRouter(Nav);
