import { prisma } from "../config/db.js";

const DEFAULT_ARTICLES = [
  {
    id: "art-1",
    title: "Understanding Sugar Intake: Natural vs. Added Sugars",
    category: "SUGAR",
    readTimeMin: 3,
    summary: "Why the WHO recommends keeping added sugars under 25g daily and how to spot sneaky hidden sugars on food labels.",
    content:
      "Added sugars provide calories without essential micronutrients. While whole fruits contain fructose packaged with beneficial fiber and antioxidants, processed beverages and sauces often contain high-fructose corn syrup or sucrose that spike blood glucose. SQUI helps you track total daily sugar intake with gentle reminders when approaching the 25g threshold.",
  },
  {
    id: "art-2",
    title: "The Sodium Equation: Protecting Heart and Kidneys",
    category: "SODIUM",
    readTimeMin: 4,
    summary: "Excess sodium pulls extra water into your blood vessels. Learn simple seasoning alternatives that keep food flavorful.",
    content:
      "A standard teaspoon of table salt contains roughly 2,300mg of sodium. Most dietary sodium comes from processed food, restaurant meals, and condiments rather than the salt shaker. To balance higher sodium days, drink plenty of water and eat potassium-rich foods like bananas, spinach, and avocados.",
  },
  {
    id: "art-3",
    title: "The SQUI Philosophy: Mindfulness Over Restriction",
    category: "HABITS",
    readTimeMin: 3,
    summary: "Why sustainable health is built through daily awareness, preparation, and balance rather than extreme dieting.",
    content:
      "Like a squirrel that plans ahead for every season, mindful nutrition is about consistency and balance. Strict diets often lead to burnout, while visual food journaling builds subconscious awareness of meal composition, portion sizes, and hunger cues.",
  },
  {
    id: "art-4",
    title: "Hydration Mastery: Reaching Your 2.5L Goal",
    category: "HYDRATION",
    readTimeMin: 2,
    summary: "Easy daily routines to maintain consistent hydration without feeling overwhelmed.",
    content:
      "Start your morning with a 500ml glass of water before your first meal. Drink another glass 30 minutes before lunch and dinner. Keeping a refillable bottle nearby ensures your kidneys and metabolism function at their peak.",
  },
  {
    id: "art-5",
    title: "Flavorful Swaps: Delicious Everyday Alternatives",
    category: "NUTRITION",
    readTimeMin: 4,
    summary: "Swap high-sodium condiments for lemon juice, garlic, herbs, and low-sodium naturally fermented options.",
    content:
      "Using fresh calamansi or lemon juice, roasted garlic, black pepper, and fresh herbs gives your dishes vibrant flavors without requiring excessive sodium. For snacks, roasted unsalted nuts and fresh cucumber slices provide crisp satisfaction.",
  },
];

export class KnowledgeService {
  async getArticles(category?: string) {
    // Seed in-memory / DB if needed
    if (category) {
      return DEFAULT_ARTICLES.filter(
        (a) => a.category.toLowerCase() === category.toLowerCase()
      );
    }
    return DEFAULT_ARTICLES;
  }

  async getArticleById(id: string) {
    const article = DEFAULT_ARTICLES.find((a) => a.id === id);
    if (!article) {
      throw { statusCode: 404, code: "ARTICLE_NOT_FOUND", message: "Health article not found" };
    }
    return article;
  }
}

export const knowledgeService = new KnowledgeService();
