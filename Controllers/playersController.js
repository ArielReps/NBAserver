const playerModel = require("../Models/playerModel");
const TeamModel = require("../Models/teamModel");
exports.Filter = async (req, res) => {
  const parameters = {
    position: req.body.position,
    points: req.body.points,
    threePercent: req.body.threePercent,
    twoPercent: req.body.twoPercent,
  };
  const players =await playerModel.Players
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
exports.AddTeam = async (req,res)=>{
  try {
    const { players } = req.body;

    if (!players || !Array.isArray(players) || players.length === 0) {
        return res.status(400).json({ message: "Players data is required and should be an array." });
    }

    // Create and save a new team
    const newTeam = new TeamModel({
        players: players
    });

    await newTeam.save();

    res.status(201).json({ message: "Team added successfully", team: newTeam });
} catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
}
}

exports.GetTeamById = async(req,res) =>{
  try{
  const team = await TeamModel.findById(req.params.id); 
  res.status(200).json(team);
  }catch(err)
  { 
    res.status(500).json({message:"An error occurred", error: err.message})
  }
}
exports.GetAllTeams = async(req,res)=>{
  try{
      res.status(200).json(await TeamModel.find())
  }catch(err)
  {
    res.status(500).json({message:"An error occurred", error: err.message})
  }
}
