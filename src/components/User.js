import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import "./common.css"

const ProfileDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://express-t4.onrender.com/api/users/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, [id]);

    if (!user) {
        return <div><h1>User Not Found</h1></div>;
    }

    const goToProfilePage = () => {
        navigate("/profile");
    };

    return (
        <Container className='d-flex flex-column align-items-center justify-content-center min-vh-100 userContainer'>
            <div className="p-5 border rounded" style={{ width: '80%', maxWidth: '800px'}}>
                <Row className='mb-4'>
                    <Col>
                        <h1 className="text-center">{user.name}</h1>
                    </Col>
                </Row>
                <Row className='mb-4'>
                    <Col md={4} className='d-flex justify-content-center'>
                        <Image src={user.picture} alt={user.name} fluid />
                    </Col>
                    <Col md={8}>
                        <Row className='mb-2'>
                            <Col>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col>
                                <h4>Phone</h4>
                                <p>{user.phone}</p>
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col>
                                <h4>Address</h4>
                                <p>{user.address}</p>
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col className='d-flex justify-content-end'>
                                <Button onClick={goToProfilePage}>Back</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default ProfileDetail;
