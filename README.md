# 📄 Brochure Website

A modern **Astro** brochure site with a fully working, type-safe contact form.

## 🚀 Live Demo

👉 [View the live site here](https://brochure-website-brown.vercel.app/)

---

## ✏️ Features

- ⚡ **Astro-powered site** — fast and lightweight.
- 📬 **Contact Form**

  - Located on the homepage.
  - Submits to `/api/form` endpoint.
  - Uses **Zod** for server-side validation (type-safe).
  - Saves form submissions to a **Turso** (SQLite) database using **Drizzle ORM**.
  - Sends a confirmation email to the user via **Nodemailer** and your custom SMTP credentials.
  - Displays a green success message if successful; shows a red error message if saving or sending fails (with a `500` response).

- 📊 **Submissions Dashboard**

  - View all submitted form data at `/database` — simple, readable table.

- ✅ **Own your data**

  - No third-party backend for storage or email — everything is custom and in-house.
  - Cab be switch to a hosted services (e.g. Supabase, Resend) if preferred.

- ☁️ **Deployed on Vercel**

---

## ⚙️ Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **Database:** [Turso](https://turso.tech/) (SQLite-compatible)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Validation:** [Zod](https://zod.dev/)
- **Email:** [Nodemailer](https://nodemailer.com/) with custom SMTP
- **Hosting:** [Vercel](https://vercel.com/)

---

## 📂 Routes

| Path        | Description                           |
| ----------- | ------------------------------------- |
| `/`         | Homepage with contact form            |
| `/api/form` | API endpoint for handling submissions |
| `/database` | View all submitted form entries       |

---

## 💡 Why Custom Backend?

> **Why not use Supabase or Resend?**
> To demonstrate a from-scratch implementation and show how you can own your data and mail server. But you can easily swap these out for hosted services if needed.
