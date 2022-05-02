import axios from "axios";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";

const getReport = async (reportId, userId) => {
	try {
		const token = Cookies.get("token");

		if (!reportId || !userId) throw new Error("Proper IDs not provided.");

		// Getting the report data.
		const res = await axios.get(
			`http://localhost:3000/api/v1/report/${reportId}/${userId}`,

			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!res) throw new Error("No result returned.");

		// Getting the responsible officer.
		const officerId = res.data.basicInfo.responsibleOfficer;

		if (!officerId) throw new Error("No officer id provided.");

		const officerRes = await axios.get(
			`http://localhost:3000/api/v1/user/${officerId}`,

			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const report = res.data;
		report.basicInfo.responsibleOfficer = officerRes.data;

		console.log(report);

		return report;
	} catch (err) {
		console.error("Failed to get report with that ID.", err);
	}
};

export default getReport;
