import { Injectable } from '@angular/core';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() {}

  validateRegisterForm(user: User): string {
    let error: string;

    if (!user.email) {
      error = ' email is required ';
    }
    if (this.emailValidator(user.email)) {
      error = (error ? '' : error) + ' email is not valid ';
    }
    if (this.passwordValidator(user.password)) {
      error = (error ? '' : error) + ' password is not valid ';
    }
    if (this.retypePassword(user.password, user.retypePassword)) {
      error =
        (error ? '' : error) + " password and retype password don't match ";
    }
    if (user.phone.length < 10 || user.phone.length > 11) {
      error = (error ? '' : error) + ' phone number is not valid  ';
    }
    // TODO validate password
    return error;
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      required: 'Required',
      invalidEmailAddress: 'Invalid email address',
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  emailValidator(email: string) {
    // RFC 2822 compliant regex
    if (
      email.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  passwordValidator(password: string) {
    // {6,17}           - Assert password is between 6 and 17 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (password.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

  retypePassword(password: string, retypePassword: string) {
    if (password === retypePassword) {
      return null;
    } else {
      return { invalidRetpePassword: true };
    }
  }
}
