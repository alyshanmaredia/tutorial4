import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

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
        <div>
            <h1>User Profiles</h1>
            <input
                type="text"
                placeholder="Search by first or last name"
                value={searchFilter}
                onChange={handleSearch}
            />
            <div className="user-list">
                {filteredUsers.map(user => (
                    <Card style={{width: '18rem'}}>
                        <Card.Img variant="top" src={user.picture} alt={user.name}/>
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <Link to={`/profile/${user._id}`} className="btn btn-primary">View Profile</Link>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default UserProfiles;
