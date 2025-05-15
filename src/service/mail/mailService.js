const nodemailer = require('nodemailer')

const sendMail = async (userEmail, mailSubject, content) => {
  //1. create an email transporter
  //SMPT(simple mail transfer protocol)
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "mohitrathor89528@gmail.com",
      pass: "omwe kwdf rhsz nhoj",
    },
  });

  //2. config email content
  const mailOption = {
    from: "mohitrathor89528@gmail.com",
    to: userEmail,
    subject: mailSubject,
    // text: content,
    html: content
  };

  try {
    //3. send mail
    const info = await transporter.sendMail(mailOption);
    console.log(info);
  } catch (error) {
    console.log(error.message);
    // throw new Error(error.message)
  }
};

// sendMail('mohit1.ibc@gmail.com','Testing','welcome to bidder app')

module.exports = sendMail;
