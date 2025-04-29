import { Email } from '../entities/email.entity';

export interface EmailRepository {
  send(email: Email): Promise<void>;
}