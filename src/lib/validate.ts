// Client-side checks for the enquiry forms. Each returns field → message for anything invalid.

export type FieldErrors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PK_MOBILE = /^(\+92|92|0)3\d{9}$/;

export function checkName(value: string): string | undefined {
  return value.trim().length < 2 ? "Please enter your name" : undefined;
}

export function checkEmail(value: string): string | undefined {
  return EMAIL.test(value.trim()) ? undefined : "Enter a valid email address";
}

/** Validates a Pakistani mobile number such as 0300 1234567 or +92 300 1234567. Empty is allowed when optional. */
export function checkMobile(value: string, { optional = false } = {}): string | undefined {
  const digits = value.replace(/[\s-]/g, "");
  if (!digits && optional) return undefined;
  return PK_MOBILE.test(digits) ? undefined : "Enter a Pakistani mobile number, e.g. 0300 1234567";
}

export function checkRequired(value: string, message: string): string | undefined {
  return value.trim() ? undefined : message;
}

export function checkMessage(value: string): string | undefined {
  return value.trim().length < 10 ? "Please write a little more (at least 10 characters)" : undefined;
}

/** Drops fields without an error. */
export function collectErrors(checks: Record<string, string | undefined>): FieldErrors {
  return Object.fromEntries(Object.entries(checks).filter((entry): entry is [string, string] => !!entry[1]));
}
