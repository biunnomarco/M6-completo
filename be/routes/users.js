const express = require('express')
const mongoose = require('mongoose')
const UserModel = require('../models/userModel')

const user = express.Router();

//! CREA FUNZIONE GET
user.get('/users', async(req, res) => {
    try {
        const users = await UserModel.find()

        res.status(200).send({
            statusCode: 200,
            users: users
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

user.post('/users', async(req, res) => {

    const newUser = new UserModel({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        birthdate: req.body.birthdate,
        avatar: req.body.avatar,
    })

    try {
        const user = await newUser.save();
        res.status(201).send({
            statusCode: 201,
            message: 'User saved successfully',
            payload: user
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
user.get('/users/:id' , async (req, res) => {
    const {id} = req.params;

    try {
        const userById = await UserModel.findById(id)

        res.status(200).send({
            statusCode: 200,
            userById
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

user.patch('/users/:id', async(req, res) => {
    const {id} = req.params;

    const userExists = await UserModel.findById(id)

    if(!userExists) {
        return res.status(404).send({
            statusCode: 404,
            message: `User with id ${id} doesen't exist`
        })
    }

    try {
        const userId = id;
        const dataToUpdate = req.body;
        const options = {new: true};

        const result = await UserModel.findByIdAndUpdate(userId, dataToUpdate, options);

        res.status(200).send({
            statusCode: 200,
            message: `User with id ${userId} modified successfully`,
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

user.delete('/users/:id', async(req, res) => {
    const {id} = req.params;
    const userExists = await UserModel.findById(id)

    if (!userExists) {
        return res.status(404).send({
            statusCode: 404,
            message: 'User not Found'
        })
    }

    try {
        const userToDelete = await UserModel.findByIdAndDelete(id)

        res.status(200).send({
            statusCode: 200,
            message: 'User deleted successuffly',
            userToDelete
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error,
        })
    }
})

module.exports = user;