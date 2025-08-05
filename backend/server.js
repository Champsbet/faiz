const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Post = require('./models/Post');

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost:27017/instagram-clone');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.post('/api/posts', upload.single('image'), async (req, res) => {
  const post = new Post({
    caption: req.body.caption,
    imageUrl: `http://localhost:3000/uploads/${req.file.filename}`,
    likes: 0
  });
  await post.save();
  res.json(post);
});

app.get('/api/posts', async (req, res) => {
  const posts = await Post.find().sort({ _id: -1 });
  res.json(posts);
});

app.post('/api/posts/:id/like', async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes++;
  await post.save();
  res.json(post);
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
