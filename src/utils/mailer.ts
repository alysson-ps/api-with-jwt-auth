import { createTransport } from "nodemailer";
import hbs from "handlebars";
import fs from "fs";

interface Ivars {
  token: string;
}

const transport = createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6e568be6024e67",
    pass: "72e3b0bd605661",
  },
});

const html = fs.readFileSync("./src/resources/mail/passwdReset.hbs", "utf8");

const template = hbs.compile(html);

const options = (email: string, vars: Ivars) => {
  return {
    from: "MyApplication <dev.alysson@gmail.com>",
    to: email,
    subject: "MyApplication | Password Reset",
    html: template(vars),
  };
};

const sendMailTemplate = async (email: string, token: string) => {
  const mail = transport.sendMail(options(email, { token: token }));
  return mail ? "Email sent successfully" : "Failed to send email";
};

export default sendMailTemplate;

