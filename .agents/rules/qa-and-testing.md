# SQUI Quality Assurance, Testing & Error Handling Rules

## 1. Testing Standards
* **Unit Tests**:
  * Mandatory coverage on Nutrition Calculation Engine, Macro aggregations, Health Score formulas, and Date/Timezone utilities.
* **API Integration Tests**:
  * Auth flows: Signup, Login, Invalid Password, Expired Token.
  * Meal management: Multipart photo upload, validation failures, summary recalculations.
  * Weight records: Single entry per date guarantee, history trend outputs.
* **Mocking & Isolation**:
  * Mock external storage (R2/S3) and push notifications in unit/integration test suites.

## 2. Standardized Error Response Codes
* `AUTH_INVALID_CREDENTIALS` (401)
* `AUTH_UNAUTHORIZED` (403)
* `AUTH_TOKEN_EXPIRED` (401)
* `VALIDATION_ERROR` (400)
* `MEAL_NOT_FOUND` (404)
* `FILE_TOO_LARGE` (413)
* `INVALID_FILE_FORMAT` (400)
* `INTERNAL_SERVER_ERROR` (500)
