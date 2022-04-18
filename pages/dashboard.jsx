import { FaRegUser, FaUpload, FaRegIdBadge, FaEye, FaPrint, FaSearch } from 'react-icons/fa'
import styles from '../styles/Pages/Dashboard.module.scss'

const Dashboard = () => {
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
            <input className={styles.search} type="search" name="case" id="case" placeholder='Search Case #'/>
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

export default Dashboard