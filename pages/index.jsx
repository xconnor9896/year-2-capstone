// import {sendPassResetEmail} from "../server/controllers/emailCon"
import styles from "../styles/pages/Home.module.scss";
import { Button } from "../proton";
import { useState, useRef, useEffect } from "react";
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
  FaRegIdCard,
  FaUserGraduate,
  FaUserLock,
  FaExclamationTriangle,
} from "react-icons/fa";
import Input from "../components/Input";
import { FileDrop } from "react-file-drop";
import Captcha from "../components/Captcha";
import axios from "axios";
import { setToken } from "./util/authUser";
import { useRouter } from "next/router";

const LoginPage = ({ setState }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const formElems = document.getElementById("loginForm").elements;

      const email = formElems[0].value;
      const password = formElems[1].value;

      if (!email || !password) throw "Email + Password must be provided.";

      // send the data to the server
      const response = await axios
        .post("http://localhost:3000/api/v1/user/login", {
          email,
          password,
        })
        .then((res) => {
          setToken(res.data);
          router.push("/dashboard");
          setLoading(false);
          // setState(res.data);
        })
        .catch((err) => {
          throw err;
          // setLoading(false);
        });
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response.data ? err.response.data : err);
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="loginForm">
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
        <Button
          className="fancy"
          loading={loading}
          type="submit"
          emphasis="primary"
        >
          <FaSignInAlt />
          Login
        </Button>

        {errorMessage && (
          <p className={styles.errorMessage}>
            <FaExclamationTriangle /> {errorMessage}
          </p>
        )}
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
	let baseURL = "http://localhost:3000";
	const [inputEmail, setEmail] = useState("");

  const handleChange = async (e) => {
    const { value } = e.target;

    setEmail(value);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(`${baseURL}/api/v1/email/reset`, {
        inputEmail: inputEmail,
      })
      .then((response) => {
        if (response.data != null) {
          alert("The email has been sent go and check your spam");
        } else {
          alert(
            "Sorry Something has gone wrong make sure you put in the right email"
          );
		}
		setLoading(false)
	  });
	  setLoading(false)
  };

  const [loading, setLoading] = useState(false);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>RECOVER PASSWORD</h1>
        <Input
          onChange={handleChange}
          icon={<FaEnvelope />}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />

        <Button
          className="fancy"
          loading={loading}
          type="submit"
          emphasis="primary"
        >
          <FaLock />
          Submit
        </Button>
      </form>

      <div className={styles.section}>
        <Button compact emphasis="secondary" onClick={() => setState("login")}>
          <FaArrowLeft />
          Back to Login
        </Button>
      </div>
    </>
  );
};

