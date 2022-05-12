const ReportModel = require("../models/ReportModel");
const UserModel = require("../models/UserModel");
const Number = require("../models/Number");
const jwt = require("jsonwebtoken"); // This isnt done just a structure

const isEmail = require("validator/lib/isEmail");
const PeopleModel = require("../models/PeopleModel");

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

		if (!user) {
			return res.status(404).send("No user with the given Id");
		}

		let curNum = await Number.find({});
		curNum = curNum[0];

		const report = new ReportModel({
			caseNumber: curNum.number++,
			basicInfo: {
				responsibleOfficer: userId,
				importance: 3,
				verified: false,
			},
		});

		await curNum.save();
		await report.save();

		return res.status(200).json(report);
	} catch (error) {
		console.log(error);
		return res.status(400).send("Error at createReport controller");
	}
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
DELETE REPORT
.delete('/:reportId') 
req.params { reportId } //? Report to be deleted
req.body { userId }
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const deleteReport = async (req, res) => {
	const { reportId } = req.params;
	const { userId } = req.body;

	try {
		const user = await UserModel.findById(userId);
		if (!user) {
			return res.status(404).send("user not found!");
		}

		const report = await ReportModel.findById(reportId);
		if (
			user.rank === "captain" ||
			(user._id === report.responsibleOfficer && !report.verified)
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
				.send("Please contact a captain about deleting this report");
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
	const { userId, report } = req.body;
	// const { userId, keys, inputs } = req.body;
	const { reportId } = req.params;

	// Check that necessary values exist.
	if (!reportId) return res.status(400).send("No reportId in params.");
	if (!userId) return res.status(400).send("No userID in body.");
	if (!report) return res.status(400).send("No new report in body.");

	try {
		// Confirm user exists.
		const user = await UserModel.findById(userId);
		if (!user) {
			return res.status(404).send("User with that ID does not exist.");
		}

		// Confirm existing report.
		const oldReport = await ReportModel.findById(reportId);

		if (!oldReport) {
			return res.status(404).send("Report with that ID does not exist.");
		}

		// Confirm user authorization.
		if (user.rank === "captain")
			return res.status(401).send("Officers cannot edit reports.");

		if (oldReport.basicInfo.responsibleOfficer.toString() !== userId)
			return res
				.status(401)
				.send("Only the creator of this report can edit it.");

		// Update people.
		const people = report.peopleInfo;
		const validatedPeople = [];

		for (let person of people) {
			const juvenile = person.age < 18;
			delete person._id;

			const serverSupportedPerson = new PeopleModel({
				...person,
				juvenile,
			});

			// console.log(serverSupportedPerson);

			const invalid = serverSupportedPerson.validateSync((err) => {
				if (err) {
				}
				console.log("no error");
			});

			if (!!invalid === true)
				return res.status(400).send("Fill out required fields.");

			// (err) => {
			// 	console.error(err);
			// }

			validatedPeople.push(serverSupportedPerson);
		}

		report.peopleInfo = validatedPeople;

		// console.log(report.peopleInfo);

		// Check new report against model.
		// const newReportValid = await ReportModel.

		await ReportModel.findByIdAndUpdate(reportId, report);

		return res.status(200).send("Report saved!");

		// Update existing report.
	} catch (err) {
		console.error(err);
		return res.status(400).send("Unknown error at updateReport controller");
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

		if (!report) return res.status(404).send("That report doesn't exist.");

		if (
			user.rank === "captain" ||
			report.basicInfo.responsibleOfficer.toString() == userId
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
//? userId - your user object
//? targetId - targets reports - leave blank to get all reports (captains only)
//? verified - filters out verified and unverified based on true and false - optional
//? sort - sorts based on a number given - 1 : newest to oldest (default) - 2 : oldest to newest - 3 : urgent to least urgent - 4 : least urgent to urgent - 5 : medium urgent first - optional
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const getAllReports = async (req, res) => {
	const { userId, targetId, verified, sort } = req.body;

	try {
		const user = await UserModel.findById(userId);

		if (!targetId) {
			if (user.rank === "captain") {
				let reports = await ReportModel.find({}).sort({
					createdAt: -1,
				});

				if (sort === 1 || !sort) {
					reports = await ReportModel.find({}).sort({
						createdAt: -1,
					});
				} else if (sort === 2) {
					reports = await ReportModel.find({}).sort({
						createdAt: 1,
					});
				} else if (sort === 3) {
					reports = reports.sort(
						(a, b) => a.importance - b.importance
					);
				} else if (sort === 4) {
					reports = reports.sort(
						(a, b) => b.importance - a.importance
					);
				} else if (sort === 5) {
					let temp = reports.filter(
						(report) => report.basicInfo.importance === 2
					);
					temp.push(
						...reports
							.filter(
								(report) => report.basicInfo.importance !== 2
							)
							.sort((a, b) => a.importance - b.importance)
					);
					reports = temp;
				}

				if (verified === true) {
					reports = reports.filter(
						(report) => report.verified === true
					);
				} else if (verified === false) {
					reports = reports.filter(
						(report) => report.verified === false
					);
				}

				return res.status(200).json(reports);
			} else {
				return res
					.status(403)
					.send(
						"You do not have authorization to view these reports"
					);
			}
		} else {
			if (user.rank === "captain" || targetId === user._id) {
				let reports = ReportModel.find({
					responsibleOfficer: { targetId },
				}).sort({ createdAt: -1 });

				if (sort === 1 || !sort) {
					reports = await ReportModel.find({
						responsibleOfficer: { targetId },
					}).sort({ createdAt: -1 });
				} else if (sort === 2) {
					reports = await ReportModel.find({
						responsibleOfficer: { targetId },
					}).sort({ createdAt: 1 });
				} else if (sort === 3) {
					reports = reports.sort(
						(a, b) => a.importance - b.importance
					);
				} else if (sort === 4) {
					reports = reports.sort(
						(a, b) => b.importance - a.importance
					);
				} else if (sort === 5) {
					let temp = reports.filter(
						(report) => report.basicInfo.importance === 2
					);
					temp.push(
						...reports
							.filter(
								(report) => report.basicInfo.importance !== 2
							)
							.sort((a, b) => a.importance - b.importance)
					);
					reports = temp;
				}

				if (verified === true) {
					reports = reports.filter(
						(report) => report.verified === true
					);
				} else if (verified === false) {
					reports = reports.filter(
						(report) => report.verified === false
					);
				}

				return res.status(200).json(reports);
			} else {
				return res
					.status(403)
					.send(
						"You do not have authorization to view these reports"
					);
			}
		}
	} catch (error) {
		console.log(error);
		return res.status(400).send("error at getAllReports controller");
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

			if (!report)
				return res.status(404).send(`That report doesn't exist.`);

			report.basicInfo.verified = !report.basicInfo.verified;

			if (report.basicInfo.verified) {
				report.ApprovedBy = `${userId}`;
			} else {
				report.ApprovedBy = "";
			}

			await report.save();

			res.status(200).send(
				`Report ${
					report.basicInfo.verified ? "verified" : "unverified"
				}`
			);
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
		if (!userId || !importance)
			return res.status(403).send("Required body data not sent.");

		const user = await UserModel.findById(userId);
		if (!user) return res.status(404).send("user not found!");

		let report = await ReportModel.findById(reportId);
		if (user.rank === "captain" || report.createdBy._id === user._id) {
			switch (importance) {
				case "normal":
					report.basicInfo.importance = 3;
					break;
				case "important":
					report.basicInfo.importance = 2;
					break;
				case "urgent":
					report.basicInfo.importance = 1;
					break;
				case "3":
					report.basicInfo.importance = 3;
					break;
				case "2":
					report.basicInfo.importance = 2;
					break;
				case "1":
					report.basicInfo.importance = 1;
					break;
				default:
					return res
						.status(400)
						.send(
							`The level of importance ${importance} does not exist`
						);
			}

			await report.save();
			return res
				.status(200)
				.send(`Report urgency changed to ${report.basicInfo.urgency}`);
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
