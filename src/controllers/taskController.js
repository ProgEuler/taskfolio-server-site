const { ObjectId } = require('mongodb');
const client = require('../db/mongoClient');

const taskCollection = client.db('taskfolio').collection('tasks');

exports.getAllTasks = async (req, res) => {
    const result = await taskCollection.find().toArray();
    res.send(result);
};

exports.getTaskById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await taskCollection.findOne({ _id: new ObjectId(id) });
        if (!result) return res.status(404).send({ error: 'Task not found' });
        res.send(result);
    } catch {
        res.status(400).send({ error: 'Invalid ID format' });
    }
};

exports.createTask = async (req, res) => {
    const newTask = req.body;
    const result = await taskCollection.insertOne(newTask);
    res.send(result);
};

exports.updateTask = async (req, res) => {
    const id = req.params.id;
    const { _id, ...updateData } = req.body;
    try {
        const result = await taskCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );
        res.send(result);
    } catch {
        res.status(500).send({ error: 'Failed to update task' });
    }
};

exports.deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Task not found' });
        }
        res.send({ message: 'Task deleted successfully' });
    } catch {
        res.status(400).send({ error: 'Invalid ID format' });
    }
};
