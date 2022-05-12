import axios from "axios";
import Cookies from "js-cookie";

const getSquad = async (squadNumber) => {
	try {
		const token = Cookies.get("token");

		const res = await axios.get(
			`http://localhost:3000/api/v1/squad/${squadNumber}`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		return res.data;
	} catch (err) {
		console.error("Failed to get squad.", err);
		return null;
	}
};

export default getSquad;
