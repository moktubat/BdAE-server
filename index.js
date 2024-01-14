const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const nodeMailer = require("./nodeMailer");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.odqhq4i.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const usersCollection = client.db("bdaeDb").collection("users");
    const visitorUsersCollection = client.db("bdaeDb").collection("visitorUsers");
    const exhibitorUsersCollection = client.db("bdaeDb").collection("exhibitorUsers");
    const subscribesCollection = client.db("bdaeDb").collection("subscribes");
    // USER GET request handler
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // USER POST request handler
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "User already exists" });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // Visitor Users GET request handler
    app.get("/visitorUsers", async (req, res) => {
      const result = await visitorUsersCollection.find().toArray();
      res.send(result);
    });

    // Visitor Users POST request handler
    app.post("/visitorUsers", async (req, res) => {
      const visitorUser = req.body;
      const result = await visitorUsersCollection.insertOne(visitorUser);
    
      try {
        await nodeMailer.sendWelcomeEmail(
          visitorUser.visitorEmail,
          visitorUser.visitorTitle,
          visitorUser.visitorLastName
        );
        res.send(result);
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
      }
    });

    // Visitor Users GET request handler
    app.get("/exhibitorUsers", async (req, res) => {
      const result = await exhibitorUsersCollection.find().toArray();
      res.send(result);
    });

    // Visitor Users POST request handler
    app.post("/exhibitorUsers", async (req, res) => {
      const visitorUser = req.body;
      const result = await exhibitorUsersCollection.insertOne(visitorUser);
      res.send(result);
    });

    // Subscribes GET request handler
    app.get("/subscribes", async (req, res) => {
      const result = await subscribesCollection.find().toArray();
      res.send(result);
    });
    
    // Subscribes POST request handler
    app.post("/subscribes", async (req, res) => {
        const newsletter = req.body;
        const result = await subscribesCollection.insertOne(newsletter);
        res.send(result);
      });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
