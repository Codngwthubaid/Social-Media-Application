const nodemailer = require("nodemailer")


exports.emailSender = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE, // true for port 465, false for other ports
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOpotions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    } 


    await transporter.sendMail(mailOpotions)
}