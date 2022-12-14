import InvalidEmail from '@application/entities/errors/invalid-email';

export default class Email {
  private readonly email: string;

  get value(): string {
    return this.email;
  }

  private isValid(email: string): boolean {
    return email.includes('@') && email.endsWith('.com');
  }

  constructor(email: string) {
    if (!this.isValid(email)) throw new InvalidEmail();
    this.email = email;
  }
}
