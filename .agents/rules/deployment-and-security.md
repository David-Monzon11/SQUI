# SQUI Deployment, Security & DevOps Rules

## 1. Security Baseline
* **Password Hashing**: Always hash passwords using `bcrypt` with salt rounds >= 10.
* **JWT Tokens**: Short-lived Access Tokens (15m-1h) and secure Refresh Tokens.
* **File Uploads**: Strict MIME type validation (JPEG, PNG, WebP) and size limits (10MB max).
* **Sanitization & Headers**: Use Helmet middleware, CORS configuration, and parameterized Prisma queries to prevent SQL injection.

## 2. Deployment & Environment Strategy
* Maintain `.env.example` with clear documentation of all required keys.
* Ensure smooth local development with SQLite/Local PostgreSQL and local file storage fallback.
* Production target: Render / Railway with Neon PostgreSQL and Cloudflare R2 / S3 storage.
* Build script checks (`npm run build` and `tsc --noEmit`) must succeed without TypeScript or lint errors.
