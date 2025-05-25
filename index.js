require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.77gimyx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const taskCollection = client.db('taskfolio').collection('tasks')

    app.get('/api/tasks', async(req, res) => {
        // const cursor = taskCollection.find();
        // const result = await cursor.toArray();
        const result = await taskCollection.find().toArray();
        res.send(result)
    })
    app.get('/api/tasks/:id', async(req, res) => {
        const id = req.params.id;
        try {
            const result = await taskCollection.findOne(
                {
                    _id: new ObjectId(id)
                });
            if (!result) {
                return res.status(404).send({ error: 'Task not found' });
            }
            res.send(result);
        } catch (error) {
            res.status(400).send({ error: 'Invalid ID format' });
        }
    })
    app.post('/api/tasks', async(req, res) => {
        const newTask = req.body;
        console.log(newTask)
        const result = await taskCollection.insertOne(newTask)
        res.send(result)
    })

    app.patch('/api/tasks/:id', async (req, res) => {
        const id = req.params.id;
        const { _id, ...updateData } = req.body;
        console.log(updateData)
        try {
            const result = await taskCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateData }
            );
            res.send(result);
        } catch (error) {
            res.status(500).send({ error: 'Failed to update task' });
        }
    });
  } finally {
    // Comment out client.close() to keep the connection open
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('hello world!')
})
app.get('/x', (req, res) => {
    res.send('hello X')
})
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
})
