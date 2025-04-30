import { Router } from 'express';
import { SendEmailController } from './controllers/send-email.controller';
import { SendEmailUseCase } from '../../application/use-cases/send-email.usecase';
import { MailerSendMailer } from '../../infra/mail/mailersend-mailer';

const routes = Router();
const emailRepo = new MailerSendMailer();
const useCase = new SendEmailUseCase(emailRepo);
const controller = new SendEmailController(useCase);

routes.post('/api/v1/send-email', async (req, res, next) => {
  try {
    await controller.handle(req, res);
  } catch (error) {
    next(error);
  }
});

routes.get('hello-world', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

export default routes;
