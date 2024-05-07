import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Modal, Row } from "react-bootstrap";
import bigStar from '../assets/bigStar.png';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from "../http/deviceAPI";
import { useNavigate } from 'react-router-dom';
import { BASKET_ROUTE } from '../utils/consts';
import Footer from "../components/Footer";

const DevicePage = () => {
    const { id } = useParams();
    const [device, setDevice] = useState({ info: [] });
    const [rating, setRating] = useState(() => {
        const storedRating = JSON.parse(localStorage.getItem('ratings')) || {};
        return storedRating[id] || 0;
    });
    const [comment, setComment] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data));
    }, [id]);

    const handleAddToBasket = () => {
        navigate(BASKET_ROUTE);
    };

    const handleSubmitReview = () => {
        const newRatings = JSON.parse(localStorage.getItem('ratings')) || {};
        newRatings[id] = rating;
        localStorage.setItem('ratings', JSON.stringify(newRatings));
        setShowConfirmationModal(true);
    };

    const handleConfirmationModalClose = () => {
        setShowConfirmationModal(false);
    };

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image src={process.env.REACT_APP_API_URL + device.img} fluid />
                </Col>
                <Col md={8}>
                    <Row className='align-items-center'>
                        <Col md={6}>
                            <h2 className='d-flex align-items-center justify-content-center m-auto mb-4'>{device.name}</h2>
                            <div
                                className='d-flex align-items-center justify-content-center m-auto'
                                style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
                            >
                                {rating}
                            </div>
                        </Col>
                        <Col md={4} className='d-flex justify-content-end'>
                            <Card className='p-4 mt-4'>
                                <h3 className='mb-3'>Price: {device.price} UAH</h3>
                                <Button variant='dark' onClick={handleAddToBasket}>Add to Cart</Button>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <h4 className='mb-3'>Characteristics:</h4>
                    {device.info.map((info, index) => (
                        <Card key={info.id} className={index % 2 === 0 ? 'bg-light mb-3' : 'mb-3'}>
                            <Card.Body>
                                <Card.Title>{info.title}</Card.Title>
                                <Card.Text>{info.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <h4>Add Your Review:</h4>
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating:</label>
                        <input type="number" className="form-control" id="rating" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="comment" className="form-label">Comment:</label>
                        <textarea className="form-control" id="comment" rows="3" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    </div>
                    <Button variant="primary" onClick={handleSubmitReview}>Submit Review</Button>
                </Col>
            </Row>
            <Modal show={showConfirmationModal} onHide={handleConfirmationModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Review Submission</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your review has been submitted. A moderator will review your submission and publish it if approved.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleConfirmationModalClose}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Footer />
        </Container>
    );
};

export default DevicePage;