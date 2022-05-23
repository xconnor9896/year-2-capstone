import axios from "axios";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";
import {baseURL} from "../../server/util/authUser";

const getReport = async (reportId, userId) => {
	try {
		const token = Cookies.get("token");

		if (!reportId || !userId) throw new Error("Proper IDs not provided.");

		// console.log(userId);
		// Getting the report data.
		const res = await axios.get(
			`${baseURL}/api/v1/report/${reportId}/${userId}`,

			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!res || !res.data || !res.data.basicInfo)
			throw new Error("No result returned.");

		// Getting the responsible officer.
		const officerId = res.data.basicInfo.responsibleOfficer;

		if (!officerId) throw new Error("No officer id provided.");

		const officerRes = await axios.get(
			`${baseURL}/api/v1/user/${officerId}`,

			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const report = res.data;
		report.basicInfo.responsibleOfficer = officerRes.data;

		// console.log(report);

		return report;
	} catch (err) {
		console.error("Failed to get report with that ID.", err);
	}
};

export default getReport;
