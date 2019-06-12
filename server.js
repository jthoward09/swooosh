const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/swoosh/index.html");
});

app.use(bodyParser.json());
app.use(express.static(__dirname + "/swoosh/index.html"));

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