const SignUpPage = ({ setState }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const fileMenu = useRef(null);
  const [filePreview, setFilePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const [captchaState, setCaptchaState] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Tab") e.preventDefault();
    });
  }, []);

  const getFormData = () => {
    const formSteps = formRef.current.children[0].children;

    const [step1, step2, step3] = formSteps;

    let formInputs = [...step1.children, ...step2.children, ...step3.children];

    const formData = {
      profileImage: file ? file : null,
      captchaState,
    };

    // Get just form elements.
    for (let htmlElement of formInputs) {
      if (htmlElement.classList.contains("custom-input")) {
        const children = htmlElement.children;

        if (children.length === 2) {
          // The input is just a standard input.
          formData[children[1].id] = children[1].value;

          if (typeof children[1].value === "number")
            formData[children[1].id] = children[1].value.toString();

          continue;
        } else if (children.length === 4) {
          formData[children[3].getAttribute("for")] = children[1].getAttribute(
            "ischecked"
          );
          continue;
        } else {
          // The input is unknown, or unsupported.
          continue;
        }
      } else {
        formInputs[formInputs.indexOf(htmlElement)] = undefined;
      }
    }

    return formData;
  };

  const setErr = (val, stepC) => {
    setErrorMessage(val);
    setLoading(false);

    if (stepC) setStep(stepC);
  };

  const handleSubmit = async () => {
    if (!formRef || !formRef.current || loading) return;

    setLoading(true);

    // Reset the error message.
    setErrorMessage(null);

    // Get form data.
    const formData = getFormData();
    const {
      email,
      password,
      passwordConfirm,
      profileImage,
      badgenumber,
      isTeacher,
      teacherCode,
      captchaState,
      name,
    } = formData;

    // Validate the form clientside.

    // Validate email.
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (!email || email.length < 1) return setErr("No email provided.", 1);
    if (!emailRegex.test(email)) return setErr("Invalid email.", 1);

    // Validate password.
    if (!password || password.length < 1)
      return setErr("No password provided.", 1);
    if (password.length < 8)
      return setErr("Password must be at least 8 characters.", 1);

    // Validate password confirmation.
    if (!passwordConfirm || passwordConfirm.length < 1)
      return setErr("No password confirmation provided.", 1);
    if (password !== passwordConfirm)
      return setErr("Passwords don't match.", 1);

    // Validate badge number.
    const badgeNumRegex = /^\d{3}$/g;
    if (!badgenumber || badgenumber.length < 1)
      return setErr("No badge number provided.", 2);
    if (badgenumber.length < 3)
      return setErr("Badge number must be three characters long.", 2);
    if (!badgeNumRegex.test(badgenumber))
      return setErr("Badge number can only contain digits.", 2);

    // Validate name.
    const nameRegex = /\w+ \w+/gi;
    if (!name || name.length < 1) return setErr("No name provided.", 2);
    if (!nameRegex.test(name)) return setErr("Name not in proper format.", 2);

    // Validate teacher code.
    if (isTeacher === "true" && (!teacherCode || teacherCode.length < 1))
      return setErr("No teacher code provided.", 3);

    // Check that the captcha has been completed.
    if (captchaState !== "completed")
      return setErr("You must complete the captcha before signing up.", 3);

    const [firstName, lastName] = name.split(" ");

    formData.name = { firstName, lastName };

    // Send the data to the server.
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        formData
      );

      console.log(res.data);

      setToken(res.data);
    } catch (err) {
      console.error("Error at sign up form submission.", err);
      return setErr(err.response.data, 1);
    }

    setLoading(false);
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

    if (files.length) {
      onFileChange({ files });
    }
  };
  const onFileChange = (e) => {
    const { files } = e;
    if (files && files.length) {
      fileMenu.current.files = files;

      const droppedFile = fileMenu.current.files[0];
      setFile(droppedFile);
      setFilePreview(URL.createObjectURL(droppedFile));
    }
  };

  const clearFiles = () => {
    fileMenu.current.value = null;
    setFilePreview(null);
  };

  const next = () => {
    let newStep = step + 1;
    if (newStep < 1) newStep = 1;
    if (newStep > 3) newStep = 3;
    setStep(newStep);
  };

  const back = () => {
    let newStep = step - 1;
    if (newStep < 1) newStep = 1;
    if (newStep > 3) newStep = 3;
    setStep(newStep);
  };

  return (
    <>
      <div className={`${styles.section} ${styles.formContainer}`}>
        <h1>SIGN UP</h1>
        <form
          ref={formRef}
          className={styles.row}
          onSubmit={(e) => {
            e.preventDefault();
            // console.log("Canceled out form submission.");
          }}
        >
          <div step={step} className={styles.steps}>
            <div
              className={`${styles.step} ${step === 1 && styles.active} ${
                styles.step1
              }`}
            >
              <Input
                icon={<FaEnvelope />}
                type="string"
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
                name="passwordConfirm"
                id="passwordConfirm"
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
                        <FaUser /> Drop Profile Photo Image Here
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
                    <Button onClick={clearFiles} icon circular color="red">
                      <FaTimes />
                    </Button>
                  </div>
                )}
              </div>

              {/* <div className={styles.prefix}>
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
									<option value="police officer">
										Police Officer
									</option>
								</select>
							</div> */}

              {/* <div className={styles.squad}>
								<FaUserShield />
								<select
									id="prefix"
									className={styles.squadSelect}
									name="prefix"
								>
									<option selected disabled>
										Select Squad
									</option>

									<option value="IMPLEMENT">IMPLEMENT</option>
									<option value="ME">ME</option>
								</select>
							</div> */}

              <Input
                className={styles.badgeNumber}
                icon={<FaRegIdCard />}
                type="string"
                name="badgenumber"
                id="badgenumber"
                maxLength={3}
                placeholder="Badge Number"
              />

              <Input
                className={styles.name}
                icon={<FaRegIdCard />}
                type="string"
                name="name"
                id="name"
                placeholder="FirstName LastName"
              />

              <Button.Group>
                <Button emphasis="primary" compact onClick={back} type="button">
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
              <Input
                icon={<FaUserGraduate />}
                type="checkbox"
                name="isTeacher"
                id="isTeacher"
                onChange={(e) => {
                  setIsTeacher(!isTeacher);
                }}
                checked={isTeacher}
                label={<label htmlFor="isTeacher">Are you a captain?</label>}
              />
              {isTeacher && (
                <Input
                  icon={<FaUserLock />}
                  type="string"
                  name="teacherCode"
                  id="teacherCode"
                  placeholder="Teacher Code"
                />
              )}
              <Captcha {...{ captchaState, setCaptchaState }} />
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
                type="button"
                onClick={handleSubmit}
                emphasis="primary"
                className="fancy"
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
                className={`${styles.radio} ${step === 1 && styles.filled}`}
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
                className={`${styles.radio} ${step === 2 && styles.filled}`}
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
                className={`${styles.radio} ${step === 3 && styles.filled}`}
              ></div>
            </Button>
          </Button.Group>
        </div>
      </div>

      {errorMessage && (
        <p className={styles.signupError}>
          <FaExclamationTriangle /> {errorMessage}
        </p>
      )}

      <div className={styles.reRoute}>
        <p>Already a user?</p>
        <Button compact emphasis="secondary" onClick={() => setState("login")}>
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
