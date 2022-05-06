import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../MailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8ba6381935c58f",
    pass: "552235a58fc09b"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "felpofo Inc. <felpo@felpofo.com.br>",
      to: "Felipe Pitol Puhl <felipepitolpuhl@gmail.com>",
      subject,
      html: body,
    });
  }
}
