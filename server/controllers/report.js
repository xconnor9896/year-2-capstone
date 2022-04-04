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
  const { user } = req.body;

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

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
GET ALL REPORT
.get('/') 
req.body {user, userId, verified, sort} 
//? user - your user object
//? userId - targets reports - leave blank to get all reports (captains only)
//? verified - filters out verified and unverified based on true and false - optional
//? sort - sorts based on a number given - 1 : newest to oldest (default) - 2 : oldest to newest - 3 : urgent to least urgent - 4 : least urgent to urgent - 5 : medium urgent first - optional
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const getAllReports = async (req, res) => {
  const { user, userId, verified, sort } = req.body;

  try {
    if (!userId) {
      if (user.rank === "captain") {
        let reports = ReportModel.find().sort({ createAt: -1 });

        if (verified === true) {
          reports = reports.filter((report) => report.verified === true);
        } else if (verified === false) {
          reports = reports.filter((report) => report.verified === false);
        }

        if (sort === 1 || !sort) {
          reports = reports.sort({ createAt: -1 });
        } else if (sort === 2) {
          reports = reports.sort({ createAt: 1 });
        } else if (sort === 3) {
          reports = reports.sort((a, b) => a.importance - b.importance);
        } else if (sort === 4) {
          reports = reports.sort((a, b) => b.importance - a.importance);
        } else if (sort === 5) {
          let temp = reports.filter((report) => report.importance === 2);
          temp.push(
            ...reports
              .filter((report) => report.importance !== 2)
              .sort((a, b) => a.importance - b.importance)
          );
          reports = temp;
        }

        return res.status(200).json(reports);
      } else {
        return res
          .status(403)
          .send("You do not have authorization to view these reports");
      }
    } else {
      if (user.rank === "captain" || userId === user._id) {
        let reports = ReportModel.find({ responsibleOfficer: { userId } }).sort(
          { createAt: -1 }
        );

        if (verified === true) {
          reports = reports.filter((report) => report.verified === true);
        } else if (verified === false) {
          reports = reports.filter((report) => report.verified === false);
        }

        if (sort === 1  || !sort) {
          reports = reports.sort({ createAt: -1 });
        } else if (sort === 2) {
          reports = reports.sort({ createAt: 1 });
        } else if (sort === 3) {
          reports = reports.sort((a, b) => a.importance - b.importance);
        } else if (sort === 4) {
          reports = reports.sort((a, b) => b.importance - a.importance);
        } else if (sort === 5) {
          let temp = reports.filter((report) => report.importance === 2);
          temp.push(
            ...reports
              .filter((report) => report.importance !== 2)
              .sort((a, b) => a.importance - b.importance)
          );
          reports = temp;
        }

        return res.status(200).json(reports);
      } else {
        return res
          .status(403)
          .send("You do not have authorization to view these reports");
      }
    }
  } catch (error) {
    console.log("error at getReport controller");
    console.log(error);
  }
};
