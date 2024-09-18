const playerModel = require("../Models/playerModel");

exports.Filter = async (req, res) => {
  const parameters = {
    position: req.body.position,
    points: req.body.points,
    threePercent: req.body.threePercent,
    twoPercent: req.body.twoPercent,
  };
  const players =await playerModel
    .where("position")
    .equals(parameters.position)
     .where("points")
     .gte(parameters.points)
      .where("threePercent")
     .gte(parameters.threePercent)
     .where("twoPercent")
    .gte(parameters.twoPercent)
    .exec()
    .then(players => {
      res.status(200).json(players); // Send the resulting player data as JSON
    })
    .catch(error => {
      res.status(500).json({ error: error.message }); // Handle errors
    });

    res.status(200).json(players);
    
};
