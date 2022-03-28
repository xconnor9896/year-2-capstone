import { FaRegUser, FaUpload, FaRegIdBadge } from 'react-icons/fa'

const Dashboard = () => {
  const name = 'John'
  const rank = 'Lt.'

  return (
    <>
      <div className="dashboard">
        <div className="profile">
          <h1 className="title">Welcome Back!</h1>
          <h2 className="name">{rank} {name}!</h2>
          <FaRegUser />
          <div className="name2">{rank} {name}</div>
          <button id="newReport"><FaUpload /> Make a new report</button>
          <button id="profile"><FaRegIdBadge /> My Profile</button>
        </div>
        <div className="divider"></div>
        <div className="cases"></div>
      </div>
    </>
  )
}

export default Dashboard