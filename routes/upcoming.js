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
// UPCOMING MATCHES
// GET /api/upcoming
// ================================

router.get("/upcoming", async (req, res) => {

    try {

        const competitions = [

            2021, // Premier League
            2014, // La Liga
            2019, // Serie A
            2002, // Bundesliga
            2015, // Ligue 1
            2003, // Eredivisie

        ];

        const requests = competitions.map(id =>

            API.get(

                `/competitions/${id}/matches?status=SCHEDULED`

            )

        );

        const responses = await Promise.all(requests);

        let matches = [];

        responses.forEach(response => {

            if (response.data.matches) {

                matches.push(...response.data.matches);

            }

        });

        matches.sort(

            (a, b) => new Date(a.utcDate) - new Date(b.utcDate)

        );

        res.json({

            success: true,

            count: matches.length,

            matches

        });

    }

    catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({

            success: false,

            message: "Unable to fetch upcoming matches"

        });

    }

});

// ================================
// EXPORT ROUTER
// ================================

module.exports = router;
