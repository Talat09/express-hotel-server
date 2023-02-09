const express = require("express");
const app = express();
const cors = require("cors");
const rooms = require("./rooms.json");
const port = process.env.PORT || 5000;
app.use(cors());
app.get("/", (req, res) => {
  res.send("express hotel api is running");
});
app.get("/rooms", (req, res) => {
  res.send(rooms);
});
app.get("/rooms/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const selectedRoom = rooms.find((r) => r.id === id);
  res.send(selectedRoom);
  console.log(selectedRoom);
});
app.listen(port, () => {
  console.log("express hotel server is running on port: ", port);
});
