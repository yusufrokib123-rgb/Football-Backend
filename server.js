require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ================================
// MIDDLEWARE
// ================================

app.use(cors());

app.use(express.json());

// ================================
// ROUTES
// ================================

app.use("/api", require("./routes/matches"));

// ================================
// HOME ROUTE
// ================================

app.get("/", (req, res) => {

    res.send("⚽ Football Backend API is running successfully!");

});

// ================================
// 404 HANDLER
// ================================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route not found"

    });

});

// ================================
// ERROR HANDLER
// ================================

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({

        success: false,

        message: "Internal Server Error"

    });

});

// ================================
// START SERVER
// ================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});
