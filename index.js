const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const rooms = require("./rooms.json");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m8idumu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const roomsCollection = client.db("expressHotel").collection("rooms");
    app.get("/rooms", async (req, res) => {
      const query = {};
      const cursor = roomsCollection.find(query);
      const rooms = await cursor.toArray();
      res.send(rooms);
    });
    app.get("/room/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const room = await roomsCollection.findOne(query);
      res.send(room);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("express hotel api is running");
});
app.listen(port, () => {
  console.log("express hotel server is running on port: ", port);
});
