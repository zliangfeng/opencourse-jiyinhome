import React from "react";
import NavHeader from "../../components/nav-header";
import Banner from "../../components/banner";
import CategoryLink from "../../components/category-link";
import Course from "../../components/course";
import Footer from "../../components/footer";

import i_banner_1 from "./IMG/首页图2.jpg";
import i_banner_2 from "./IMG/首页图3.jpg";
import i_course_1 from "./IMG/图3.jpg";

const imgs = [i_banner_1, i_banner_2];

export default class Home extends React.Component {
    goTo = ({
        currentTarget: {
            dataset: { href },
        },
    }) => {
        this.props.history.push(href);
    };

    handler = { go: this.goTo };
    render() {
        return (
            <div>
                <NavHeader />
                <Banner imgs={imgs} />
                <CategoryLink handler={this.handler} />
                <Course
                    category="star"
                    i_course={i_course_1}
                    handler={this.handler}
                    moreHref="/star_course"
                />
                <Course
                    category="recent"
                    i_course={i_course_1}
                    handler={this.handler}
                    moreHref="/recent_course"
                />
                <Footer />
            </div>
        );
    }
}
