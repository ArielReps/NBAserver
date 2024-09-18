const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true,
    },
    age:
    {
        type: Number,
    },
    position: {
        type: String,
        required: true,
    },
    
    twoPercent: {
        type: Number,
    },
    threePercent: {
        type: Number,
    },
    games:
    {
        type: Number,
    },
    team:
    {
        type: String,
    },
    season:
    {
        type: [Number],
    },
    points: {
        type: Number,
    },
});

const Players = mongoose.model("Players", playerSchema);
module.exports = Players;