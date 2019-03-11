import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/index.scss";
import SideSheet from "../components/side-sheet";

import Home from "./home";
import RecentCourse from "./recent-course";
import StarCourse from "./star-course";
import CourseCategory from "./course-category";

const NotFound = () => "Not Found";

export default () => (
    <div className="App">
        <SideSheet />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/recent_course" component={RecentCourse} />
            <Route exact path="/star_course" component={StarCourse} />
            <Route exact path="/course_category/:category" component={CourseCategory} />

            <Route component={NotFound} />
        </Switch>
    </div>
);
