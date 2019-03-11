import React from "react";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Icon from "../../components/icon";

export default React.memo(({ imgs, handler }) => (
    <div className="course-list">
        {imgs.map((img, index) => (
            <Row key={index} onClick={handler.goToWxBlog}>
                <Col xs={4}>
                    <img alt="course-thumbnail" src={img} />
                </Col>
                <Col xs={7}>
                    <h3>Card Title {index + 1}</h3>
                    <p>
                        Some quick example text to build on the card title and make up the bulk of the
                        card's content.
                    </p>
                </Col>
                <Col xs={1}>{Icon["angle-right"]}</Col>
            </Row>
        ))

        }
    </div>
));
