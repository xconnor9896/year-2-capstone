import styles from "../styles/Components/Captcha.module.scss";
import { useState, useEffect, useRef } from "react";
import Input from "./Input";
import { Button } from "../proton";
import { FaCheckCircle } from "react-icons/fa";

const Captcha = ({ captchaState, setCaptchaState }) => {
	const [captchaType, setCaptchaType] = useState(null);
	const [captchaData, setCaptchaData] = useState({ eq: null, ans: null });
	const [captchaComplete, setCaptchaComplete] = useState(false);
	const [captchaFailed, setCaptchaFailed] = useState(false);

	const setComplete = () => {
		setCaptchaComplete(true);
		setCaptchaState("completed");
	};

	const setFailed = () => {
		setCaptchaFailed(true);

		setTimeout(turnOffFailure, 300);
	};

	const turnOffFailure = () => {
		setCaptchaFailed(false);
	};

	const draw = () => {
		const canvas = canvasRef.current;

		if (canvas && captchaData.str) {
			const ctx = canvas.getContext("2d");

			ctx.beginPath();
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			ctx.closePath();

			ctx.transform(1, 0, 0, 1, 0, 0);

			ctx.beginPath();

			ctx.save();

			ctx.transform(1, 0.01, 0.5, 1, 0, 0);

			ctx.font = `bolder ${16 * 4}px Courier New`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillStyle = "white";

			ctx.fillText(
				captchaData.str,
				ctx.canvas.width / 2 - 32,
				ctx.canvas.height / 2
			);

			ctx.fillRect(
				ctx.canvas.width / 4,
				ctx.canvas.height / 2 - 10,
				ctx.canvas.width / 2,
				3
			);

			ctx.restore();

			ctx.closePath();
		}
	};

	useEffect(() => {
		if (captchaType === null || captchaType === undefined) {
			let captchaPicker = ["math", "string"];
			captchaPicker =
				captchaPicker[Math.floor(Math.random() * captchaPicker.length)];

			setCaptchaType(captchaPicker);
		}

		window.onresize = () => {
			draw();
		};
	}, []);

	useEffect(() => {
		if (!(captchaType === null || captchaType === undefined)) {
			switch (captchaType) {
				case "math":
					let rand1 = Math.ceil(Math.random() * 10);
					let rand2 = Math.ceil(Math.random() * 10);

					let eq = `${rand1} + ${rand2}`;
					let ans = String(rand1 + rand2);

					setCaptchaData({ eq, ans });

					// setDataPoint("eq", String(eq));
					// setDataPoint("ans", String(ans));
					break;
				case "string":
					let inps = [
						"q",
						"w",
						"e",
						"r",
						"t",
						"y",
						"u",
						"i",
						"o",
						"p",
						"a",
						"s",
						"d",
						"f",
						"g",
						"h",
						"j",
						"k",
						"l",
						"z",
						"x",
						"c",
						"v",
						"b",
						"n",
						"m",
					];

					let str = "";

					for (let i = 0; i < 10; i++) {
						const rn = Math.random();
						str +=
							rn < 0.5
								? inps[Math.floor(Math.random() * inps.length)]
								: inps[
										Math.floor(Math.random() * inps.length)
								  ].toUpperCase();
					}

					setCaptchaData({ str });

					break;
				default:
					break;
			}
		} else {
			console.log("Captcha Loading");
		}
	}, [captchaType]);

	const canvasRef = useRef(null);

	useEffect(() => {
		draw();
	}, [canvasRef, captchaData]);

	return (
		<div className={styles.captcha}>
			<div
				className={`${styles.captchaComplete} ${
					captchaComplete && styles.completed
				}`}
			>
				<div className={styles.checkBox}>
					<div className={styles.checkSmall}></div>
					<div className={styles.checkBig}></div>
				</div>
			</div>

			<h3>Are you a robot?</h3>
			{captchaType == "math" && (
				<div className={`${styles.math} ${styles.content}`}>
					<span className={styles.title}>Solve the equation:</span>
					<span className={styles.equation}>
						{captchaData.eq ? captchaData.eq : "Loading..."}
					</span>
					<span
						className={`${styles.input} ${
							captchaFailed && styles.failed
						}`}
					>
						<Input
							tabIndex={0}
							id="answerInput"
							type="number"
							placeholder="Answer"
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();

									const aI =
										document.getElementById("mathSubmit");

									aI && aI.click();
								}
							}}
						/>
						<Button
							type="button"
							hollow
							emphasis="primary"
							compact
							noborder
							id="mathSubmit"
							onClick={() => {
								const aI =
									document.getElementById("answerInput");

								const val = aI ? aI.value : 0;

								if (
									captchaData.ans &&
									val === captchaData.ans
								) {
									setComplete();
								} else {
									setFailed();
								}
							}}
						>
							<FaCheckCircle />
						</Button>
					</span>
				</div>
			)}

			{captchaType == "string" && (
				<div className={`${styles.string} ${styles.content}`}>
					<span className={styles.title}>Type in this string:</span>

					<canvas
						ref={canvasRef}
						width={
							canvasRef.current
								? canvasRef.current.getBoundingClientRect()
										.width * 4
								: 0
						}
						height={16 * 1.5 * 4}
					/>
					<span
						className={`${styles.input} ${
							captchaFailed && styles.failed
						}`}
					>
						<Input
							tabIndex={0}
							id="stringInput"
							type="text"
							placeholder="Answer"
							spellcheck="false"
							autocomplete="off"
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();

									const aI =
										document.getElementById("stringSubmit");

									aI && aI.click();
								}
							}}
						/>
						<Button
							type="button"
							hollow
							emphasis="primary"
							compact
							noborder
							id="stringSubmit"
							onClick={() => {
								const aI =
									document.getElementById("stringInput");

								const val = aI ? aI.value : 0;

								if (
									captchaData.str &&
									val === captchaData.str
								) {
									setComplete();
								} else {
									setFailed();
								}
							}}
						>
							<FaCheckCircle />
						</Button>
					</span>
				</div>
			)}
		</div>
	);
};

export default Captcha;
