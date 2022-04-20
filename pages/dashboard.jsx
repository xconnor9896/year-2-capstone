import styles from "../styles/Pages/Dashboard.module.scss";
import { Button, Card } from "../proton";
import { useState } from "react";
import { FaUser, FaPlus, FaClipboardList } from "react-icons/fa";

const exStudent = () => {
	let e = [];
	for (let i = 0; i < Math.ceil(Math.random() * 30) + 5; i++) {
		e.push({
			name: `${["John", "Jane"][Math.floor(Math.random() * 2)]} ${
				["Doe", "Apple"][Math.floor(Math.random() * 2)]
			}`,
			studentID: `${Math.floor(Math.random() * 10)}${Math.floor(
				Math.random() * 10
			)}${Math.floor(Math.random() * 10)}`,
		});
	}

	return e;
};

const TeacherDashboard = () => {
	const [loading, setLoading] = useState(false);

	// Temporary local variables. Should be replaced with server getters.
	const isCaptain = true;
	const students = [...exStudent()];

	return (
		<main className={styles.container}>
			<article className={styles.main}>
				<Card noborder loading={loading}>
					<Card.Header>
						<div className={styles.header}>
							<h1>Dashboard</h1>
						</div>
					</Card.Header>

					<div className={styles.content}>
						<div className={styles.message}>
							<h1>Welcome back, [title] [firstname]!</h1>
						</div>

						<div className={styles.inputs}>
							<Button emphasis="primary">
								<FaUser />
								My Profile
							</Button>
							{!isCaptain && (
								<>
									<Button emphasis="primary">
										<FaPlus />
										Create New Report
									</Button>
								</>
							)}
							{isCaptain && (
								<>
									<Button emphasis="primary">
										<FaClipboardList />
										View All Reports
									</Button>
								</>
							)}
						</div>

						{isCaptain && (
							<div className={styles.students}>
								<div className={styles.header}>
									<h1>Your Students</h1>
								</div>
								<div className={styles.studentsList}>
									{students.map((student) => {
										const { name, studentID } = student;

										return (
											<div
												className={styles.student}
												key={studentID}
											>
												<div className={styles.info}>
													<div
														className={styles.pfp}
													></div>
													<div
														className={styles.data}
													>
														<span>{name}</span>
														<span>{studentID}</span>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						)}
					</div>
				</Card>
			</article>
		</main>
	);
};


import { FaRegUser, FaUpload, FaRegIdBadge, FaEye, FaPrint } from 'react-icons/fa'

const StudentDashboard = () => {
  const name = 'John'
  const rank = 'Lt.'
  const caseId = '1992197'

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.profile}>
          <h1 className={styles.title}>Welcome Back!</h1>
          <h2 className={styles.name}>{rank} {name}!</h2>
          <div className={styles.iconC}>
            <FaRegUser className={styles.icon} />
          </div>
          <span className={styles.name2}>{rank} {name}</span>
          <div className={styles.buttons}>
            <div className={styles.btn}>
              <FaUpload className={styles.label} />
              <button className={styles.newReport}> Make a new report</button>
            </div>
            <div className={styles.btn}>
              <FaRegIdBadge className={styles.label} />
              <button className={styles.profileBtn}> My Profile</button>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.cases}>
          <div className={styles.top}>
            <h1>Recent Cases</h1>
            <input className={styles.search} type="search" name="case" id="case" />
          </div>
          <div className={styles.recent}>
            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>
          </div>

          <div className={`${styles.top} ${styles.top2}`}>
            <h1>Archived Cases</h1>
            <input className={styles.search} type="search" name="case" id="case" />
          </div>

          <div className={styles.archived}>
            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>

            <div className={styles.case}>
              <div className={styles.left}>
                <span className={styles.title}>{caseId}</span>
              </div>
              <div className={styles.right}>
                <button className={`${styles.view} ${styles.btn}`}><FaEye /> View</button>
                <button className={`${styles.print} ${styles.btn}`}><FaPrint /> Print</button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}


const Dashboard = () => {
  const teacher = false

  return teacher ? <TeacherDashboard /> : <StudentDashboard/>
}

export default Dashboard