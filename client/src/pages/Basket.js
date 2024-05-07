import React, { useContext, useEffect, useState } from 'react';
import { Button, ListGroup, Dropdown, Modal, Form } from 'react-bootstrap';
import Footer from '../components/Footer';
import { Context } from '../index';

const Basket = () => {
    const { device } = useContext(Context);
    const [basketItemsIds, setBasketItemsIds] = useState(JSON.parse(localStorage.getItem('basketItemsIds')) || []);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        let itemsCount = 0;
        let itemsTotalPrice = 0;
        basketItemsIds.forEach(itemId => {
            const selectedItem = device.devices.find(device => device.id === itemId);
            if (selectedItem) {
                itemsCount++;
                itemsTotalPrice += selectedItem.price;
            }
        });
        setTotalItems(itemsCount);
        setTotalPrice(itemsTotalPrice);
    }, [basketItemsIds, device.devices]);

    useEffect(() => {
        localStorage.setItem('basketItemsIds', JSON.stringify(basketItemsIds));
    }, [basketItemsIds]);

    const addItemToBasket = (itemId, itemPrice) => {
        setBasketItemsIds(prevIds => [...prevIds, itemId]);
    };

    const removeItemFromBasket = (itemId, itemPrice) => {
        setBasketItemsIds(prevIds => prevIds.filter(id => id !== itemId));
    };

    const handleCheckout = () => {
        setShowCheckoutModal(true);
    };

    const handleConfirmCheckout = () => {
        setShowCheckoutModal(false);
        alert(`Your order has been placed! We will contact you at ${phoneNumber}`);
    };

    const handleCheckoutModalClose = () => {
        setShowCheckoutModal(false);
    };

    return (
        <div className="container">
            <div className="mb-4">
                <h2 className="mt-4 mb-3 d-flex justify-content-center">Your Basket</h2>
                <p className="text-center">Review your items and proceed to checkout.</p>
            </div>
            <ListGroup className="mb-3">
                {basketItemsIds.map((itemId, index) => {
                    const selectedItem = device.devices.find(device => device.id === itemId);
                    if (!selectedItem) return null;
                    return (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                            <span>{selectedItem.name}</span>
                            <Button variant="danger" onClick={() => removeItemFromBasket(itemId, selectedItem.price)}>Remove</Button>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
            <Dropdown className="mb-3">
                <Dropdown.Toggle variant="primary">
                    Add Item
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {device.devices.map((device) => (
                        <Dropdown.Item key={device.id} onClick={() => addItemToBasket(device.id, device.price)}>
                            <div className="d-flex justify-content-between align-items-center">
                                <span>{device.name}</span>
                                <span>{device.price} uah</span>
                            </div>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <div className="d-flex justify-content-between align-items-center">
                <span>Total Items: {totalItems}</span>
                <span>Total Price: {totalPrice} uah</span>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <Button className='mb-4' variant="primary" onClick={handleCheckout}>Proceed to Checkout</Button>
            </div>
            <Modal show={showCheckoutModal} onHide={handleCheckoutModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Checkout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="tel"
                            pattern="[0-9]{10,12}"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className={phoneNumber.match(/[0-9]{10,12}/) ? 'is-valid' : 'is-invalid'}
                        />
                        <div className={phoneNumber.match(/[0-9]{10,12}/) ? 'valid-feedback' : 'invalid-feedback'}>
                            {phoneNumber.match(/[0-9]{10,12}/) ? 'Looks good!' : 'Please enter a valid phone number'}
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCheckoutModalClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleConfirmCheckout}>Confirm</Button>
                </Modal.Footer>
            </Modal>
            <Footer fixed={false} />
        </div>
    );
};

export default Basket;