/**
 * TODO:
 * check if error & hint message fields are really needed
 * if not: remove & flatten, or delete interface as only this
 *    method(value: string): boolean;
 * is really needed
 */

export interface OgInputValidator {
  errorMessage?: string;
  hintMessage?: string;
  method(value: string): boolean;
}
