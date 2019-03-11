import React from "react";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Icon from "../icon";

const category = [
    { name: "营养素", name_en: "nutrition", brand: "react" },
    { name: "食物介绍", name_en: "food_intr", brand: "apple" },
    { name: "生活习惯", name_en: "habit", brand: "google" },
    { name: "FAQ", name_en: "faq", brand: "twitter" },
];
export default React.memo(({ handler }) => (
    <Row className="layer layer-category">
        {category.map(({ name, name_en, brand }) => (
            <Col xs={3} key={name_en}>
                <Button
                    variant="link"
                    onClick={handler.go}
                    data-href={`/course_category/${name_en}`}>
                    {Icon.brand(brand)}
                    <p>{name}</p>
                </Button>
            </Col>
        ))}
    </Row>
));
