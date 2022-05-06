const router = require(`express`).Router();

const {
  createSquad,
  deleteSquad,
  getSquad,
  addToSquad,
  changeSquadName,
  removeFromSquad,
} = require("../controllers/squad");

router.route('/:squadNumber').get(getSquad).post(addToSquad).delete(deleteSquad)
router.route('/').post(createSquad)
router.route('/name/:squadNumber').post(changeSquadName)
router.route('/remove/:squadNumber').post(removeFromSquad)

module.exports = router;