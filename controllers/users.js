const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    const result = await mongodb.getDatabase().db('project1').collection('users').find();
    const users = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
}

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project1').collection('users').find({ _id: userId });
    const users = await result.toArray();
    
    if (users.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    } else {
        res.status(404).json({ error: "User not found" });
    }

}

const createUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const user = {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };
    const result = await mongodb.getDatabase().db('project1').collection('users').insertOne(user);
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json({ error: "Some error occurred while creating the user" });
    }
}

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };
    
    const result = await mongodb.getDatabase().db('project1').collection('users').replaceOne({ _id: userId }, user);
    
    if (result.modifiedCount > 0) {
        return res.status(204).end();
    } else {
        return res.status(500).json({ error: "Some error occurred while updating the user" });
    }

}

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project1').collection('users').deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
        res.status(204).end();
    } else {
        res.status(500).json({ error: "Some error occurred while deleting the user" });
    }
}


module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
