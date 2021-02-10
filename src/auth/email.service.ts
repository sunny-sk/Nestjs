/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
@Injectable()
export class EmailService {
  private transporter: Mail;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      name: 'example.com',
      port: 587,
      tls: {
        ciphers: 'SSLv3',
      },
      auth: {
        user: 'public-auth@outlook.com',
        pass: 'PublicAuth@4321',
      },
    });
  }

  sendMail = (to: string, subject: string) => {
    this.transporter
      .sendMail({
        from: 'public-auth@outlook.com',
        to: to,
        subject: subject,
        html: '<h1>Hello world</h1>',
      })
      .then(console.log);
  };
}
