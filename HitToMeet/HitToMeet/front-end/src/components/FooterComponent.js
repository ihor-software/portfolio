import React, { Component } from 'react';
import { Col } from 'reactstrap';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="row jusify-content-center">
                        <Col></Col>
                        <Col className="footer-sign">
                            <p className="text-center">
                                Все права защищены 2020 Ⓒ
                            </p>
                        </Col>
                        <Col></Col>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;