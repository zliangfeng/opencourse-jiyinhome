import React from "react";
import cx from "classnames";
import Dropdown from "react-bootstrap/lib/Dropdown";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import Col from "react-bootstrap/lib/Col";
import NavHeader from "../../components/nav-header";
import Footer from "../../components/footer";
import CourseList from "../../components/course-list";
import Icon from "../../components/icon";

import i_banner_1 from "./IMG/首页图2.jpg";
import i_banner_2 from "./IMG/首页图3.jpg";

const REMARK = {
    nutrition: ["牛奶", "维生素A", "叶酸", "钙", "铁", "锌"],
    food_intr: ["奶制品", "深色蔬菜", "红酒", "肉", "海鲜", "零食"],
    habit: ["饮食", "户外运动", "作息"],
    faq: ["基因", "膳食", "营养", "营养学", "体检"],
};
class CourseCategory extends React.Component {
    state = {};

    goTo = () => {
        window.location.href = "https://www.baidu.com";
    };

    handlePick = event => {
        event.preventDefault();
        // console.log(event.target.name);
        this.setState({ mark: event.target.name });
    };

    handler = { goToWxBlog: this.goTo };

    render() {
        const { category } = this.props.match.params;
        const { mark } = this.state;

        if (!category || !REMARK[category]) return <div>无相关内容！！！</div>;

        const remarks = REMARK[category];
        const needPlusIcon = remarks.length > 4;
        return (
            <div>
                <NavHeader sticky>
                    <Col xs={1} as="button" onClick={this.handlePick} name="all">
                        All
                    </Col>
                    <Col xs={9} className="mark-zone">
                        {remarks.slice(0, 4).map(foo => (
                            <button
                                key={foo}
                                onClick={this.handlePick}
                                name={foo}
                                className={cx({ hit: foo === mark })}>
                                {foo}
                            </button>
                        ))}
                    </Col>
                    {needPlusIcon && (
                        <Col
                            xs={1}
                            as={DropdownButton}
                            alignRight
                            title={Icon.plus}
                            id="dropdown-more-category">
                            {remarks.slice(4).map(foo => (
                                <Dropdown.Item key={foo} name={foo} onClick={this.handlePick}>
                                    {foo}
                                </Dropdown.Item>
                            ))}
                        </Col>
                    )}
                </NavHeader>
                <CourseList imgs={[i_banner_1, i_banner_2]} handler={this.handler} />
                <Footer />
            </div>
        );
    }
}

export default CourseCategory;
