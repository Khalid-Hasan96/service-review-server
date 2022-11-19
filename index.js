const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c12imjm.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
      try {
            const serviceCollection = client.db("serviceReviewdb").collection("services");
            const reviewCollection = client.db("serviceReviewdb").collection("reviews");

            app.get('/services', async (req, res) => {
                  const query = {};
                  const cursor = serviceCollection.find(query).sort({ _id: -1 }).limit(3);
                  const services = await cursor.toArray();
                  res.send(services)
            });

            app.get('/allServices', async (req, res) => {
                  const query = {};
                  const cursor = serviceCollection.find(query).sort({ _id: -1 });
                  const services = await cursor.toArray();
                  res.send(services)
            });
            app.get('/allServices', async (req, res) => {
                  const query = {};
                  const cursor = serviceCollection.find(query);
                  const services = await cursor.toArray();
                  res.send(services)
            });
            app.post('/services', async (req, res) => {
                  const service = req.body;
                  const result = await serviceCollection.insertOne(service);
                  res.send(result)
            });
            app.get('/serviceDetails/:id', async (req, res) => {
                  const id = req.params.id;
                  const query = { _id: ObjectId(id) };
                  const result = await serviceCollection.findOne(query);
                  res.send(result);
            });



            app.get('/reviews', async (req, res) => {
                  let query = {};
                  if (req.query.serviceId) {
                        query = {
                              serviceId: req.query.serviceId
                        }
                  }
                  const cursor = reviewCollection.find(query);
                  const review = await cursor.toArray();
                  res.send(review)
            });

            app.get('/reviews/:id', async (req, res) => {
                  const id = req.params.id;
                  const query = { _id: ObjectId(id) }
                  const result = await reviewCollection.findOne(query);
                  res.send(result)
            });

            app.post('/addreviews', async (req, res) => {
                  const review = req.body;
                  const result = await reviewCollection.insertOne(review);
                  res.send(result)
            });
            app.get('/reviews', async (req, res) => {
                  let query = {};
                  const cursor = reviewCollection.find(query);
                  const review = await cursor.toArray();
                  res.send(review)
            })

            app.delete('/reviews/:id', async (req, res) => {
                  const id = req.params.id;
                  const query = { _id: ObjectId(id) };
                  const result = await reviewCollection.deleteOne(query);
                  res.send(result)
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