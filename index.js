const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c12imjm.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
      try {
            const serviceCollection = client.db("serviceReviewdb").collection("services");

            app.get('/services', async (req, res) => {
                  const query = {};
                  const cursor = serviceCollection.find(query);
                  const services = await cursor.toArray();
                  res.send(services)
            })
      }
      finally {

      }

}
run().catch(err => console.error(err))




app.get('/', (req, res) => {
      res.send('Review server is working')
})

app.listen(port, () => {
      console.log(`Review server running on port ${port}`)
})