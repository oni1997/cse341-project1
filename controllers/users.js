const mongodb = require('../data/database');
const Objectld = require('mongodb').Objectld;


const getAll = async (req, res) => {
}

const getSing1e = async (req, res) => {
    const result = await mongodb.getDatabase().db('users').collection('users').find();
}