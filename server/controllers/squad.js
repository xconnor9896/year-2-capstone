const UserModel = require("../models/UserModel");
const SquadModel = require("../models/SquadModel");

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
GET SQUAD
.get('/:squadNumber') 
req.params {squadNumber} //? Target Squad
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const getSquad = async (req, res) => {
  const { squadNumber } = req.params;
  try {
    const squad = await SquadModel.findOne({ squadNumber });

    if (squad) {
      return res.status(200).json(squad);
    } else {
      return res.status(404).send("No squad with the given number");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("error at getSquad controller");
  }
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CREATE SQUAD
.post('/') 
req.body {squadNumber, userId, squadName} //? Targets userId
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const createSquad = async (req, res) => {
  const { squadNumber, userId, squadName } = req.body;
  try {
    let checkSquad = await SquadModel.find({});
    if (
      checkSquad.some(
        (squad) =>
          squad.squadName === squadName || squad.squadNumber === squadNumber
      )
    ) {
      return res
        .status(400)
        .send("Already a squad with the given name or number");
    }

    let captain = await UserModel.findById(userId);

    if (captain.rank !== "captain") {
      return req.send(403).send("sorry only captains can create a squad");
    }

    if (captain.squadNumber === 0) {
      captain.squadNumber = [];
    }

    captain.squadNumber.push(squadNumber);

    const squad = new SquadModel({
      captain: userId,
      squadName,
      squadNumber,
    });

    await squad.save();
    await captain.save();

    return res.status(200).json(squad);
  } catch (error) {
    console.log(error);
    return res.status(400).send("error at createSquad controller");
  }
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
ADD TO SQUAD
.post('/:squadNumber') 
req.body { userId } //? Officers userId
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const addToSquad = async (req, res) => {
  const {
    params: { squadNumber },
    body: { userId },
  } = req;
  try {
    let squad = await SquadModel.findOne({ squadNumber });
    let officer = await UserModel.findById(userId);

    if (captain.rank !== "officer") {
      return req.send(403).send("sorry only officers can be added to a squad");
    }

    if (officer.squadNumber) {
      let oldSquad = await SquadModel.findOne({
        squadNumber: officer.squadNumber,
      });

      oldSquad.officers.filter((id) => id !== officer._id);

      oldSquad.save();
    }

    if (squad) {
      squad.officers.push(userId);
      officer.squadNumber = squadNumber;

      await squad.save();
      await officer.save();

      return res.status(200).json(squad);
    } else {
      return res.status(404).send("No squad with the given number");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("error at getSquad controller");
  }
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
DELETE SQUAD
.delete('/:squadNumber') 
req.params { squadNumber } //? Target squad
req.body { userId } //? Your squad
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const deleteSquad = async (req, res) => {
  const { userId } = req.body;
  const { squadNumber } = req.params;

  try {
    let captain = await UserModel.findById(userId);

    if (captain.rank !== "captain") {
      return res
        .status(403)
        .send("Please contact your captain about deleting this squad");
    }

    captain.squadNumber.filter((squad) => squad !== squadNumber);

    const deleted = await SquadModel.deleteOne({ squadNumber });

    await captain.save();

    if (deleted) {
      return res.status(200).send("Squad Deleted");
    } else {
      return res.status(404).send("Squad Not Found");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("error at deleteSquad controller");
  }
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CHANGE SQUAD NAME
.post('/name/:squadNumber') 
req.params { squadNumber } //? Target squad
req.body { userId, squadName } //? your id, new squad name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const changeSquadName = async (req, res) => {
  const { userId, squadName } = req.body;
  const { squadNumber } = req.params;

  try {
    const captain = await UserModel.findById(userId);

    if (captain.rank !== "captain") {
      return res
        .status(403)
        .send("Please contact your captain about changing this squad's name");
    }

    const checkSquad = await SquadModel.findOne({ squadName });

    if (!checkSquad) {
      let squad = await SquadModel.findOne({ squadNumber });

      squad.squadName = squadName;

      await squad.save();

      return res.status(200).send("squad name updated");
    } else {
      return res.status(400).send("Squad with given name already exists");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("error at deleteSquad controller");
  }
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
REMOVE FROM SQUAD
.post('/remove/:squadNumber') 
req.params { squadNumber } //? Target squad
req.body { officerId, userId } //? Target User
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const removeFromSquad = async (req, res) => {
  const { officerId, userId } = req.body;
  const { squadNumber } = req.params;

  try {
    let officer = await UserModel.findById(officerId);
    let user 

    if(userId !== officerId){
      user = await UserModel.findById(userId);
      if(user.rank !== "captain"){
        res.status(403).send("please contact a captain about removing this user from the squad")
      }
    }



    if (officer.rank !== "officer") {
      return res
        .status(400)
        .send("Sorry you can not remove a captain from a squad");
    }

    const squad = await SquadModel.findOne({ squadNumber });

    if (squad) {
      squad.officers.filter((id) => id !== officerId);
      officer.squadNumber = 0;

      await squad.save();
      await officer.save();

      return res.status(200).send("Removed From Squad");
    } else {
      return res.status(404).send("Squad Not Found");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("error at deleteSquad controller");
  }
};
module.exports = {
  createSquad,
  deleteSquad,
  getSquad,
  addToSquad,
  changeSquadName,
  removeFromSquad
};
