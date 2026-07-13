const express = require("express");
const axios = require("axios");

const router = express.Router();

// ================================
// AXIOS CONFIG
// ================================

const API = axios.create({

    baseURL: "https://api.football-data.org/v4",

    headers: {

        "X-Auth-Token": process.env.FOOTBALL_API_KEY

    },

    timeout: 15000

});

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
