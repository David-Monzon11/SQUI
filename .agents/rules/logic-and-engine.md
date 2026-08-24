# SQUI Logic & Nutrition Engine Rules

## 1. Core Nutrition Domain Rules
* **Sugar Monitoring**:
  * WHO guidelines / Target: 25g/day. Caution boundary: 35g. High alert: > 50g.
  * Provide helpful context on natural vs. added sugars.
* **Sodium Monitoring**:
  * Target: <= 2000 mg (2g)/day.
  * Warning for meals with > 800mg sodium in a single sitting.
* **Calories & Macros**:
  * Calories formula: `(protein * 4) + (carbs * 4) + (fat * 9)`.
* **Daily Aggregation & Score**:
  * Calculate daily score out of 100 based on hydration, sugar compliance, sodium compliance, and meal tracking consistency.
  * Never assign negative scores.
  * Generate educational SQUI tips (e.g. suggesting leafy greens or hydration).
