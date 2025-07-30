const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

let price = 25000;

setInterval(() => {
  const change = Math.floor(Math.random() * 200) - 100;
  price = Math.max(1, price + change);
}, 2000);

app.get("/price", (req, res) => {
  res.json({ price });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
