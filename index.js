const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db("petadopt");
    const petCollection = db.collection("allpet");
    const petAdopt = db.collection("adoptpet");

    app.post("/allpet", async (req, res) => {
      const petData = req.body;
      const result = await petCollection.insertOne(petData);
      res.json(result);
    });
    app.get("/allpet", async (req, res) => {
      const result = await petCollection.find().toArray();
      res.send(result);
    });

    app.get("/allpet/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await petCollection.findOne(query);
      res.send(result);
    });

    app.get("/allpet/user/:userId", async (req, res) => {
      const userId = req.params.userId;
      const query = { userId: userId };

      const result = await petCollection.find(query).toArray();
      res.json(result);
    });

    app.delete("/allpet/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };

      const result = await petCollection.deleteOne(query);
      res.send(result);
    });

    app.patch("/allpet/:id", async (req, res) => {
      const id = req.params.id;
      const updatedPet = req.body;

      const result = await petCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedPet },
      );
      res.send(result);
    });

    app.post("/adoptpet", async (req, res) => {
      const petData = req.body;
      const result = await petAdopt.insertOne(petData);
      res.json(result);
    });

    // ......

    app.get("/adoptpet", async (req, res) => {
      const result = await petAdopt.find().toArray();
      res.send(result);
    });
    app.get("/adoptpet/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await petAdopt.findOne(query);
      res.send(result);
    });

    app.get("/adoptpet/user/:userId", async (req, res) => {
      const userId = req.params.userId;
      const query = {
        userId: userId,
      };

      const result = await petAdopt.find(query).toArray();

      res.json(result);
    });

    app.get("/adoptpet/request/:id", async (req, res) => {
      const id = req.params.id;

      const query = {
        id: id,
      };

      const result = await petAdopt.find(query).toArray();
      res.json(result);
    });

    app.delete("/adoptpet/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await petAdopt.deleteOne(query);
      res.send(result);
    });

    app.patch("/adoptpet/request/:id", async (req, res) => {
      const id = req.params.id;

      const updatedData = req.body;

      const result = await petAdopt.updateMany(
        {
          id: id,
        },
        {
          $set: updatedData,
        },
      );

      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`The server is run ${port} port`);
});
