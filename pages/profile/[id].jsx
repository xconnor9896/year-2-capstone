import styles from "../../styles/Pages/Profile.module.scss";

import ListReports from "../../components/ListReports";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";

import { FaInfoCircle, FaUsers } from "react-icons/fa";

import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "../../server/util/authUser";

export default function Profile({ user: currentUser, user: { _id } }) {
	const router = useRouter();
	const { id } = router.query;
	const token = Cookies.get("token");

	const [loading, setLoading] = useState(false);

	const getUser = async (userId) => {
		try {
			const res = await axios.get(
				`${baseURL(window)}/api/v1/user/${userId}`,
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);

			console.log(res.data);

			return res.data;
		} catch (err) {
			console.error(`Failed to get user with ID:`, userId, err);

			return null;
		}
	};

	const [user, setUser] = useState(null);

	useEffect(async () => {
		setLoading(true);
		setUser(await getUser(id));
		setLoading(false);
	}, []);

	if (loading || !user) return <>Loading profile...</>;

	return (
		<main className={styles.container}>
			{user && (
				<article className={styles.userInfo}>
					<header>
						<img src={user.profilePicURL} alt="PFP" />
						<h1>
							{user.rank[0].toUpperCase() +
								user.rank.slice(1, user.rank.length)}{" "}
							{user.name.lastName}
						</h1>
					</header>
					<section>
						<div className={styles.content}>
							<header>
								<h1>
									{user.rank[0].toUpperCase() +
										user.rank.slice(
											1,
											user.rank.length
										)}{" "}
									{user.name.firstName} {user.name.lastName}
								</h1>
								<h2>{user.email}</h2>
							</header>

							<div className={styles.content}>
								<p>Badge #{user.badgeNumber}</p>
								{user.squadNumber &&
								user.squadNumber.length > 0 ? (
									<>
										{user.rank === "officer" ? (
											<p>Squad #{user.squadNumber[0]}</p>
										) : (
											<p>
												Squads:
												<ul>
													{user.squadNumber.map(
														(squad, i) => {
															return (
																<li key={i}>
																	#{squad}
																	{user.squadNumber.indexOf(
																		squad
																	) <
																		user
																			.squadNumber
																			.length -
																			1 && (
																		<>,</>
																	)}
																</li>
															);
														}
													)}
												</ul>
											</p>
										)}
									</>
								) : (
									<p>
										Not assigned to a squad yet.{" "}
										{id === user._id && (
											<>
												Please ask your teacher to add
												you from their dashboard.
											</>
										)}
									</p>
								)}
							</div>
						</div>
					</section>
				</article>
			)}

			<ListReports
				currentUser={currentUser}
				userID={currentUser.rank === "captain" ? null : id}
			/>
		</main>
	);
}
