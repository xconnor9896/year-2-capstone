
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

const {authMiddleware} = require('../middleware/authMidware')


router.post('/', authMiddleware, createReport);
router.get('/', authMiddleware, getAllReports);


router.delete('/:reportId', authMiddleware, deleteReport);
router.get('/:reportId', authMiddleware, getReport);


router.post('/:reportId', authMiddleware, updateReport);
router.post('/verify/:reportId', authMiddleware, verifyReport);
router.post('/importance/:reportId', authMiddleware, importanceReport);


module.exports = router;



