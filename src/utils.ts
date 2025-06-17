import { z, type ZodIssue } from "astro:schema";

export const FormSchema = z.object({
  first_name: z
    .string({
      required_error: "First name is required",
    })
    .min(1, "First name is required"),
  last_name: z
    .string({
      required_error: "Last name is required",
    })
    .min(1, "Last name is required"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Please enter a valid email address"),
  message: z
    .string({
      required_error: "Message is required",
    })
    .min(1, "Message is required"),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

/**
 * Converts an array of Zod issues into a simple key–message object.
 * Each key is the first path element of the issue, converted to a string.
 *
 * @param {ZodIssue[] | undefined} issues - The array of Zod validation issues, or undefined.
 * @returns {Record<string, string>} An object mapping field names to error messages.
 */
export function parseZodError(issues: ZodIssue[] | undefined): Record<string, string> {
  return Object.fromEntries(
    issues?.map((issue) => [String(issue.path[0]), issue.message]) || []
  );
}

/**
 * Delays execution for a specified number of milliseconds.
 * @param {number} ms - The duration to delay (in milliseconds), e.g., `2000` for 2 seconds.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 *
 * @example
 * await delay(2000);
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Converts a Date or date string to a nicely formatted string.
 *
 * @param {Date | string} date - The date or date string to format.
 * @returns {string} A formatted date string, e.g. "18 June, 2025".
 *
 * @example
 * formatDateShort("2025-06-17T20:32:47.826Z");
 * // → "18 June, 2025"
 */
export function formatDateShort(date: Date | string): string {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-IN", { month: "long" });
  const year = d.getFullYear();
  return `${day} ${month}, ${year}`;
}
