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
// ========================
// LEAGUE STANDINGS
// ========================

router.get("/standings/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const response = await axios.get(
            `https://api.football-data.org/v4/competitions/${id}/standings`,
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
            message: "Unable to fetch standings"
        });

    }

});
// ========================
// TEAMS IN A COMPETITION
// ========================

router.get("/teams/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const response = await axios.get(
            `https://api.football-data.org/v4/competitions/${id}/teams`,
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
            message: "Unable to fetch teams"
        });

    }

});
// ========================
// TEAM DETAILS
// ========================

router.get("/team/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const response = await axios.get(
            `https://api.football-data.org/v4/teams/${id}`,
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
            message: "Unable to fetch team details"
        });

    }

});
// ========================
// TOP SCORERS
// ========================

router.get("/scorers/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const response = await axios.get(
            `https://api.football-data.org/v4/competitions/${id}/scorers`,
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
            message: "Unable to fetch top scorers"
        });

    }

});
// ========================
// TEAM DETAILS
// ========================

router.get("/team/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const response = await axios.get(
            `https://api.football-data.org/v4/teams/${id}`,
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
            message: "Unable to fetch team details"
        });

    }

});

// ========================
// TOP SCORERS
// ========================

router.get("/scorers/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const response = await axios.get(
            `https://api.football-data.org/v4/competitions/${id}/scorers`,
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
            message: "Unable to fetch top scorers"
        });

    }

});

// ========================
// MATCH DETAILS
// ========================

router.get("/match/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const response = await axios.get(
            `https://api.football-data.org/v4/matches/${id}`,
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
            message: "Unable to fetch match details"
        });

    }

});
// ========================
// ALL UPCOMING MATCHES
// ========================

router.get("/upcoming", async (req, res) => {

    try {

        const competitions = [

            2021, // Premier League
            2014, // La Liga
            2019, // Serie A
            2002, // Bundesliga
            2015, // Ligue 1
            2003, // Eredivisie
            2017, // Primeira Liga
            2016, // Championship
            2013, // Brazil Serie A
            2001, // Champions League
            2000, // World Cup
            2018, // Euro
            2152  // Copa Libertadores

        ];

        const requests = competitions.map(id =>

            axios.get(

                `https://api.football-data.org/v4/competitions/${id}/matches?status=SCHEDULED`,

                {

                    headers: {

                        "X-Auth-Token": process.env.FOOTBALL_API_KEY

                    }

                }

            )

        );

        const responses = await Promise.all(requests);

        let matches = [];

        responses.forEach(response => {

            if (response.data.matches) {

                matches.push(...response.data.matches);

            }

        });

        matches.sort((a, b) =>

            new Date(a.utcDate) - new Date(b.utcDate)

        );

        res.json({

            success: true,

            count: matches.length,

            matches

        });

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({

            success: false,

            message: "Unable to fetch upcoming matches"

        });

    }

});
// ==========================================
// GET SINGLE COMPETITION
// ==========================================

router.get("/competition/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const response = await axios.get(

            `https://api.football-data.org/v4/competitions/${id}`,

            {

                headers: {

                    "X-Auth-Token": process.env.FOOTBALL_API_KEY

                }

            }

        );

        res.json(response.data);

    }

    catch (error) {

        console.error("Football API Error:");

console.error(error.response?.status);

console.error(error.response?.data);

console.error(error.message);

res.status(500).json({

    success: false,

    status: error.response?.status,

    error: error.response?.data || error.message

});
