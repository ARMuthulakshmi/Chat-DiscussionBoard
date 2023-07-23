const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://muthaarm:WlirWHQJAecb4Ge1@cluster0.evbx7nk.mongodb.net/ForumBoard?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Create a post schema
const postSchema = new mongoose.Schema({
  author: String,
  content: String
});

// Create a post model
const Post = mongoose.model('Post', postSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// API endpoint to fetch all posts
app.get('/api/posts', (req, res) => {
  Post.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Error fetching posts' });
    });
});
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// API endpoint to create a new post
app.post('/api/posts', (req, res) => {
  const post = new Post({
    author: req.body.author,
    content: req.body.content
  });

  post.save()
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error saving post:', error);
      res.status(500).json({ error: 'Error saving post' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
