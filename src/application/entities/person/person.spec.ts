import Email from '../person/email';
import Person from './person';

describe('Person', () => {
  it('should be able to create a person', () => {
    const person = new Person({
      birthDate: new Date(2000, 1, 1),
      email: new Email('test@test.com'),
      fullName: 'Rafael Fumegalli',
    });

    expect(person).toBeTruthy();
  });
});
