import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const SingleAuthor = (author) => {
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{author.author.name}</Card.Title>
                    <Card.Title>{author.author.surname}</Card.Title>
                    <Card.Title>{author.author.birthdate}</Card.Title>
                    <Card.Title>{author.author.email}</Card.Title>
                    
                    <Button variant="danger">Delete</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default SingleAuthor