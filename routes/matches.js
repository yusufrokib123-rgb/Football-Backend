const express = require("express");
const axios = require("axios");

const router = express.Router();

// ========================
// ALL MATCHES
// ========================

router.get("/matches", async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.football-data.org/v4/matches",
            {
                headers: {
                    "X-Auth-Token": process.env.FOOTBALL_API_KEY
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Unable to fetch matches"
        });
    }
});

// ========================
// ALL COMPETITIONS
// ========================

router.get("/competitions", async (req, res) => {
    try {

        const response = await axios.get(
            "https://api.football-data.org/v4/competitions",
            {
                headers: {
                    "X-Auth-Token": process.env.FOOTBALL_API_KEY
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Unable to fetch competitions"
        });

    }
});

module.exports = router;
