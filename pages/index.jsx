import styles from "../styles/pages/Home.module.scss";
import { Button } from "../proton";
import { useState } from "react";
import {
	FaSignInAlt,
	FaUserPlus,
	FaEnvelope,
	FaLock,
	FaCheckDouble,
	FaArrowLeft,
	FaArrowRight,
	FaRegCircle,
	FaRegDotCircle,
} from "react-icons/fa";
import Input from "../components/Input";

const LoginPage = ({ setState }) => {
	const handleSubmit = (e) => {
		e.preventDefault();

		console.log("implement handleSubmit for login page...");
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<h1>LOGIN</h1>
				<Input
					required
					icon={<FaEnvelope />}
					type="email"
					name="email"
					id="email"
					placeholder="Email"
				/>

				<Input
					required
					icon={<FaLock />}
					type="password"
					name="password"
					id="password"
					placeholder="Password"
				/>
				<Button type="submit" emphasis="primary">
					<FaSignInAlt />
					Login
				</Button>
			</form>

			<div className={styles.section}>
				<div className={styles.reRoute}>
					<p>New around here?</p>
					<Button
						compact
						emphasis="secondary"
						onClick={() => setState("sign_up")}
					>
						<FaUserPlus />
						Sign Up
					</Button>
				</div>
				<Button
					compact
					emphasis="secondary"
					onClick={() => setState("recovery")}
				>
					Forgot Password?
				</Button>
			</div>
		</>
	);
};

const RecoveryPage = ({ setState }) => {
	const handleSubmit = (e) => {
		e.preventDefault();

		console.log("implement handleSubmit for recovery page...");
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<h1>RECOVER PASSWORD</h1>
				<Input
					required
					icon={<FaEnvelope />}
					type="email"
					name="email"
					id="email"
					placeholder="Email"
				/>

				<Button type="submit" emphasis="primary">
					<FaLock />
					Submit
				</Button>
			</form>

			<div className={styles.section}>
				<Button
					compact
					emphasis="secondary"
					onClick={() => setState("login")}
				>
					<FaArrowLeft />
					Back to Login
				</Button>
			</div>
		</>
	);
};

const SignUpPage = ({ setState }) => {
	const [step, setStep] = useState(1);

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log("implement handleSubmit for signup page...");
	};

	return (
		<>
			<div className={styles.section}>
				<form onSubmit={handleSubmit} step={step}>
					<h1>SIGN UP</h1>
					<div className={`${styles.step} ${styles.step1}`}>
						<Input
							icon={<FaEnvelope />}
							type="email"
							name="email"
							id="email"
							placeholder="Email"
						/>

						<Input
							icon={<FaLock />}
							type="text"
							name="password"
							id="password"
							placeholder="Password"
						/>
						<Input
							icon={<FaCheckDouble />}
							type="text"
							name="password-confirm"
							id="password-confirm"
							placeholder="Confirm Password"
						/>

						<Button.Group>
							<Button
								type="submit"
								emphasis="secondary"
								compact
								onClick={() => setStep(2)}
							>
								<FaArrowRight />
								Next
							</Button>
						</Button.Group>
					</div>

					<div className={`${styles.step} ${styles.step2}`}>
						<p>PROFILE PICTURE</p>
						<p>PREFIX DROPDOWN</p>
						<p>STUDENT ID (BADGE NUMBER)</p>

						<Button.Group>
							<Button
								type="submit"
								emphasis="primary"
								compact
								onClick={() => setStep(1)}
							>
								<FaArrowLeft />
								Back
							</Button>
							<Button
								type="submit"
								emphasis="secondary"
								compact
								onClick={() => setStep(3)}
							>
								<FaArrowRight />
								Next
							</Button>
						</Button.Group>
					</div>

					<div className={`${styles.step} ${styles.step3}`}>
						<p>SQUAD</p>
						<p>RANK</p>

						<Button.Group>
							<Button
								type="submit"
								emphasis="secondary"
								compact
								onClick={() => setStep(2)}
							>
								<FaArrowLeft />
								Back
							</Button>
						</Button.Group>

						<Button type="submit" emphasis="primary">
							<FaUserPlus />
							Sign Up
						</Button>
					</div>
				</form>

				<div className={styles.radios}>
					<Button.Group split>
						<Button
							onClick={() => setStep(1)}
							icon
							circular
							hollow
							noborder
							color="white"
						>
							<div
								className={`${styles.radio} ${
									step === 1 && styles.filled
								}`}
							></div>
						</Button>

						<Button
							onClick={() => setStep(2)}
							icon
							circular
							hollow
							noborder
							color="white"
						>
							<div
								className={`${styles.radio} ${
									step === 2 && styles.filled
								}`}
							></div>
						</Button>

						<Button
							onClick={() => setStep(3)}
							icon
							circular
							hollow
							noborder
							color="white"
						>
							<div
								className={`${styles.radio} ${
									step === 3 && styles.filled
								}`}
							></div>
						</Button>
					</Button.Group>
				</div>
			</div>

			<div className={styles.reRoute}>
				<p>Already a user?</p>
				<Button
					compact
					emphasis="secondary"
					onClick={() => setState("login")}
				>
					<FaSignInAlt />
					Login
				</Button>
			</div>
		</>
	);
};

export default function Home() {
	const [state, setState] = useState("login");

	return (
		<main className={styles.container}>
			<article className={styles.main}>
				<aside>
					<h1>
						{(state === "login" || state === "sign_up") && (
							<span>
								Welcome
								{state === "login" && " Back"}!
							</span>
						)}

						{state === "login" && (
							<span>
								Ready to make a new <b>report</b>?
							</span>
						)}

						{state === "recovery" && (
							<span>
								Password <b>Recovery</b>
							</span>
						)}

						{state === "login" && (
							<span>
								<p>
									please <b>login</b>
								</p>
							</span>
						)}

						{state === "sign_up" && (
							<span>
								<p>
									<b>sign up</b> to get started.
								</p>
							</span>
						)}
					</h1>
				</aside>
				<section>
					<div className={styles.lpsLogo}>
						<img alt="LPS Logo" src="./LPS Logo.svg" />
					</div>
					{state === "login" ? (
						<LoginPage {...{ setState }} />
					) : state === "sign_up" ? (
						<SignUpPage {...{ setState }} />
					) : (
						<RecoveryPage {...{ setState }} />
					)}
				</section>
			</article>
		</main>
	);
}
