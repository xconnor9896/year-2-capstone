const ReportModel = require("../models/ReportModel");
const UserModel = require("../models/UserModel");

const isEmail = require("validator/lib/isEmail");

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CREATE REPORT
.post('/') 
req.body {
  userId, //? The user creating the report
} 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const createReport = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await UserModel.findById(userId);

    console.log(userId);

    if (!user) {
      return res.status(404).send("No user with the given Id");
    }

    const report = new ReportModel({
      basicInfo: {
        responsibleOfficer: userId,
        importance: 3,
        verified: false,
      },
    });

    await report.save();

    return res.status(200).json(report);
  } catch (error) {
    // console.log(error);
    return res.status(400).send("Error at createReport controller");
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
    const report = await ReportModel.findById(reportId);
    if (
      user.rank === "captain" ||
      (user._id === report.responsibleOfficer._id && !report.verified)
    ) {
      const deleted = await ReportModel.deleteOne({ reportId });

      if (deleted) {
        return res.status(200).send("Report Deleted");
      } else {
        return res.status(404).send("Report Not Found");
      }
    } else {
      return res
        .status(403)
        .send("Please contact your captain about deleting your report");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error at deleteReport");
  }
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
UPDATE REPORT
.post('/:reportId') 
req.params {reportId} //? Targets Id
req.body {userId, keys, inputs} //? updates user based off the keys and inputs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const updateReport = async (req, res) => {
  const { userId, keys, inputs } = req.body;
  const { reportId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("user not found!");
    }

    let report = await ReportModel.findById(reportId);
    const notInclude = ["verified", "responsibleOfficer", "importance"];

    if (user.rank === "captain" || report.createdBy === user._id) {
      if (keys.length === inputs.length) {
        for (let i = 0; i < keys.length; i++) {
          if (!notInclude.includes(keys[i])) {
            report[keys[i]] = inputs[i];
            report = await report.save();
          }
        }
        return res.status(200).json(report);
      } else {
        res
          .status(400)
          .send(
            "Please make sure the number of keys matches the number of inputs"
          );
      }
    } else {
      return res
        .status(403)
        .send("You do not have authorization to change this report");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("error at updateReport controller");
  }
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
GET REPORT
.get('/:reportId/:userId') 
req.params {reportId, userId} //? Targets Id, User
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const getReport = async (req, res) => {
  const { reportId, userId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("user not found!");
    }

    const report = await ReportModel.findById(reportId);

    if (
      user.rank === "captain" ||
      report.basicInfo.responsibleOfficer === user._id
    ) {
      return res.status(200).json(report);
    } else {
      return res
        .status(403)
        .send("You do not have authorization to view this report");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("error at getReport controller");
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
        let reports = await ReportModel.find().sort({ createAt: -1 });

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
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("error at getReport controller");
  }
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Verify Report
.post('/verify/:reportId') 
req.body {userId} 
//? userId - your user object
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const verifyReport = async (req, res) => {
  const {
    params: { reportId },
    body: { userId },
  } = req;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("user not found!");
    }

    if (user.rank === "captain") {
      let report = await ReportModel.findById(reportId);
      report.verified = !report.verified;
      report.save();
      res
        .status(200)
        .send(`Report ${report.verified ? "verified" : "unverified"}`);
    } else {
      return res
        .status(403)
        .send(`You do not have authorization to verify a report`);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("error at verifyReport controller");
  }
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Importance Report
.post('/importance/:reportId') 
req.body {user, importance} 
//? userId - your user object
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const importanceReport = async (req, res) => {
  const {
    params: { reportId },
    body: { userId, importance },
  } = req;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("user not found!");
    }

    let report = await ReportModel.findById(reportId);
    if (user.rank === "captain" || report.createdBy._id === user._id) {
      switch (importance) {
        case "normal":
          report.importance = 3;
          break;
        case "important":
          report.importance = 2;
          break;
        case "urgent":
          report.importance = 1;
          break;
        case 3:
          report.importance = 3;
          break;
        case 2:
          report.importance = 2;
          break;
        case 1:
          report.importance = 1;
          break;
        default:
          report = null;
      }

      if (report !== null) {
        report.save();
        res
          .status(200)
          .send(`Report ${report.verified ? "verified" : "unverified"}`);
      } else {
        req
          .status(400)
          .send(`The level of importance ${importance} does not exist`);
      }
    } else {
      return res
        .status(403)
        .send(`You do not have authorization to verify a report`);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("error at importanceReport controller");
  }
};

module.exports = {
  createReport,
  deleteReport,
  updateReport,
  getReport,
  getAllReports,
  verifyReport,
  importanceReport,
};

// test
