const nodemailer = require('nodemailer');

class EmailService {
    static async sendEmail(to: string[], subject: string, message: string, html?: string) {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SERVICE_EMAIL,
            pass: process.env.SERVICE_EMAIL_PASSWORD
          }
        });
        var mailOptions = {
          from: process.env.SERVICE_EMAIL,
          to: to,
          subject: subject,
          text: message,
          html: html === undefined ? "" : html
        };
        await transporter.sendMail(mailOptions);
      }
}

export { EmailService };