const mongoose = require("mongoose");
const {playerSchema} = require("./playerModel")
const TeamSchema = new mongoose.Schema({
    players:
    {
        type: [playerSchema],
        require:true
    }
});

const Teams = mongoose.model("Teams", TeamSchema);
module.exports = Teams;