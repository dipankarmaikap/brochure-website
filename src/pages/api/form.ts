import type { APIRoute } from "astro";
import { delay, FormSchema, parseZodError, type FormSchemaType } from "~/utils";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const input = Object.fromEntries(formData.entries()) as Partial<FormSchemaType>;
  await delay(5000);
  const result = FormSchema.safeParse(input);

  if (!result.success) {
    return new Response(
      JSON.stringify({
        success: false,
        input,
        errors: parseZodError(result.error.issues) as Partial<
          Record<keyof FormSchemaType, string>
        >,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  // TODO: handle valid data (save to DB, send email, etc.)

  return new Response(
    JSON.stringify({
      success: true,
      message: "Form submitted successfully!",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
