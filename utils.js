const playerModel = require("./Models/playerModel");
const axios = require("axios");
const mongoose = require("mongoose");

exports.checkCollectionExists = async (listofyears) => {
    // Wait for the connection to be fully open
    if (mongoose.connection.readyState !== 1) {
        console.log("Database connection is not ready.");
        return;
    }

    try {
        // Get list of all collections in the connected database
        const collections = await mongoose.connection.db.listCollections().toArray();

        // Check if the 'Players' collection exists
        const collectionNames = collections.map((c) => c.name);
        if (collectionNames.includes("players")) {
            console.log("The 'Players' collection exists.");
        } else {
            console.log("The 'Players' collection does not exist, creating new DB");
            listofyears.forEach((element) => {
                FetchAllPlayers(element);
            });
        }
    } catch (error) {
        console.error("Error checking collections:", error);
    }
};

async function FetchAllPlayers(season) {
    try {
        // Fetch data from the external API
        const response = await axios.get(
            `http://b8c40s8.143.198.70.30.sslip.io/api/PlayerDataTotals/query?season=${season}&pageSize=1000`
        );
        const allplayers = response.data;

        // Iterate through each player
        for (const element of allplayers) {
            // Check if the player already exists in the database
            const existingPlayer = await playerModel.findOne({
                playerName: element.playerName,
            });
            element.threePercent = Math.floor(element.threePercent*100)
            element.twoPercent = Math.floor(element.twoPercent*100)
            if (existingPlayer) {
                // Check if the season already exists in the player's seasons
                if (!existingPlayer.season.includes(element.season)) {
                    // Calculate new twoPercent and threePercent

                    let newTwoPercent =Math.floor(
                        existingPlayer.twoPercent && element.twoPercent
                            ? (existingPlayer.twoPercent * existingPlayer.season.length +
                              element.twoPercent) /
                              (existingPlayer.season.length + 1)
                            : existingPlayer.twoPercent || element.twoPercent);

                    let newThreePercent =Math.floor(
                        existingPlayer.threePercent && element.threePercent
                            ? (existingPlayer.threePercent * existingPlayer.season.length +
                              element.threePercent) /
                              (existingPlayer.season.length + 1)
                            : existingPlayer.threePercent || element.threePercent);

                    // Update the existing player's data
                    await playerModel.updateOne(
                        { playerName: element.playerName },
                        {
                            $set: {
                                age: element.age,
                                position: element.position,
                                twoPercent: newTwoPercent,
                                threePercent: newThreePercent,
                                games: element.games + existingPlayer.games,
                                team: element.team,
                                season: [...existingPlayer.season, element.season],
                                points: element.points + existingPlayer.points,
                            },
                        }
                    );
                }
            } else {
                // If the player does not exist, create a new player
                const newPlayer = new playerModel({
                    playerName: element.playerName,
                    age: element.age,
                    position: element.position,
                    twoPercent: element.twoPercent,
                    threePercent: element.threePercent,
                    games: element.games,
                    team: element.team,
                    season: [element.season],
                    points: element.points,
                });
                await newPlayer.save();
            }
        }

        console.log("Completed season ", season);
    } catch (error) {
        console.error("Error fetching and processing players:", error);
    }
}
