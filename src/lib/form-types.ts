export const FORM_TYPES = [
  "contact",
  "partner",
  "review",
  "newsletter",
  "careers",
] as const;

export type FormType = (typeof FORM_TYPES)[number];

export function isFormType(value: unknown): value is FormType {
  return (
    typeof value === "string" &&
    (FORM_TYPES as readonly string[]).includes(value)
  );
}
