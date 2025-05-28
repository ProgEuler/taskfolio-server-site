const client = require('../db/mongoClient');

const userCollection = client.db('taskfolio').collection('users');

exports.getUserByEmail = async (req, res) => {
    const userCollection = client.db('taskfolio').collection('users');
    const email = req.params.email;
    try {
        const result = await userCollection.findOne({ email });
        if (!result) return res.status(404).send({ error: 'User not found' });
        res.send(result);
    } catch {
        res.status(400).send({ error: 'Invalid ID format' });
    }
};

exports.updateUserByEmail = async (req, res) => {
    const userCollection = client.db('taskfolio').collection('users');
    const email = req.params.email;
    const { _id, ...updateData } = req.body;
    try {
        const result = await userCollection.updateOne(
            { email },
            { $set: updateData }
        );
        res.send(result);
    } catch {
        res.status(500).send({ error: 'Failed to update user' });
    }
};

exports.createUser = async (req, res) => {
    const userCollection = client.db('taskfolio').collection('users');
    const newUser = req.body;
    const result = await userCollection.insertOne(newUser);
    res.send(result);
};
