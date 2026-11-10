import { Product } from '../types';

export interface BusinessAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
  mobileMoneyProvider: string;
  mobileMoneyNumber: string;
  whatsappNumber: string;
}

export const DEFAULT_BUSINESS_ACCOUNT: BusinessAccount = {
  bankName: 'OPay',
  accountNumber: '8102446805',
  accountName: "SWEENEY'S DESSERTS",
  mobileMoneyProvider: 'OPay',
  mobileMoneyNumber: '0810 244 6805',
  whatsappNumber: '+2348102446805',
};

export const PRODUCTS: Product[] = [
  {
    id: 'swn-parfait-cup',
    name: "Sweeney's Parfait Cup with Spoon",
    category: 'parfaits',
    categoryLabel: 'Parfait Cups',
    description: 'Layered Greek yogurt parfait packed with fresh fruit coulis and crunchy clusters, with spoon included.',
    detailedDescription: 'Handcrafted fresh in Enugu with rich creamy yogurt, fruit layers, and crunchy oat clusters. Sealed fresh in delivery cup with spoon ready to enjoy right away.',
    price: 3500,
    volume: '1 × 300ml Sealed Cup',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_1.37.20_PM_4a468390.jpeg',
    ingredients: ['Strained Greek Yogurt', 'Fresh Fruit Puree', 'Oat Granola Crunch', 'Natural Honey'],
    dietary: ['Spoon Included', 'Freshly Sealed', 'Ready to Eat'],
    tasteNotes: ['Sweet Cream', 'Berry Swirl', 'Toasted Granola Crunch'],
    isRealPhoto: true,
    isSignature: true,
  },
  {
    id: 'swn-strained-tub',
    name: "Sweeney's Classic Strained Greek Yogurt Tub",
    category: 'tubs',
    categoryLabel: 'Strained Tubs',
    description: 'Our signature whole milk thick Greek yogurt tub, triple-strained for 18 hours for maximum velvety density.',
    detailedDescription: 'Pure, thick Greek yogurt crafted in our Enugu kitchen. High in natural protein and live probiotic cultures, sealed in a generous sharing tub.',
    price: 9500,
    volume: '500ml Chilled Tub',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_1.37.21_PM_1fb1eb2e.jpeg',
    ingredients: ['Pure Whole Cow Milk', 'Live Active Probiotic Cultures'],
    dietary: ['Gluten-Free', 'High Protein', 'Zero Preservatives'],
    tasteNotes: ['Velvety Custard', 'Subtle Tartness', 'Pure Fresh Dairy'],
    isRealPhoto: true,
    isSignature: true,
  },
  {
    id: 'swn-mini-drinking-yogurt',
    name: "Sweeney's Pocket Drinking Yogurt Bottle",
    category: 'drinks',
    categoryLabel: 'Drinking Yogurt',
    description: 'Pocket-sized smooth probiotic drinking yogurt chilled on ice, sealed with red cap and Sweeney’s sticker.',
    detailedDescription: 'Handcrafted fresh in small batches in Enugu. Rich, silky drinking yogurt chilled in ice tubs, perfectly sized to refresh on the go.',
    price: 1200,
    volume: '250ml Pocket Bottle',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_1.37.21_PM_acfcb010.jpeg',
    ingredients: ['Pasteurized Whole Cow Milk', 'Active Live Probiotic Cultures', 'Light Cane Sugar', 'Natural Vanilla'],
    dietary: ['Ice Chilled', 'Pocket Size', 'Probiotic Rich'],
    tasteNotes: ['Silky Smooth', 'Sweet Vanilla', 'Pure Dairy Cream'],
    isRealPhoto: true,
    isSignature: true,
  },
  {
    id: 'swn-drinking-yogurt',
    name: "Sweeney's Chilled Drinking Yogurt Bottle",
    category: 'drinks',
    categoryLabel: 'Drinking Yogurt',
    description: 'Smooth, refreshing probiotic drinking yogurt in grab-and-go sealed bottles. Eat healthy, drink healthy.',
    detailedDescription: 'Freshly cultured drinking yogurt blended to silky perfection with natural sweetness. Chilled under 4°C for hot days in Enugu.',
    price: 1500,
    volume: '350ml Bottle',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_1.37.20_PM_35e7b567.jpeg',
    ingredients: ['Pasteurized Whole Milk', 'Live Probiotic Cultures', 'Light Cane Sugar', 'Natural Vanilla'],
    dietary: ['Probiotic Rich', 'Cold-Chain Chilled', 'Easy Sip'],
    tasteNotes: ['Smooth Sweet Milk', 'Gentle Vanilla', 'Refreshing Citrus Tone'],
    isRealPhoto: true,
    isSignature: true,
  },
  {
    id: 'swn-granola-bag',
    name: "Sweeney's Signature Crunchy Honey Granola Bag",
    category: 'granola',
    categoryLabel: 'Artisan Granola',
    description: 'Freshly roasted oat clusters tossed with whole almonds, raisins, cinnamon, and raw golden Nigerian honey.',
    detailedDescription: 'Slow-baked in small batches in Enugu. Extra crunchy and aromatic, designed to be the ultimate companion for your Sweeney’s yogurt cups.',
    price: 4000,
    volume: '250g Zip-Lock Pouch',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_1.37.21_PM_3f6d52d6.jpeg',
    ingredients: ['Rolled Oats', 'Raw Honey', 'Toasted Almonds', 'Sun-Dried Raisins', 'Cinnamon', 'Coconut Oil'],
    dietary: ['Vegetarian', 'High Fiber', 'Oven Roasted'],
    tasteNotes: ['Caramelized Oats', 'Roasted Almonds', 'Sweet Raisins'],
    isRealPhoto: true,
  },
];

export const TOPPING_OPTIONS = [
  "Sweeney's Crunchy Granola (+₦0)",
  'Extra Golden Honey Drizzle (+₦100)',
  'Fresh Sliced Strawberries (+₦200)',
  'Dark Chocolate Curls (+₦150)',
  'Passion Fruit Coulis Swirl (+₦100)',
];

export const ENUGU_AREAS = [
  'Independence Layout',
  'GRA Enugu',
  'New Haven',
  'Trans-Ekulu',
  'Ogui Road / Asata',
  'UNEC Campus / Achara Layout',
  'Coal City Garden Estate',
  'Golf Estate',
  'Thinkers Corner',
  'Abakpa Nike',
];
