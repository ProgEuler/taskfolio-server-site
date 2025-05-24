require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.post('/add-tasks', (req, res) => {

    })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('hello world!')
})
app.get('/api/tasks', (req, res) => {
    const mockTasks = [
    {
      id: 1,
      title: 'Build a responsive e-commerce website',
      description: 'Looking for a skilled developer to create a modern, responsive e-commerce platform with payment integration, user authentication, and admin dashboard.',
      category: 'Web Development',
      budget: 2500,
      deadline: '2025-06-15',
      postedBy: 'Sarah Johnson',
      postedDate: '2025-05-20',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      description: 'Need a creative designer to design user interface and user experience for a fitness tracking mobile application. Should include wireframes and prototypes.',
      category: 'Design',
      budget: 1200,
      deadline: '2025-06-01',
      postedBy: 'Mike Chen',
      postedDate: '2025-05-18',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Content Writing for Tech Blog',
      description: 'Seeking an experienced tech writer to create engaging articles about AI, machine learning, and emerging technologies. 10 articles needed.',
      category: 'Writing',
      budget: 800,
      deadline: '2025-07-01',
      postedBy: 'Alex Rodriguez',
      postedDate: '2025-05-15',
      status: 'Active'
    },
    {
      id: 4,
      title: 'Python Data Analysis Script',
      description: 'Need a Python developer to create data analysis scripts for processing large datasets and generating visualizations using pandas and matplotlib.',
      category: 'Programming',
      budget: 600,
      deadline: '2025-05-30',
      postedBy: 'Emma Wilson',
      postedDate: '2025-05-12',
      status: 'Active'
    },
    {
      id: 5,
      title: 'Logo Design for Startup',
      description: 'Creative logo design needed for a new tech startup. Looking for modern, minimalist design that represents innovation and growth.',
      category: 'Design',
      budget: 400,
      deadline: '2025-06-10',
      postedBy: 'David Kim',
      postedDate: '2025-05-10',
      status: 'Active'
    },
    {
      id: 6,
      title: 'Social Media Marketing Campaign',
      description: 'Develop and execute a comprehensive social media marketing strategy for a local restaurant. Include content creation and scheduling.',
      category: 'Marketing',
      budget: 1500,
      deadline: '2025-06-20',
      postedBy: 'Lisa Thompson',
      postedDate: '2025-05-08',
      status: 'Active'
    }
    ];
    res.send(mockTasks)
})
app.get('/x', (req, res) => {
    res.send('hello X')
})
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
})
