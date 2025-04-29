// src/domain/entities/email.entity.ts
export class Email {
  constructor(
    public readonly to: string,
    public readonly subject: string, // ainda pode ser útil mesmo com template
    public readonly body?: string, // opcional quando usar template
    public readonly templateId?: string,
    public readonly variables?: { var: string; value: string }[]
  ) {
    if (!to || !subject) {
      throw new Error('Invalid email data');
    }
  }
}
  

