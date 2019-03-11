import React, { Component } from "react";
import Carousel from "react-bootstrap/lib/Carousel";

export default class Banner extends Component {
    render() {
        const { imgs } = this.props;
        return (
            <Carousel className="layer layer-banner">
                {imgs.map((img, index) => (
                    <Carousel.Item key={index}>
                        <img className="d-block w-100" alt="Banner Zone" src={img} />
                        <Carousel.Caption>
                            <h3>营养课堂介绍{index + 1}</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        );
    }
}
