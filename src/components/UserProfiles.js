import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Form, Container, Row, Col} from "react-bootstrap";
import "./common.css";

const UserProfiles = () => {
    const [users, setUsers] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('https://express-t4.onrender.com/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error("Error while getting users data.", error);
            }
        };

        getUsers();
    }, []);

    const handleSearch = (e) => {
        setSearchFilter(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchFilter.toLowerCase())
    );

    return (
        <Container className='d-flex flex-column align-items-center justify-content-center min-vh-100'>
            <Row className="mb-4 w-100">
                <Col>
                    <h1 className="text-center">User Profiles</h1>
                </Col>
            </Row>
            <Row className="mb-4 w-100">
                <Col md={8}>
                    <Form.Control
                        type="text"
                        placeholder="Search by first or last name"
                        value={searchFilter}
                        onChange={handleSearch}
                    />
                </Col>
            </Row>
            <Row className="g-4 w-100">
                {filteredUsers.map(user => (
                    <Col md={4} sm={6} key={user._id}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={user.picture}/>
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Link to={`/profile/${user._id}`} className="btn btn-primary">View Profile</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default UserProfiles;
