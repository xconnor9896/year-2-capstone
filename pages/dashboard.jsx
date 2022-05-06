import styles from "../styles/Pages/TimsDashboard.module.scss";
import { Button, Card } from "../proton";
import { useState , useEffect} from "react";
import {
  FaUser,
  FaPlus,
  FaClipboardList,
  FaTrash,
  FaSave,
  FaUserPlus,
  FaChevronDown,
} from "react-icons/fa";
import { useRouter } from "next/router";
import Input from "../components/Input";

import { v4 as uuid } from "uuid";

const exStudent = () => {
  let e = [];
  for (let i = 0; i < Math.ceil(Math.random() * 30) + 5; i++) {
    e.push({
      name: `${["John", "Jane"][Math.floor(Math.random() * 2)]} ${["Doe", "Apple"][Math.floor(Math.random() * 2)]
        }`,
      studentID: `${Math.floor(Math.random() * 10)}${Math.floor(
        Math.random() * 10
      )}${Math.floor(Math.random() * 10)}`,
      _id: uuid(),
    });
  }

  return e;
};

const TeacherDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [addStudentDropdown, setAddStudentDropdown] = useState(false);

  // Temporary local variables. Should be replaced with server getters.
  const isCaptain = true;
  const groups = [
    {
      _id: 0,
      name: "Unnamed Group",
      students: [...exStudent()],
    },
    { _id: 1, name: "Unnamed Group 2", students: [...exStudent()] },
  ];
  const [dropdowns, setDropdowns] = useState({});
  const toggleDropdown = (dropdown) => {
    setDropdowns({ ...dropdowns, [dropdown]: !dropdowns[dropdown] });

    console.log(dropdowns);
  };

  const TEMP_addableStudents = [...exStudent()];

  const router = useRouter();

  const route = (path) => {
    router.push(path);
  };

  const updateGroup = (e, id) => {
    e.preventDefault();

    setLoading(true);

    if (!isCaptain) return;

    console.log("Hook up group management", id);

    setLoading(false);
  };

  const addGroup = () => {
    setLoading(true);

    if (!isCaptain) return;

    console.log("Hook up adding GROUPS");

    setLoading(false);
  };

  const deleteGroup = (id) => {
    setLoading(true);

    if (!isCaptain) return;

    console.log("Hook up deleting GROUPS");

    setLoading(false);
  };

  const addStudents = (e, id) => {
    e.preventDefault();

    setLoading(true);

    if (!isCaptain) return;

    console.log("Hook up adding students to group", id);

    setLoading(false);
  };

  const removeFromGroup = (id) => {
    setLoading(true);

    console.log("Hook up remove from group.", id);

    setLoading(false);
  };

  return (
    <main className={styles.container}>
      <article className={styles.main}>
        <Card dropshadow noborder loading={loading}>
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
                  <Button
                    onClick={() => route("/reports")}
                    emphasis="primary"
                  >
                    <FaClipboardList />
                    View All Reports
                  </Button>
                </>
              )}
            </div>

            {isCaptain && (
              <div className={styles.groupManagement}>
                <h1>Your Groups</h1>
                <div className={styles.groups}>
                  {groups.length < 1 && (
                    <h3 className={styles.noMsg}>
                      No Groups to Display
                    </h3>
                  )}
                  {groups.map((group) => {
                    const { _id, name, students } = group;

                    return (
                      <div
                        dropped={
                          dropdowns.hasOwnProperty(
                            _id
                          ) && dropdowns[_id] == true
                            ? "true"
                            : "false"
                        }
                        className={styles.group}
                      >
                        <header
                          onClick={() =>
                            toggleDropdown(_id)
                          }
                        >
                          <h3>{name}</h3>
                          <FaChevronDown />
                        </header>

                        <div className={styles.content}>
                          <form
                            onSubmit={(e) =>
                              updateGroup(e, _id)
                            }
                            className={styles.sect}
                            dropped={
                              dropdowns.hasOwnProperty(
                                _id +
                                "_changeGroupName"
                              ) &&
                                dropdowns[
                                _id +
                                "_changeGroupName"
                                ] == true
                                ? "true"
                                : "false"
                            }
                          >
                            <header
                              onClick={() =>
                                toggleDropdown(
                                  _id +
                                  "_changeGroupName"
                                )
                              }
                            >
                              <h3>
                                Change Group
                                Name
                              </h3>
                              <FaChevronDown />
                            </header>
                            <div
                              className={
                                styles.content
                              }
                            >
                              <Input
                                type="text"
                                placeholder="Group Name"
                                maxLength={64}
                              />
                              <Button
                                type="submit"
                                emphasis="primary"
                              >
                                <FaSave />
                                Apply Changes
                              </Button>
                            </div>
                          </form>

                          <form
                            onSubmit={(e) =>
                              addStudents(e, _id)
                            }
                            className={`${styles.addStudentForm} ${styles.sect}`}
                            dropped={
                              dropdowns.hasOwnProperty(
                                _id +
                                "_addStudentForm"
                              ) &&
                                dropdowns[
                                _id +
                                "_addStudentForm"
                                ] == true
                                ? "true"
                                : "false"
                            }
                          >
                            <header
                              onClick={() =>
                                toggleDropdown(
                                  _id +
                                  "_addStudentForm"
                                )
                              }
                            >
                              <h3>
                                Add Students
                              </h3>
                              <FaChevronDown />
                            </header>
                            <div
                              className={
                                styles.content
                              }
                            >
                              <ul>
                                {TEMP_addableStudents.map(
                                  (
                                    student
                                  ) => {
                                    const {
                                      name,
                                      studentID,
                                      _id,
                                    } = student;

                                    return (
                                      <li
                                        key={
                                          _id
                                        }
                                      >
                                        <Input
                                          name={
                                            _id
                                          }
                                          id={
                                            _id
                                          }
                                          type="checkbox"
                                          checked={
                                            true
                                          }
                                          label={
                                            <label
                                              htmlFor={
                                                _id
                                              }
                                            >
                                              {
                                                name
                                              }
                                            </label>
                                          }
                                        />
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                              <Button
                                type="submit"
                                emphasis="primary"
                              >
                                <FaUserPlus />
                                Add These
                                Students
                              </Button>
                            </div>
                          </form>

                          <div
                            className={`${styles.students} ${styles.sect}`}
                            dropped={
                              dropdowns.hasOwnProperty(
                                _id +
                                "_students"
                              ) &&
                                dropdowns[
                                _id +
                                "_students"
                                ] == true
                                ? "true"
                                : "false"
                            }
                          >
                            <header
                              onClick={() =>
                                toggleDropdown(
                                  _id +
                                  "_students"
                                )
                              }
                            >
                              <h3>
                                Students Already
                                in Group
                              </h3>
                              <FaChevronDown />
                            </header>
                            <div
                              className={
                                styles.content
                              }
                            >
                              {students.length <
                                1 && (
                                  <h3>
                                    No Students
                                    to Display
                                  </h3>
                                )}
                              {students.map(
                                (student) => {
                                  const {
                                    name,
                                    studentID,
                                    _id: linkID,
                                  } = student;

                                  return (
                                    <div
                                      className={
                                        styles.student
                                      }
                                      key={
                                        _id
                                      }
                                    >
                                      <div
                                        className={
                                          styles.info
                                        }
                                      >
                                        <div
                                          className={
                                            styles.pfp
                                          }
                                        ></div>
                                        <div
                                          className={
                                            styles.data
                                          }
                                        >
                                          <span>
                                            {
                                              name
                                            }
                                          </span>
                                          <span>
                                            {
                                              studentID
                                            }
                                          </span>
                                        </div>
                                      </div>
                                      <Button.Group
                                        split
                                      >
                                        <Button
                                          onClick={() =>
                                            route(
                                              `/profile/${linkID}`
                                            )
                                          }
                                          compact
                                          emphasis="secondary"
                                        >
                                          <FaUser />
                                          View
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            removeFromGroup(
                                              _id
                                            )
                                          }
                                          compact
                                          emphasis="error"
                                        >
                                          <FaTrash />
                                          Remove
                                        </Button>
                                      </Button.Group>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>

                          <Button
                            onClick={() =>
                              deleteGroup(_id)
                            }
                            emphasis="error"
                          >
                            <FaTrash />
                            Permanently Delete Group
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  <Button
                    emphasis="primary"
                    hollow
                    onClick={addGroup}
                  >
                    <FaPlus /> Add Group
                  </Button>
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
import Link from "next/link";
import axios from 'axios'
import { createReport } from "../server/controllers/report";

const StudentDashboard = () => {

  const rank = 'lt.'
  const name = 'Jim'
  const userNumber = 1

  // fetch user with user id to get data to fill out the page

  const createReport = async() => {
    const res = await axios.post('localhost:3000/api/v1/report', {user: '62609649735deab1d0f56576', createdAt: Date.now()})
    console.log(res)
  }

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
              <button className={styles.newReport} onClick={createReport}>Make a new report</button>{/*add link to create a new report and fill everything out blank and then redirect user to edit the report with the url of /report/id of report*/}
            </div>
            <div className={styles.btn}>
              <FaRegIdBadge className={styles.label} />
              <button className={styles.profileBtn}><Link href={`/profile/${userNumber}`}>My Profile</Link></button>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.cases}>
          <div className={styles.top}>
            <h1>Recent Cases</h1>
            <input className={styles.search} type="search" name="case" id="case" placeholder="Search Case #" />
          </div>
          <div className={styles.recent}>

          </div>

          <div className={`${styles.top} ${styles.top2}`}>
            <h1>Archived Cases</h1>
            <input className={styles.search} type="search" name="case" id="case" placeholder="Search Case #" />
          </div>

          <div className={styles.archived}>

          </div>
        </div>
      </div>
    </>
  )
}


const Dashboard = () => {
  const teacher = false

  return teacher ? <TeacherDashboard /> : <StudentDashboard />
}

export default Dashboard