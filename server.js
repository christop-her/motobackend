const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let ledState = false; 


app.get("/status", (req, res) => {
    res.json({ state: ledState });
});


app.post("/toggle", (req, res) => {
    const { state } = req.body;
    if (typeof state === "boolean") {
        ledState = state;
        console.log(`LED State updated: ${ledState ? "ON" : "OFF"}`);
        res.json({ success: true, state: ledState });
    } else {
        res.status(400).json({ success: false, message: "Invalid state" });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
