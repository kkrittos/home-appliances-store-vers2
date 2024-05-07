import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = ({ fixed }) => {
    return (
        <footer className={`footer py-2 mt-2 ${fixed ? 'fixed-bottom' : ''}`}>
            <Container fluid className="text-center">
            <div className="mt-4">
                <h4>Location of main office</h4>
                <iframe
                    width="100%"
                    height="300"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2349519174053!2d-73.99156568424545!3d40.73506407933028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259b7dd011b6f%3A0xe596b0ff8a4d74d2!2sBrooklyn%2C%20NY%2011225%2C%20USA!5e0!3m2!1sen!2s!4v1620704234804!5m2!1sen!2s"
                ></iframe>
            </div>
                <Row>
                    <Col>
                        <p>Contact us: info@techparadise.com</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>© 2024 TechParadise. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;