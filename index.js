const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Store prices for each stock
let stockPrices = {};

function getRandomPriceChange() {
  return Math.floor(Math.random() * 100) - 50; // -50 to +50
}

// Every 2 sec: update all prices
setInterval(() => {
  for (let stock in stockPrices) {
    stockPrices[stock] += getRandomPriceChange();
    if (stockPrices[stock] < 1) stockPrices[stock] = 1; // minimum 1
  }
}, 2000);

app.get("/price", (req, res) => {
  const stock = (req.query.stock || "DEFAULT").toUpperCase();

  // Initialize price if not present
  if (!stockPrices[stock]) {
    stockPrices[stock] = Math.floor(Math.random() * 2000) + 100; // Random start price
  }

  res.json({ stock, price: stockPrices[stock] });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
