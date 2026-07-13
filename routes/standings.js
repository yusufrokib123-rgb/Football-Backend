const express = require("express");

const API = require("../config/api");

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
// LEAGUE STANDINGS
// GET /api/standings/:id
// ================================

router.get("/standings/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const response = await API.get(

            `/competitions/${id}/standings`

        );

        res.json(response.data);

    }

    catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({

            success: false,

            message: "Unable to fetch standings"

        });

    }

});

// ================================
// EXPORT ROUTER
// ================================

module.exports = router;
