const express = require('express')
const mongoose = require('mongoose')
const AuthorModel = require('../models/authorModel')

const router = express.Router();

//! CREA FUNZIONE GET
router.get('/authors', async(req, res) => {
    try {
        const authors = await AuthorModel.find()

        res.status(200).send({
            statusCode: 200,
            authors: authors
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server Error',
            error,
        })
    }
})

//! CREA FUNZIONE POST

router.post('/authors', async(req, res) => {

    const newAuthor = new AuthorModel({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        birthdate: req.body.birthdate,
        avatar: req.body.avatar,
    })

    try {
        const author = await newAuthor.save();
        res.status(201).send({
            statusCode: 201,
            message: 'Authors saved successfully',
            payload: author
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error,
        })
    }

})

//! GET By ID
router.get('/authors/:id' , async (req, res) => {
    const {id} = req.params;

    try {
        const authorById = await AuthorModel.findById(id)

        res.status(200).send({
            statusCode: 200,
            authorById
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error,
        })
    }
})


//! CREA FUNZIONE PATCH

router.patch('/authors/:id', async(req, res) => {
    const {id} = req.params;

    const authorExists = await AuthorModel.findById(id)

    if(!authorExists) {
        return res.status(404).send({
            statusCode: 404,
            message: `Author with id ${id} doesen't exist`
        })
    }

    try {
        const authorId = id;
        const dataToUpdate = req.body;
        const options = {new: true};

        const result = await AuthorModel.findByIdAndUpdate(authorId, dataToUpdate, options);

        res.status(200).send({
            statusCode: 200,
            message: `Author with id ${authorId} modified successfully`,
            result
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error,
        })
    }
})

//! DELETE

router.delete('/authors/:id', async(req, res) => {
    const {id} = req.params;
    const authorExists = await AuthorModel.findById(id)

    if (!authorExists) {
        return res.status(404).send({
            statusCode: 404,
            message: 'Author not Found'
        })
    }

    try {
        const authorToDelete = await AuthorModel.findByIdAndDelete(id)

        res.status(200).send({
            statusCode: 200,
            message: 'Author deleted successuffly',
            authorToDelete
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error,
        })
    }
})

module.exports = router;