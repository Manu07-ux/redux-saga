const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // Import Mongoose

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Define the Mongoose Item model
const itemSchema = new mongoose.Schema({
  text: String,
  id: Number,
});

const Item = mongoose.model('Item', itemSchema);

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/items', async (req, res) => {
  const newItem = req.body;
  newItem.id = Date.now();

  try {
    const createdItem = await Item.create(newItem);
    res.json(createdItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/items/:id', async (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  try {
    const result = await Item.updateOne({ id: itemId }, updatedItem);
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  const itemId = parseInt(req.params.id);

  try {
    const result = await Item.deleteOne({ id: itemId });
    res.json({ id: itemId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

mongoose.connect('mongodb://localhost:27017/mine', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
