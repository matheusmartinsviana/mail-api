import 'dotenv/config';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import { Email } from '../../domain/entities/email.entity';
import { EmailRepository } from '../../domain/repositories/email.repository';

export class MailerSendMailer implements EmailRepository {
  private mailerSend = new MailerSend({
    apiKey: process.env.API_KEY!,
  });

  async send(email: Email): Promise<void> {
    const sentFrom = new Sender(process.env.MAIL_FROM!, process.env.MAIL_FROM_NAME || 'Spy Tech');

    const recipients = [new Recipient(email.to, email.to)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setTemplateId(email.templateId!)
      .setSubject(email.subject)

    await this.mailerSend.email.send(emailParams);
  }
}
