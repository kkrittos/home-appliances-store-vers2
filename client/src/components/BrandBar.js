import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row, Col } from "react-bootstrap";

const BrandBar = observer(() => {
    const { device } = useContext(Context);
    return (
        <Row className='d-flex'>
            {device.brands.map(brand =>
                <Col xs={6} sm={4} md={3} lg={2} key={brand.id} className='p-3'>
                    <Card
                        style={{ cursor: 'pointer' }}
                        onClick={() => device.setSelectedBrand(brand)}
                        border={device.selectedBrand && brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    >
                        <Card.Body>{brand.name}</Card.Body>
                    </Card>
                </Col>
            )}
        </Row>
    );
});

export default BrandBar;