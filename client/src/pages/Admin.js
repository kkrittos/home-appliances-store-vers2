import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';
import CreateDevice from '../components/modals/CreateDevice';
import Footer from "../components/Footer";
import { fetchBrands } from '../http/deviceAPI';

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [brandsData, setBrandsData] = useState([]);

    useEffect(() => {
        fetchBrands()
            .then(data => setBrandsData(data))
            .catch(error => console.error('Error fetching brands:', error));
    }, []);

    return (
        <Container className="d-flex flex-column">
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Add type
            </Button>
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Add brand
            </Button>
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
                onClick={() => setDeviceVisible(true)}
            >
                Add device
            </Button>

            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {brandsData.map((brand, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{brand.name}</td>
                            <td>{brand.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Footer fixed={false} />
        </Container>
    );
};

export default Admin;