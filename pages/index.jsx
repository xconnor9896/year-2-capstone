import styles from "../styles/pages/Home.module.scss";
import { Button } from "../proton";
import { useState } from "react";
import { FaSignInAlt, FaUserPlus, FaUser, FaLock } from "react-icons/fa";
import Input from "../components/Input";

const LoginPage = ({ setLogin }) => {
	const handleSubmit = (e) => {
		e.preventDefault();

		console.log("implement handleSubmit for login page...");
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Input
					icon={<FaUser />}
					type="text"
					name="username"
					id="username"
					placeholder="Username"
				/>

				<Input
					icon={<FaLock />}
					type="password"
					name="password"
					id="password"
					placeholder="Password"
				/>
				<Button type="submit" emphasis="primary">
					<FaSignInAlt />
					Log In
				</Button>
			</form>
			<div className={styles.reRoute}>
				<p>New around here?</p>
				<Button
					compact
					emphasis="secondary"
					onClick={() => setLogin(false)}
				>
					<FaUserPlus />
					Sign Up
				</Button>
			</div>
		</>
	);
};
const SignUpPage = ({ setLogin }) => {
	return (
		<>
			<p>SIGNUP PAGE</p>
			<div className={styles.reRoute}>
				<p>Already a user?</p>
				<Button
					compact
					emphasis="secondary"
					onClick={() => setLogin(true)}
				>
					<FaSignInAlt />
					Login
				</Button>
			</div>
		</>
	);
};

export default function Home() {
	const [login, setLogin] = useState(true);

	return (
		<main className={styles.container}>
			<article className={styles.main}>
				<aside>
					<h1>
						<span>Welcome{login && " Back"}!</span>

						{login && (
							<span>
								Ready to make a new <b>report</b>?
							</span>
						)}

						<span>
							{login ? (
								<p>
									please <b>login</b>
								</p>
							) : (
								<p>
									<b>sign up</b> to get started.
								</p>
							)}
						</span>
					</h1>
				</aside>
				<section>
					<div className={styles.lpsLogo}>
						<img alt="LPS Logo" src="./LPS Logo.svg" />
					</div>
					{login ? (
						<LoginPage {...{ setLogin }} />
					) : (
						<SignUpPage {...{ setLogin }} />
					)}
				</section>
			</article>
		</main>
	);
}
