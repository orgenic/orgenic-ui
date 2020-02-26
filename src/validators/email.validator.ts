import { Validator } from ".";

// Simple RegEx Pattern to validate E-Mails.
// _@_._
const pattern = /\S+@\S+\.\S+/;

export function getEMailValidator(): Validator<string> {
  return {
    validate: (value: string) => {
      return pattern.test(value);
    },
    errorMessage: 'This is not a valid email address.',
  };
}
