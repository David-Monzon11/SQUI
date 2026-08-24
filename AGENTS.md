# SQUI Project Agent Rules & Development Standards

Welcome to the **SQUI** codebase. All AI agents and developers working on SQUI must adhere to the rules and principles outlined below.

---

## 1. Brand Identity & Creativity Standards

### 1.1 Mascot & Philosophy
* **The SQUI Mascot**: A cheerful, intelligent, and mindful squirrel named SQUI representing **preparation, balance, discipline, and sustainable wellness**.
* **Tone of Voice**: Friendly, encouraging, educational, calm, and supportive.
* **Core Principle**: **"Awareness over restriction. Progress over perfection. Education over judgment."**
* Never display judgmental or punitive messages (e.g., avoid "You failed your goal"). Use constructive, empowering phrasing (e.g., "A little high on sodium today—try balancing it with extra hydration and fresh leafy greens tomorrow!").

### 1.2 UI/UX Aesthetics & Visual Delight
* **Palette**:
  * Primary: Nature Emerald / Fresh Green (`#10B981`, `#059669`)
  * Secondary: SQUI Warm Amber / Sunset Orange (`#F59E0B`, `#EA580C`)
  * Neutral/Background: Soft Warm Oatmeal/Cream (`#FDFBF7`), Clean White (`#FFFFFF`), Slate Dark (`#0F172A`, `#1E293B`)
* **Visual Polish**:
  * Use glassmorphic card overlays, subtle borders (`rgba(0,0,0,0.06)` or `rgba(255,255,255,0.1)`), and smooth shadows.
  * Every interactive element must provide micro-feedback (haptics, active opacity, smooth transitions).
  * Data visualizations (weight, sugar, sodium) must have clear threshold markers, gradient fills, and tooltips.

---

## 2. File Organization & Architecture

### 2.1 Backend Directory Architecture (`backend/`)
Follow a strict layered, domain-driven structure:
```text
backend/
├── prisma/
│   └── schema.prisma           # Prisma models & migrations
├── src/
│   ├── config/                 # Env variables, constants, DB client
│   ├── controllers/            # Request handlers (HTTP status, input parsing)
│   ├── services/               # Business logic & calculations
│   ├── routes/                 # Express route definitions
│   ├── middleware/             # Auth (JWT), validation, error handler, logging
│   ├── validations/            # Zod / Joi validation schemas
│   ├── storage/                # Cloudflare R2 / S3 / Local image storage adapters
│   ├── engine/                 # Nutrition calculation & Summary AI/Logic engine
│   ├── utils/                  # Date helpers, response formatters, crypto
│   └── server.ts               # App entrypoint
├── tests/                      # Unit & integration test suites
├── uploads/                    # Local temporary image storage
└── package.json
```

### 2.2 Mobile Directory Architecture (`mobile/`)
```text
mobile/
├── src/
│   ├── assets/                 # Icons, mascots, splash images, fonts
│   ├── components/             # Reusable UI elements (Buttons, Cards, Badges, Charts)
│   │   ├── common/             # Button, Input, Modal, Avatar
│   │   ├── dashboard/          # MetricGauge, FoodDiaryStream, DailyStreakBanner
│   │   └── nutrition/          # MacroRing, SugarSodiumBar, MealCard
│   ├── screens/                # Screen views (Dashboard, MealLog, Analytics, Profile, Knowledge)
│   ├── navigation/             # Tab / Stack navigators
│   ├── services/               # Axios/Fetch API client & endpoint helpers
│   ├── contexts/ / store/      # AuthState, ThemeState, NutritionState
│   ├── hooks/                  # Custom React hooks (useAuth, useDailyLog, useNotifications)
│   ├── constants/              # Colors, typography, API configs
│   ├── utils/                  # Date formatters, nutrition formulas, validators
│   └── types/                  # TypeScript interface definitions
├── app.json
└── package.json
```

---

## 3. Business Logic & Nutrition Engine Standards

### 3.1 Domain Calculations
* **Daily Sugar Monitoring**:
  * Default Daily Max Target: 25g (recommended) up to 50g (hard cap) for average adult.
  * Threshold status: `SAFE` (< 70% limit), `CAUTION` (70–100%), `EXCEEDED` (> 100%).
* **Daily Sodium Monitoring**:
  * Default Daily Max Target: 2000mg (2g).
  * Real-time warning triggered when a single meal exceeds 800mg.
* **Caloric & Macro Distribution**:
  * Calories: Calculated from protein (4 kcal/g), carbs (4 kcal/g), fat (9 kcal/g).
* **Weight & Hydration Tracking**:
  * One primary weight entry per calendar day per user (allow updates/edits).
  * Maintain precise timestamps with UTC storage and user-local timezone conversion.
* **Daily Health Score**:
  * 0–100 score computed balancing: Hydration target met (20%), Sugar within limit (30%), Sodium within limit (30%), Meal logging completeness (20%).

---

## 4. Implementation & Code Quality Rules

* **TypeScript Strictness**: No implicit `any`. All API requests, responses, database entities, and component props must have explicit TypeScript types.
* **Error Handling & Response Format**:
  All API responses must follow the standardized structure:
  ```json
  {
    "success": true,
    "data": { ... },
    "message": "Optional human-readable message"
  }
  ```
  Error responses:
  ```json
  {
    "success": false,
    "error": {
      "code": "AUTH_INVALID_CREDENTIALS",
      "message": "Invalid email or password",
      "details": []
    }
  }
  ```
* **Security Essentials**:
  * Passwords hashed with `bcrypt` (minimum 10 rounds).
  * JWT access tokens (short-lived) + refresh tokens.
  * File uploads validated by MIME type (JPEG/PNG/WebP only) and capped at 10MB.
  * Sanitize inputs against SQL injection and XSS.

---

## 5. Quality Assurance (QA) & Testing Rules

### 5.1 Test Coverage Requirements
* **Unit Tests**:
  * Test Nutrition Calculation Engine (aggregation formulas, edge cases like zero grams, overflow values).
  * Test Health Score Generator & SQUI reflection recommendation logic.
* **API Integration Tests**:
  * Auth flow (register, login, refresh token, invalid credentials).
  * Meal creation with image upload and live nutrition updates.
  * Weight log creation, duplicate prevention/update logic.
  * Summary generation (daily/weekly/monthly).
* **Edge Case Verification**:
  * Timezone boundary tests (logging meals right before midnight).
  * Non-standard image dimensions or corrupted uploads.
  * Empty / missing nutrition fields with graceful fallbacks.

---

## 6. Deployment & Environment Rules

* **Environment Configurations**:
  * Never commit secrets (`.env`). Always maintain an updated `.env.example` in both `backend` and `mobile`.
* **Database Migrations**:
  * Run `npx prisma migrate dev` during development.
  * Production must use `npx prisma migrate deploy`.
* **Cloud & Service Integrations**:
  * Database: Neon PostgreSQL / Local SQLite for rapid local testing.
  * Storage: Cloudflare R2 / S3 compatible SDK with local filesystem fallback for development mode.
  * Hosting: Render / Railway ready with standard `npm run build` and `npm start` scripts.

---

## 7. AI & Extensibility Guidelines

* Keep the AI Service / Machine Learning layer decoupled from HTTP controllers.
* All AI features (Food Image Recognition, Automated Nutrition Estimation, AI Reflection) must consume clean typed interfaces so models (OpenAI, local vision models, or Claude) can be swapped with zero breaking changes to database or UI components.
