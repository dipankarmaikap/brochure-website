import type { APIRoute } from "astro";
import { db } from "~/db/config";
import { formTable } from "~/db/schema/form";
import { FormSchema, parseZodError, type FormSchemaType } from "~/utils";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const input = Object.fromEntries(formData.entries()) as Partial<FormSchemaType>;
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

  try {
    await db.insert(formTable).values({
      email: result.data.email,
      firstName: result.data.first_name,
      lastName: result.data.last_name,
      message: result.data.message,
    });
  } catch (error) {
    console.error("DB insert failed:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Something went wrong. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

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
