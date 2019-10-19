const express = require( 'express');
const path = require ('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.resolve(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.get('/data', (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "demo.txt"));
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));