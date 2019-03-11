import React from "react";
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../actions/layer";

import Nav from "./nav";

class SideSheet extends React.Component {
    render() {
        const { side = "left", show, children } = this.props;
        return (
            <Modal
                className={`side-sheet ${side}`}
                show={show}
                onHide={this.props.actions.toggleSideSheet}
                autoFocus
                keyboard>
                <Modal.Header closeButton>
                    <Modal.Title> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Nav />
                    {children}
                </Modal.Body>
            </Modal>
        );
    }
}

export default connect(
    state => ({
        show: state.layer.show_side_sheet || false
    }),
    dispatch => ({ actions: bindActionCreators(actionCreators, dispatch) })
)(SideSheet);
