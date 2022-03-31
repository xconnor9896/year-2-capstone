const isEmail = require("validator/lib/isEmail");

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CREATE REPORT
.post('/') 
req.body {
  user, //? The user creating the report
  incidentType,
  code,
  reportType,
  status,
  arsSelectionNumber, //? Not required
  location,
  beatOfOffense,
  domesticViolence, //? boolean
  incidentOccurredAt,
  relatedComments,
  personalInformation
} 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const createReport = async (req, res) => {
  const {
    user,
    incidentType,
    code,
    reportType,
    status,
    arsSectionNumber,
    location,
    beatOfOffense,
    domesticViolence,
    incidentOccurredAt: { from, to },
    relatedComments,
    personalInformation,
  } = req.body;

  try {
    if (!isEmail(personalInformation.email))
      return res.status(401).send("Invalid Email");
  } catch (error) {
    console.log("Error at createReport controller");
    console.log(error);
  }
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
DELETE REPORT
.delete('/:reportId') 
req.params { reportId } //? Report to be deleted
req.body { user }
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const deleteReport = async (req, res) => {
  const { reportId } = req.params;
  const { user } = req.body;

  try {
    if (user.rank !== "captain") {
      return res
        .status(403)
        .send("Please contact your captain about deleting your report");
    }

    const deleted = ReportModel.deleteOne({ reportId });

    if (deleted) {
      return res.status(200).send("Report Deleted");
    } else {
      return res.status(404).send("Report Not Found");
    }
  } catch (error) {
    console.log("Error at deleteReport");
    console.log(error);
  }
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
UPDATE REPORT
.post('/:reportId') 
req.params {reportId} //? Targets Id
req.body {user, key, input} //? updates user based off the key and input
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const updateReport = async (req, res) => {
  const { user, key, input } = req.body;
  const { reportId } = req.params;

  try {
    let report = ReportModel.findById(reportId);

    if (user.rank === "captain" || report.createdBy === user._id) {
      report[key] = input;
      report = await report.save();

      return res.status(200).json(report);
    } else {
      return res
        .status(403)
        .send("You do not have authorization to change this report");
    }
  } catch (error) {
    console.log("error at updateReport controller");
    console.log(error);
  }
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
GET REPORT
.get('/:reportId') 
req.params {reportId} //? Targets Id
req.body {user} //? User
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const getReport = async (req, res) => {
  const { reportId } = req.params;

  try {
    let report = ReportModel.findById(reportId);

    if (user.rank === "captain" || report.createdBy === user._id) {
      return res.status(200).json(report);
    } else {
      return res
        .status(403)
        .send("You do not have authorization to view this report");
    }
  } catch (error) {
    console.log("error at getReport controller");
    console.log(error);
  }
};

//! filter is verified
//! sort by tag (1 being most inportant)