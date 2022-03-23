require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: '@gmail.com', // Change to your recipient
  from: '@west-mec.org', // Change to your verified sender
  templateId: 'd-d57cf8bc57bd482384462979d6fd0ee6', //* I made two very simple Templates 1 for email Verfication and 1 for PassWord Reset More about this will be in daily-logs/zach.md
  //! Not sure what this does for the emails but Ill leave it here just incase we may want/need it 
//   dynamicTemplateData: { 
//     subject: 'Testing Templates',
//     name: 'Some One',
//     city: 'Denver',
//   },
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })