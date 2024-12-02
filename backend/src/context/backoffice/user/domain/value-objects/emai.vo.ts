export class Email {
  constructor(public readonly value: string) {
    if (!this.isValidEmail(value)) {
      throw new Error('Invalid email');
    }
  }

  private isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }
}
