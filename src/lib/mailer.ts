import nodemailer from "nodemailer";

export interface SMTPCredentials {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  from: string;
}

export const SMTP_CREDENTIALS: SMTPCredentials = {
  host: import.meta.env.SMTP_HOST!,
  port: Number(import.meta.env.SMTP_PORT!),
  secure: import.meta.env.SMTP_SECURE === "true",
  username: import.meta.env.SMTP_USER!,
  password: import.meta.env.SMTP_PASS!,
  from: import.meta.env.SMTP_FROM!,
};

console.log(import.meta.env.SMTP_SECURE);
console.log(SMTP_CREDENTIALS);


export function createTransporter(creds: SMTPCredentials) {
  return nodemailer.createTransport({
    host: creds.host,
    port: creds.port,
    secure: creds.secure,
    auth: {
      user: creds.username,
      pass: creds.password,
    },
  });
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

const transporter = createTransporter(SMTP_CREDENTIALS);

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  const from = `"${SMTP_CREDENTIALS.from}" <${SMTP_CREDENTIALS.username}>`;

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
    text,
  });
}
