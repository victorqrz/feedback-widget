import { MailAdapter, SendMailData } from '../mail-adapter'
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '33fe55c1064e8d',
    pass: '701ff2cbe69651'
  }
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <victor@bonsae.com>',
      to: 'victor <victoorqrz@gmail.com>',
      subject,
      html: body
    })
  }
}
