
const router = require(`express`).Router();

const {
  createReport,
  deleteReport,
  updateReport,
  getReport,
  getAllReports,
  verifyReport,
  importanceReport 
  } = require(`../controllers/report`);


router.post('/', createReport);
router.get('/', getAllReports);


router.delete('/:reportId', deleteReport);
router.get('/:reportId', getReport);


router.post('/:reportId', updateReport);
router.post('/verify/:reportId', verifyReport);
router.post('/importance/:reportId', importanceReport);


module.exports = router;



