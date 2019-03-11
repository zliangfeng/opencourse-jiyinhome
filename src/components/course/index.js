import React from "react";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Icon from "../icon";

const course = {
    star: "明星",
    recent: "最新"
};

const defaultHandler = { go: () => console.log("No Action Bound For Click") };

export default React.memo(({i_course, category = "star", handler = defaultHandler, moreHref = "/" }) => (
    <div className="layer layer-course">
        <Row className="title">
            <Col xs={{ span: 3 }}>{course[category]}课程</Col>
            <Col xs={{ span: 3, offset: 6 }}>
                <Button variant="link" onClick={handler.go} data-href={moreHref}>
                    查看更多&nbsp;
                    {Icon["angle-right"]}
                </Button>
            </Col>
        </Row>
        <div className="content">
            <div>
                <div>
                    <img src={i_course} alt="course 1" />
                </div>
                <div>
                    <img src={i_course} alt="course 2" />
                </div>
                <div>
                    <img src={i_course} alt="course 3" />
                </div>
                <div>
                    <img src={i_course} alt="course 4" />
                </div>
                <div onClick={handler.go} data-href={moreHref}>查看更多</div>
            </div>
        </div>
    </div>
));
