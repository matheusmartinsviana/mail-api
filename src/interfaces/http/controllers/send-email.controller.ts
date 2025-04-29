import { Request, Response } from 'express';
import { SendEmailUseCase } from '../../../application/use-cases/send-email.usecase';
import logger from '../../../infra/logger/logger';

export class SendEmailController {
  constructor(private readonly sendEmailUseCase: SendEmailUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { to, subject, templateId } = req.body;

    logger.info(`Incoming request to send email | To: ${to}, Subject: ${subject}, Template: ${templateId}`);

    if (!to) {
      logger.warn('Validation failed: "to" is required');
      return res.status(400).json({ error: 'Recipient email address is required' });
    }

    if (!subject) {
      logger.warn('Validation failed: "subject" is required');
      return res.status(400).json({ error: 'Subject is required' });
    }

    try {
      await this.sendEmailUseCase.execute({ to, subject, templateId });

      logger.info(`Email sent successfully to ${to}`);
      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error: any) {
      logger.error(`Error sending email to ${to}: ${error.message}`);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
