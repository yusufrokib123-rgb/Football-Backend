const axios = require("axios");

const API = axios.create({

    baseURL: "https://api.football-data.org/v4",

    headers: {

        "X-Auth-Token": process.env.FOOTBALL_API_KEY

    },

    timeout: 15000

});

module.exports = API;
