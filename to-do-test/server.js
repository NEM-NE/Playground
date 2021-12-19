const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/index.js');

const PORT = 8080;

const app = express();

mongoose.connect(
  'mongodb://root:!2Dlatjdqls@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
  { useNewUrlParser: true, dbName: 'TDD' },
)
  .then(() => console.log('success DB'))
  .catch((err) => console.error(err));

app.use(express.json({ extends: true }));

app.use('/api/product', productRoutes);

app.use((error, req, res) => {
  res.status(500).json({ message: error.message });
});

app.listen(PORT, () => {
  console.log('Success!');
});
