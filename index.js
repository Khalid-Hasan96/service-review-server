const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
      res.send('Review server is working')
})

app.listen(port, () => {
      console.log(`Review server running on port ${port}`)
})