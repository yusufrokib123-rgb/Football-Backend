const express = require("express");

const API = require("../config/api");

const router = express.Router();

// ================================
// LIVE MATCHES
// GET /api/matches
// ================================

router.get("/matches", async (req, res) => {

    try {

        const response = await API.get("/matches");

        res.json(response.data);

    }

    catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({

            success: false,

            message: "Unable to fetch matches"

        });

    }

});

// ================================
// EXPORT ROUTER
// ================================

module.exports = router;
