import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const SingleUser = (user) => {
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{user.user.name}</Card.Title>
                    <Card.Title>{user.user.surname}</Card.Title>
                    <Card.Title>{user.user.birthdate}</Card.Title>
                    <Card.Title>{user.user.email}</Card.Title>
                    
                    <Button variant="danger">Delete</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default SingleUser