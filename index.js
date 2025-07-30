 import express from "express";
import cors from "cors";
import yahooFinance from "yahoo-finance2";

const app = express();
app.use(cors());

app.get("/price", async (req, res) => {
    const stock = req.query.stock;

    if (!stock) return res.status(400).json({ error: "Stock name required" });

    try {
        const result = await yahooFinance.quote(stock);
        const price = result.regularMarketPrice;
        res.json({ stock, price });
    } catch (error) {
        console.error("Yahoo error:", error.message);
        res.status(500).json({ error: "Failed to fetch price" });
    }
});

app.get("/", (req, res) => {
    res.send("Live price server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
