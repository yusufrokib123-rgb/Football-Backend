const express = require("express");
const axios = require("axios");

const router = express.Router();

// ========================================
// AXIOS CONFIG
// ========================================

const API = axios.create({

    baseURL: "https://api.football-data.org/v4",

    headers: {

        "X-Auth-Token": process.env.FOOTBALL_API_KEY

    },

    timeout: 15000

});

// ========================================
// LIVE MATCHES
// GET /api/matches
// ========================================

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

// ========================================
// ALL COMPETITIONS
// GET /api/competitions
// ========================================

router.get("/competitions", async (req, res) => {

    try {

        const response = await API.get("/competitions");

        res.json(response.data);

    }

    catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({

            success: false,

            message: "Unable to fetch competitions"

        });

    }

});
// ========================================
// LEAGUE STANDINGS
// GET /api/standings/:id
// ========================================

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

// ========================================
// TEAMS IN A COMPETITION
// GET /api/teams/:id
// ========================================

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

// ========================================
// TEAM DETAILS
// GET /api/team/:id
// ========================================

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

            message: "Unable to fetch team details"

        });

    }

});
// ========================================
// TOP SCORERS
// GET /api/scorers/:id
// ========================================

router.get("/scorers/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const response = await API.get(

            `/competitions/${id}/scorers`

        );

        res.json(response.data);

    }

    catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({

            success: false,

            message: "Unable to fetch top scorers"

        });

    }

});

// ========================================
// MATCH DETAILS
// GET /api/match/:id
// ========================================

router.get("/match/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const response = await API.get(

            `/matches/${id}`

        );

        res.json(response.data);

    }

    catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({

            success: false,

            message: "Unable to fetch match details"

        });

    }

});
// ========================================
// UPCOMING MATCHES
// GET /api/upcoming
// ========================================

router.get("/upcoming", async (req, res) => {

    try {

        // Major competitions only
        const competitions = [

            2021, // Premier League
            2014, // La Liga
            2019, // Serie A
            2002, // Bundesliga
            2015, // Ligue 1
            2001  // UEFA Champions League

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

// ========================================
// EXPORT ROUTER
// ========================================

module.exports = router;
