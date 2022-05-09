import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '33fe55c1064e8d',
    pass: '701ff2cbe69651'
  }
})

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedget <victor@bonsae.com>',
    to: 'victor <victoorqrz@gmail.com>',
    subject: 'novo feedback',
    html: `<p>Tipo do feeback: ${type}</p>
    <p>Comentario: ${comment}</p>`
  })

  return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
  console.log('server running!')
})
