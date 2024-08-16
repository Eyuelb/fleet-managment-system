import { z } from "zod";
export const messages = {
  passwordOneUppercase: `The Password must contain at least one uppercase character`,
  passwordOneLowercase: `The Password must contain at least one lowercase character`,
  passwordOneNumeric: `The password must contain at least one numerical character.`,
  passwordRequired: "Password is required",
  passwordLengthMin: "Password must be at least 3 characters",
  passwordLengthMax: `Password can't be more than 32 characters`,
  newPasswordRequired: "New Password is required",
  newPasswordLength: "New Password must be at least 3 characters",
  confirmPasswordRequired: "Confirm Password is required",
  passwordsDidNotMatch: "Passwords don't match",
};
export const zodValidations = {
  required: (name?: string) =>
    z.string().nonempty(`${name ?? "This field"} is required`),
  "required-multi-select": () =>
    z.array(z.string()).nonempty("This field is required"),
  number: () =>
    z.coerce
      .number()
      .int()
      .min(1, { message: "Invalid number must be greater than 0" }),
  age: () =>
    z.coerce
      .number()
      .int()
      .min(18, {
        message:
          "At least one passenger must be greater than or equal to 18 years old",
      })
      .max(1000)
      .optional(),
  email: () =>
    z
      .string()
      .min(1, { message: "Email address is required" })
      .email({ message: "Invalid email address" }),
  minLength: (minLength: number = 1) =>
    z.string().min(minLength, `Must be at least ${minLength} characters long`),
  maxLength: (maxLength: number = 150) =>
    z.string().max(maxLength, `Must be at most ${maxLength} characters long`),
  minValue: (minValue: number = 1) =>
    z.number().min(minValue, `Must be at least ${minValue}`),
  maxValue: (maxValue: number = 150) =>
    z.number().max(maxValue, `Must be at most ${maxValue}`),
  pattern: (pattern: RegExp) => z.string().regex(pattern, "Invalid format"),
  date: () =>
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  url: () => z.string().url("Invalid URL"),
  alpha: () => z.string().regex(/^[a-zA-Z]+$/, "Must contain only letters"),
  alphanumeric: () =>
    z.string().regex(/^[a-zA-Z0-9]+$/, "Must contain only letters and numbers"),
  phoneNumber: () =>
    z.string().regex(/^\+?[0-9]{1,3}-?[0-9]{3,14}$/, "Invalid phone number"),
  creditCard: () =>
    z
      .string()
      .regex(/^(?:[0-9]{4}-?){3}[0-9]{4}$/, "Invalid credit card number"),
  postalCode: () =>
    z
      .string()
      .regex(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, "Invalid postal code"),
  ipv4: () =>
    z.string().regex(/^(\d{1,3}\.){3}\d{1,3}$/, "Invalid IPv4 address"),
  ipv6: () =>
    z
      .string()
      .regex(
        /^((?=.*(::))(?!.*\3.+\3))\3?(([0-9A-Fa-f]{1,4}\3?){1,7}|.{1,7})\3?((([0-9A-Fa-f]{1,4}\3)|.{1,4}){1,7}|.{1,7})$/,
        "Invalid IPv6 address"
      ),
  password: () =>
    z
      .string()
      .min(1, { message: messages.passwordRequired })
      .min(3, { message: messages.passwordLengthMin })
      .regex(new RegExp(".*[A-Z].*"), {
        message: messages.passwordOneUppercase,
      })
      .regex(new RegExp(".*[a-z].*"), {
        message: messages.passwordOneLowercase,
      })
      .regex(new RegExp(".*\\d.*"), { message: messages.passwordOneNumeric }),
  confirmPassword: () =>
    z
      .string()
      .min(1, { message: messages.confirmPasswordRequired })
      .min(3, { message: messages.passwordLengthMin })
      .regex(new RegExp(".*[A-Z].*"), {
        message: messages.passwordOneUppercase,
      })
      .regex(new RegExp(".*[a-z].*"), {
        message: messages.passwordOneLowercase,
      })
      .regex(new RegExp(".*\\d.*"), { message: messages.passwordOneNumeric }),
};
