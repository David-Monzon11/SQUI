# SQUI File Organization & Architecture Rules

## 1. Separation of Concerns
* **Backend**:
  * `routes/`: Only HTTP endpoint definitions and middleware attachments.
  * `controllers/`: Request extraction, validation check, calling services, and returning formatted JSON.
  * `services/`: Business logic, calculations, database transactions via Prisma.
  * `middleware/`: Auth verification, error catching, rate-limiting, request logging.
  * `validations/`: Schemas for input validation before hitting business logic.
  * `storage/`: Abstract file storage provider (Local, R2, S3).
* **Mobile**:
  * `screens/`: Top-level page views composing components.
  * `components/`: Modular, reusable presentational and interactive widgets.
  * `services/`: API client network requests.
  * `hooks/`: Reusable React logic (data fetching, auth, timers).
  * `constants/`: Design tokens, colors, standard thresholds.

## 2. Naming Conventions
* File names: `kebab-case` or `feature.type.ts` (e.g. `meal.controller.ts`, `auth.middleware.ts`, `NutritionBar.tsx`).
* Components: PascalCase (e.g. `MealCard.tsx`, `HealthGauge.tsx`).
* Services & Utilities: camelCase (e.g. `nutritionEngine.ts`, `dateFormatter.ts`).
