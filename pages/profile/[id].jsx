import { FaRegUser, FaUpload, FaRegIdBadge, FaEye, FaPrint } from 'react-icons/fa'
import styles from "../../styles/Pages/Profile.module.scss";

export default function Profile() {
	const name = 'John Doe'
	const badgeNum = '297502'
	const rank = 'Lt.'
	const caseId = '1992197'
	const squad = 'K-9Unit'
	const squadNum = '593'

	return (
		<main className={styles.container}>
			<div className="user">
				<div className="pfp"><img src="" alt="" /></div>

				<ul>
					<li className={name}></li>
					<li className={badgeNum}></li>
					<li className={rank}></li>
					<li className={squadNum}></li>
				</ul>
			</div>
		</main>
	);
}
