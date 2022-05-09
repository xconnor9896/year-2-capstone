import {sendVerfEmail } from "../server/controllers/emailCon"

const emailVefPage = () => {
    return(
        <>
            <div>
                <h1>This Button Will send you a Button to Verfiy Your Email</h1>
                <h4>Make Sure to Check Your Spam</h4>
                <button onClick={{sendVerfEmail}}>Verfiy Your Email</button>
            </div>
        </>
    )
}
export default emailVefPage;