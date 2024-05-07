import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Card, Button, Pagination, Image } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import Footer from '../components/Footer';
import Pages from '../components/Pages'; 
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import { Link, useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE, BASKET_ROUTE } from '../utils/consts';


const Shop = observer(() => {
  const { device } = useContext(Context);
  const navigate = useNavigate();
  const [hasPagination, setHasPagination] = useState(true);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, 1, 6).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
      setHasPagination(data.rows.length > 0 && data.count > data.rows.length);
    });
  }, []);

  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 6).then((data) => {
      device.clearDevices(); 
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
      setHasPagination(data.rows.length > 0 && data.count > data.rows.length);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);

  const handleAddToCart = (deviceId) => {
    navigate(BASKET_ROUTE);
  };

  return (
    <Container className="py-4">
      <Row className='mt-3'>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <Row className="mt-3">
            {device.devices.map((device) => (
              <Col key={device.id} sm={6} md={4} lg={3} className="mb-4">
                <Card className="h-100 d-flex flex-column">
                  <Link to={`${DEVICE_ROUTE}/${device.id}`} style={{ textDecoration: 'none' }}>
                    <Image className="p-2 ms-4" width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
                  </Link>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Link to={`${DEVICE_ROUTE}/${device.id}`} style={{ textDecoration: 'none' }}>
                      <Card.Title>{device.name}</Card.Title>
                    </Link>
                    <Card.Text>{device.description}</Card.Text>
                    <Card.Text>Price: {device.price} uah</Card.Text>
                    <Button variant="primary" onClick={() => handleAddToCart(device.id)}>Add to Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {hasPagination && <Pages />} 
          <Footer fixed={false} />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;