import { Validator } from ".";

export function getMandatoryValidator(): Validator<string> {
  return {
    validate: (value: string) => {
      return !!value && value.length > 0;
    },
    errorMessage: 'This field is mandatory.',
  };

}
