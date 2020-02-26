import { ValidatorEntry, Validator } from "./validator.interface";
import { getLengthValidator } from "./length.validator";
import { getMandatoryValidator } from "./mandatory.validator";

export enum ValidatorsName {
  email = 'email',
  length = 'length',
  mandatory = 'mandatory',
}

export const defaultValidator: Validator<any> = {
  validate: (_x: any) => true
}

export function getValidator<A>(list: Array<string | ValidatorEntry | Validator<A>>): Validator<A> {
  return (list || []).map(v => {

    if (typeof v === 'string') {
      return validatorFactory(v, null);
    } else if (v && (v as any).name) {
      v = v as ValidatorEntry;
      return validatorFactory(v.name, v.options);
    } else {
      return v as Validator<A>;
    }
  }).reduce(combineValidators, defaultValidator);
}

export function validatorFactory(name: string, options: any): Validator<any> {
  options ? options : {};

  switch (name) {
    case (ValidatorsName.length):
      return getLengthValidator(options.min, options.max);
    case (ValidatorsName.mandatory):
      return getMandatoryValidator();
    default:
      return defaultValidator;
  }
}

export function combineValidators<A>(v1: Validator<A>, v2: Validator<A>): Validator<A> {
  let combined: Validator<A>;
  combined = {
    validate: (x: A) => {
      const res1: boolean = v1.validate(x);
      const res2: boolean = v2.validate(x);
      if (!res1) {
        combined.errorMessage = v1.errorMessage;
      } else if (!res2) {
        combined.errorMessage = v2.errorMessage;
      }
      return res1 && res2;
    },
  }
  return combined;
}
