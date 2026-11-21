
const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect frontend
app.use(express.static(__dirname));

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Order API
app.post("/order", (req, res) => {
    const order = req.body;

    console.log("New Customer Order:");
    console.log(order);

    res.json({
        message: "Your order received successfully!",
        customer: order.name
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port " + PORT);
});
