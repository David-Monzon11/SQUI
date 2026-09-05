import { WisdomTip, WisdomCategory } from '../types';

export class WisdomService {
  private static tips: WisdomTip[] = [
    {
      id: 'tip-sugar-1',
      category: 'SUGAR',
      title: 'Hidden Sugar Awareness',
      content: 'Sauces and condiments like ketchup and barbecue can pack up to 4g of hidden sugar per tablespoon.',
      actionItem: 'Check condiment nutrition labels before dressing your plate today.',
      xpReward: 5,
      icon: '🍯',
    },
    {
      id: 'tip-sodium-1',
      category: 'SODIUM',
      title: 'Sodium & Potassium Balance',
      content: 'Potassium-rich foods like leafy greens and bananas help your body process excess sodium smoothly.',
      actionItem: 'Pair savory meals with a side of spinach or fresh avocado.',
      xpReward: 5,
      icon: '🌿',
    },
    {
      id: 'tip-hydration-1',
      category: 'HYDRATION',
      title: 'The Pre-Meal Water Sip',
      content: 'Drinking 200ml of water 15 minutes before dining enhances digestion and supports natural satiety.',
      actionItem: 'Enjoy a glass of water before your next main meal.',
      xpReward: 5,
      icon: '💧',
    },
    {
      id: 'tip-mindfulness-1',
      category: 'MINDFULNESS',
      title: 'The 20-Minute Chewing Rhythm',
      content: 'It takes approximately 20 minutes for satiety signals to reach your brain during dining.',
      actionItem: 'Chew slowly and take a 30-second pause between bites.',
      xpReward: 5,
      icon: '🐿️',
    },
    {
      id: 'tip-sugar-2',
      category: 'SUGAR',
      title: 'Natural Fiber Shield',
      content: 'Eating whole fruit with fiber slows sugar absorption compared to drinking processed fruit juice.',
      actionItem: 'Choose fresh berries or whole apples over fruit juice today.',
      xpReward: 5,
      icon: '🍎',
    },
    {
      id: 'tip-sodium-2',
      category: 'SODIUM',
      title: 'Herb & Citrus Seasoning',
      content: 'Fresh lemon juice, garlic, and rosemary amplify food flavors naturally without adding sodium.',
      actionItem: 'Try seasoning roasted vegetables with lemon zest instead of salt.',
      xpReward: 5,
      icon: '🍋',
    },
  ];

  public static getDailyWisdom(category?: WisdomCategory): WisdomTip[] {
    if (category) {
      return this.tips.filter((t) => t.category === category);
    }
    return this.tips;
  }

  public static getRandomTip(category?: WisdomCategory): WisdomTip {
    const list = this.getDailyWisdom(category);
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex] || this.tips[0];
  }
}
