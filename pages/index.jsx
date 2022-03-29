import styles from "../styles/pages/Home.module.scss";
import { Button } from "../proton";
import { useState, useRef } from "react";
import {
	FaSignInAlt,
	FaUserPlus,
	FaEnvelope,
	FaLock,
	FaCheckDouble,
	FaArrowLeft,
	FaArrowRight,
	FaUser,
	FaTimes,
	FaUserShield,
	FaRegIdCard,
	FaUserGraduate,
	FaUserLock,
} from "react-icons/fa";
import Input from "../components/Input";
import { FileDrop } from "react-file-drop";

const LoginPage = ({ setState }) => {
	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(true);

		console.log("implement handleSubmit for login page...");
	};

	const [loading, setLoading] = useState(false);

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
				<Button loading={loading} type="submit" emphasis="primary">
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

		setLoading(true);

		console.log("implement handleSubmit for recovery page...");
	};

	const [loading, setLoading] = useState(false);

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

				<Button loading={loading} type="submit" emphasis="primary">
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
	const [loading, setLoading] = useState(false);
	const form = useRef(null);
	const fileMenu = useRef(null);
	const [filePreview, setFilePreview] = useState(null);
	const [isTeacher, setIsTeacher] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(true);

		console.log("implement handleSubmit for signup page...");
	};

	// FILE MENU
	const triggerFileMenu = (e) => {
		fileMenu.current.click();
	};
	const onFrameDragEnter = (e) => {};
	const onFrameDragLeave = (e) => {};
	const onFrameDrop = (e) => {};
	const onDragOver = (e) => {};
	const onDragLeave = (e) => {};
	const onDrop = (files, e) => {
		e.preventDefault();

		onFileChange({ files });
	};
	const handleInputChange = (e) => {
		const { files } = e.target;

		console.log(e.target);

		if (files.length) {
			onFileChange({ files });
		}
	};
	const onFileChange = (e) => {
		const { files } = e;
		if (files && files.length) {
			fileMenu.current.files = files;
			console.log("uploading a new file.");
			const droppedFile = fileMenu.current.files[0];
			setFilePreview(URL.createObjectURL(droppedFile));
		}
	};

	const clearFiles = () => {
		fileMenu.current.value = null;
		setFilePreview(null);

		console.log(fileMenu.current.files);
	};

	const next = () => {
		console.log(form.current);
		let newStep = step + 1;
		if (newStep < 1) newStep = 1;
		if (newStep > 3) newStep = 3;
		setStep(newStep);
	};

	const back = () => {
		console.log(form.current);
		let newStep = step - 1;
		if (newStep < 1) newStep = 1;
		if (newStep > 3) newStep = 3;
		setStep(newStep);
	};

	return (
		<>
			<div className={`${styles.section} ${styles.formContainer}`}>
				<h1>SIGN UP</h1>
				<form ref={form} className={styles.row} onSubmit={handleSubmit}>
					<div step={step} className={styles.steps}>
						<div
							className={`${styles.step} ${
								step === 1 && styles.active
							} ${styles.step1}`}
						>
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
									emphasis="secondary"
									compact
									onClick={next}
									type="button"
								>
									<FaArrowRight />
									Next
								</Button>
							</Button.Group>
						</div>

						<div
							className={`${styles.step} ${
								step === 2 ? styles.active : styles.inactive
							} ${styles.step2}`}
						>
							<input
								onChange={handleInputChange}
								ref={fileMenu}
								type="file"
								name="file"
								id="file"
								accept="image/png, image/jpeg"
								style={{ display: "none" }}
							/>

							<div className={styles.pfpArea}>
								{!filePreview ? (
									<>
										<FileDrop
											onFrameDragEnter={onFrameDragEnter}
											onFrameDragLeave={onFrameDragLeave}
											onFrameDrop={onFrameDrop}
											onDragOver={onDragOver}
											onDragLeave={onDragLeave}
											onDrop={onDrop}
										>
											<span>
												<FaUser /> Drop Profile Photo
												Image Here
											</span>
											<Button
												style={{ margin: "0 auto" }}
												hollow
												noborder
												// compact
												emphasis="primary"
												onClick={triggerFileMenu}
											>
												Or click here instead.
											</Button>
										</FileDrop>
									</>
								) : (
									<div className={styles.pfpPreview}>
										<div
											className={styles.image}
											style={{
												backgroundImage: `url(${filePreview})`,
											}}
										></div>
										<Button
											onClick={clearFiles}
											icon
											circular
											color="red"
										>
											<FaTimes />
										</Button>
									</div>
								)}
							</div>

							<div className={styles.prefix}>
								<FaUserShield />
								<select
									id="prefix"
									className={styles.prefixSelect}
									name="prefix"
								>
									<option selected disabled>
										Select Prefix
									</option>
									<option value="captain">Captain</option>
									<option value="po captain">
										PO Captain
									</option>
									<option value="police officer">
										Police Officer
									</option>
								</select>
							</div>

							<Input
								className={styles.badgeNumber}
								icon={<FaRegIdCard />}
								type="number"
								name="badgenumber"
								id="badgenumber"
								placeholder="Badge Number"
							/>

							<Button.Group>
								<Button
									emphasis="primary"
									compact
									onClick={back}
									type="button"
								>
									<FaArrowLeft />
									Back
								</Button>
								<Button
									emphasis="secondary"
									compact
									onClick={next}
									type="button"
								>
									<FaArrowRight />
									Next
								</Button>
							</Button.Group>
						</div>

						<div
							className={`${styles.step} ${
								step === 3 ? styles.active : styles.inactive
							} ${styles.step3}`}
						>
							<div className={styles.prefix}>
								<FaUserShield />
								<select
									id="prefix"
									className={styles.prefixSelect}
									name="prefix"
								>
									<option selected disabled>
										Select Squad
									</option>

									<option value="IMPLEMENT">IMPLEMENT</option>
									<option value="ME">ME</option>
								</select>
							</div>

							<Input
								icon={<FaUserGraduate />}
								type="checkbox"
								name="isTeacher"
								id="isTeacher"
								onInput={(e) => {
									setIsTeacher(!isTeacher);
								}}
								checked={isTeacher}
								label={
									<label for="isTeacher">
										Are you a teacher?
									</label>
								}
							/>

							{isTeacher && (
								<Input
									icon={<FaUserLock />}
									type="number"
									name="teacherCode"
									id="teacherCode"
									placeholder="Teacher Code"
								/>
							)}

							<Button.Group>
								<Button
									emphasis="secondary"
									compact
									onClick={back}
									type="button"
								>
									<FaArrowLeft />
									Back
								</Button>
							</Button.Group>

							<Button
								loading={loading}
								type="submit"
								emphasis="primary"
							>
								<FaUserPlus />
								Sign Up
							</Button>
						</div>
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
