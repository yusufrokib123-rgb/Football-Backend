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
// ALL TEAMS IN A COMPETITION
// GET /api/teams/:id
// ================================

router.get("/teams/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const response = await API.get(

            `/competitions/${id}/teams`

        );

        res.json(response.data);

    }

    catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({

            success: false,

            message: "Unable to fetch teams"

        });

    }

});

// ================================
// SINGLE TEAM DETAILS
// GET /api/team/:id
// ================================

router.get("/team/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const response = await API.get(

            `/teams/${id}`

        );

        res.json(response.data);

    }

    catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({

            success: false,

            message: "Unable to fetch team"

        });

    }

});

// ================================
// EXPORT ROUTER
// ================================

module.exports = router;
