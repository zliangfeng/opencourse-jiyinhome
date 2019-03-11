import React from "react";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import cx from "classnames";
import Banner from "../../components/banner";
import Footer from "../../components/footer";
import CourseList from "../../components/course-list";

import i_banner_1 from "./IMG/首页图2.jpg";
import i_banner_2 from "./IMG/首页图3.jpg";

const SHOW = {
    list: "list",
    intr: "intr",
};
class StarCourse extends React.Component {
    state = { show: SHOW.list };

    chose = ({
        target: {
            name
        },
    }) => {
        console.log(name);
        if (this.state.show === name) return;
        this.setState({ show: name });
    };

    goTo = () => {
        window.location.href = "https://www.baidu.com";
    };

    handler = { goToWxBlog: this.goTo };

    render() {
        const { show } = this.state;
        return (
            <div>
                <Banner imgs={[i_banner_1]} />
                <Row className="star-course-nav">
                    <Col xs={6} className={cx({ "tab-hit": show === SHOW.intr })}>
                        <button onClick={this.chose} name={SHOW.intr}>
                            课程介绍
                        </button>
                    </Col>
                    <Col xs={6} className={cx({ "tab-hit": show === SHOW.list })}>
                        <button onClick={this.chose} name={SHOW.list}>
                            课程列表
                        </button>
                    </Col>
                </Row>
                {show === SHOW.intr && (
                    <div className="course-intr">
                        <h3>课程介绍</h3>
                        <p>
                            Some quick example text to build on the card title and make up the bulk
                            of the card's content.
                        </p>
                    </div>
                )}
                {show === SHOW.list && (
                    <CourseList imgs={[i_banner_1, i_banner_2]} handler={this.handler} />
                )}
                <Footer />
            </div>
        );
    }
}

export default StarCourse;
