import { Email } from "../../domain/entities/email.entity";
import { EmailRepository } from "../../domain/repositories/email.repository";

export class SendEmailUseCase {
  constructor(private readonly emailRepository: EmailRepository) {}

  async execute(data: {
    to: string;
    subject?: string;
    body?: string;
    templateId?: string;
    variables?: { var: string; value: string }[];
  }): Promise<void> {
    const email = new Email(data.to, data.subject || '', data.body || '', data.templateId || '', data.variables || []);
    await this.emailRepository.send(email);
  }
}
