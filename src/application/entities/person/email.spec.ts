import Email from './email';

describe('Email', () => {
  it('should be able to create an email', () => {
    const email = new Email('test@test.com');

    expect(email).toBeTruthy();
  });

  it('should throw error when email doesnt include @', () => {
    expect(() => new Email('test.com')).toThrow(new Error('Invalid email'));
  });

  it('should throw error when email doesnt include .com', () => {
    expect(() => new Email('test@test')).toThrow(new Error('Invalid email'));
  });
});
