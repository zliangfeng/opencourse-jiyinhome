import React from "react";
import Banner from "../../components/banner";
import Footer from "../../components/footer";
import CourseList from "../../components/course-list";

import i_banner_1 from "./IMG/首页图2.jpg";
import i_banner_2 from "./IMG/首页图3.jpg";

class RecentCourse extends React.Component {

    goTo = () => {
        window.location.href = "https://www.baidu.com";
    }

    handler = { goToWxBlog: this.goTo };

    render() {
        return (
            <div>
                <Banner imgs={[i_banner_1]} />
                <CourseList imgs={[i_banner_1, i_banner_2]} handler={this.handler} />
                <Footer />
            </div>
        );
    }
}

export default RecentCourse;