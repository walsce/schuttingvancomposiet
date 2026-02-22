export type Tone = 'teak' | 'zwart' | 'walnoot' | 'eiken' | 'grijs';
export type Durability = 'standaard' | 'premium' | 'massief';
export type ProductType = 'plank' | 'paneel' | 'profiel';
export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-az' | 'name-za';

export interface Product {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  image: string;
  category: 'gevelbekleding' | 'schuttingen' | 'vlonderplanken';
  features: string[];
  guarantee: string;
  slug: string;
  tone: Tone;
  durability: Durability;
  productType: ProductType;
}

export const toneLabels: Record<Tone, string> = {
  teak: 'Teak',
  zwart: 'Zwart',
  walnoot: 'Walnoot',
  eiken: 'Eiken',
  grijs: 'Grijs',
};

export const durabilityLabels: Record<Durability, string> = {
  standaard: 'Standaard',
  premium: 'Premium (Co-Extrusie)',
  massief: 'Massief Naadloos',
};

export const productTypeLabels: Record<ProductType, string> = {
  plank: 'Plank / Paneel',
  paneel: 'Compleet Scherm',
  profiel: 'Profiel / Onderdeel',
};

export const products: Product[] = [
  // GEVELBEKLEDING
  { id: 'gv-1', name: 'Composiet gevelbekleding Rhombus Teak', price: 25.95, priceLabel: '€25,95 per stuk', image: 'https://www.mthekwerken.nl/wp-content/uploads/1-Teak-3-533x355-1-300x200.png', category: 'gevelbekleding', features: ['Co-Extrusie beschermlaag', 'Eigen bezorgservice'], guarantee: '15 jaar garantie', slug: 'rhombus-teak', tone: 'teak', durability: 'premium', productType: 'plank' },
  { id: 'gv-2', name: 'Composiet gevelbekleding Rhombus Teak/zwart', price: 25.95, priceLabel: '€25,95 per stuk', image: 'https://www.mthekwerken.nl/wp-content/uploads/Teak-zwart-533x355-1-300x200.png', category: 'gevelbekleding', features: ['Co-Extrusie beschermlaag', 'Eigen bezorgservice'], guarantee: '15 jaar garantie', slug: 'rhombus-teak-zwart', tone: 'teak', durability: 'premium', productType: 'plank' },
  { id: 'gv-3', name: 'Composiet gevelbekleding Rhombus Zwart', price: 25.95, priceLabel: '€25,95 per stuk', image: 'https://www.mthekwerken.nl/wp-content/uploads/Gevelbekleding-zwart-533x355-1-300x200.png', category: 'gevelbekleding', features: ['Co-Extrusie beschermlaag', 'Eigen bezorgservice'], guarantee: '15 jaar garantie', slug: 'rhombus-zwart', tone: 'zwart', durability: 'premium', productType: 'plank' },
  { id: 'gv-4', name: 'Composiet gevelbekleding Rhombus Walnoot', price: 25.95, priceLabel: '€25,95 per stuk', image: 'https://www.mthekwerken.nl/wp-content/uploads/Walnoot-gevelbekleding-533x355-1-300x200.png', category: 'gevelbekleding', features: ['Co-Extrusie beschermlaag', 'Eigen bezorgservice'], guarantee: '15 jaar garantie', slug: 'rhombus-walnoot', tone: 'walnoot', durability: 'premium', productType: 'plank' },
  { id: 'gv-5', name: 'Composiet gevelbekleding Rhombus Eiken', price: 25.95, priceLabel: '€25,95 per stuk', image: 'https://www.mthekwerken.nl/wp-content/uploads/gevelbekleding-eiken-533x355-1-300x200.png', category: 'gevelbekleding', features: ['Co-Extrusie beschermlaag', 'Eigen bezorgservice'], guarantee: '15 jaar garantie', slug: 'rhombus-eiken', tone: 'eiken', durability: 'premium', productType: 'plank' },
  { id: 'gv-6', name: 'Composiet gevelbekleding Rhombus Grijs/zwart', price: 25.95, priceLabel: '€25,95 per stuk', image: 'https://www.mthekwerken.nl/wp-content/uploads/gevelbekleding-grijszwart-300x200.png', category: 'gevelbekleding', features: ['Co-Extrusie beschermlaag', 'Eigen bezorgservice'], guarantee: '15 jaar garantie', slug: 'rhombus-grijs-zwart', tone: 'grijs', durability: 'premium', productType: 'plank' },
  { id: 'gv-7', name: 'Hoekprofiel Composiet gevelbekleding Teak', price: 19.95, priceLabel: '€19,95 per stuk', image: 'https://www.mthekwerken.nl/wp-content/uploads/composiet-hoekprofiel-teak-533x355-1-300x200.png', category: 'gevelbekleding', features: ['Strakke afwerking', 'Eigen bezorgservice'], guarantee: '15 jaar garantie', slug: 'hoekprofiel-teak', tone: 'teak', durability: 'premium', productType: 'profiel' },
  { id: 'gv-8', name: 'Hoekprofiel Composiet gevelbekleding Zwart', price: 19.95, priceLabel: '€19,95 per stuk', image: 'https://www.mthekwerken.nl/wp-content/uploads/Composiet-hoekprofiel-zwart-533x355-1-300x200.png', category: 'gevelbekleding', features: ['Strakke afwerking', 'Eigen bezorgservice'], guarantee: '15 jaar garantie', slug: 'hoekprofiel-zwart', tone: 'zwart', durability: 'premium', productType: 'profiel' },

  // SCHUTTINGEN
  { id: 'sc-1', name: 'Composiet schutting Rhombus Teak', price: 139.95, priceLabel: 'Vanaf €139,95', image: 'https://www.mthekwerken.nl/wp-content/uploads/macom-modern-teak-product-foto-4-300x200.png', category: 'schuttingen', features: ['Extra dikke 2,5cm plank', 'Eenvoudig te monteren'], guarantee: '15 jaar garantie', slug: 'schutting-rhombus-teak', tone: 'teak', durability: 'premium', productType: 'paneel' },
  { id: 'sc-2', name: 'Composiet schutting Teak', price: 139.95, priceLabel: 'Vanaf €139,95', image: 'https://www.mthekwerken.nl/wp-content/uploads/Macom-composiet-teak-product-foto-4-300x200.png', category: 'schuttingen', features: ['Extra dikke 2,5cm plank', 'Eenvoudig te monteren'], guarantee: '15 jaar garantie', slug: 'schutting-teak', tone: 'teak', durability: 'premium', productType: 'paneel' },
  { id: 'sc-3', name: 'Composiet schutting Rhombus Zwart', price: 139.95, priceLabel: 'Vanaf €139,95', image: 'https://www.mthekwerken.nl/wp-content/uploads/Macom-composiet-modern-zwart-product-foto-4-300x200.png', category: 'schuttingen', features: ['Extra dikke 2,5cm plank', 'Eenvoudig te monteren'], guarantee: '15 jaar garantie', slug: 'schutting-rhombus-zwart', tone: 'zwart', durability: 'premium', productType: 'paneel' },
  { id: 'sc-4', name: 'Composiet schutting Zwart', price: 139.95, priceLabel: 'Vanaf €139,95', image: 'https://www.mthekwerken.nl/wp-content/uploads/Macom-composiet-zwart-product-foto-4-300x200.png', category: 'schuttingen', features: ['Extra dikke 2,5cm plank', 'Eenvoudig te monteren'], guarantee: '15 jaar garantie', slug: 'schutting-zwart', tone: 'zwart', durability: 'premium', productType: 'paneel' },
  { id: 'sc-5', name: 'Composiet schutting Rhombus Walnoot', price: 139.95, priceLabel: 'Vanaf €139,95', image: 'https://www.mthekwerken.nl/wp-content/uploads/Product-foto-Rhombus-Walnoot-4-300x200.png', category: 'schuttingen', features: ['Extra dikke 2,5cm plank', 'Onderhoudsvrij'], guarantee: '15 jaar garantie', slug: 'schutting-rhombus-walnoot', tone: 'walnoot', durability: 'premium', productType: 'paneel' },
  { id: 'sc-6', name: 'Composiet schutting Walnoot', price: 139.95, priceLabel: 'Vanaf €139,95', image: 'https://www.mthekwerken.nl/wp-content/uploads/Walnoot-Houtnerf-product-foto-4-300x200.png', category: 'schuttingen', features: ['Extra dikke 2,5cm plank', 'Onderhoudsvrij'], guarantee: '15 jaar garantie', slug: 'schutting-walnoot', tone: 'walnoot', durability: 'premium', productType: 'paneel' },
  { id: 'sc-7', name: 'Composiet schutting Rhombus Eiken', price: 139.95, priceLabel: 'Vanaf €139,95', image: 'https://www.mthekwerken.nl/wp-content/uploads/Schutting-Rhombus-Eiken-website-300x200.png', category: 'schuttingen', features: ['Extra dikke 2,5cm plank', 'Onderhoudsvrij'], guarantee: '15 jaar garantie', slug: 'schutting-rhombus-eiken', tone: 'eiken', durability: 'premium', productType: 'paneel' },
  { id: 'sc-8', name: 'Composiet schutting Rhombus Grijs', price: 139.95, priceLabel: 'Vanaf €139,95', image: 'https://www.mthekwerken.nl/wp-content/uploads/Rhombus-grijs-product-foto-4-300x200.png', category: 'schuttingen', features: ['Extra dikke 2,5cm plank', 'Onderhoudsvrij'], guarantee: '15 jaar garantie', slug: 'schutting-rhombus-grijs', tone: 'grijs', durability: 'premium', productType: 'paneel' },

  // VLONDERPLANKEN
  { id: 'vl-1', name: 'Composiet vlonderplank Donker Grijs', price: 16.95, priceLabel: 'Vanaf €16,95', image: 'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-standaard-donker-grijs-300x369.png', category: 'vlonderplanken', features: ['Twee afwerkingen', 'Los of met clips'], guarantee: 'Scherp geprijsd', slug: 'vlonder-donker-grijs', tone: 'grijs', durability: 'standaard', productType: 'plank' },
  { id: 'vl-2', name: 'Composiet vlonderplank Teak', price: 16.95, priceLabel: 'Vanaf €16,95', image: 'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-standaard-Teak-1-300x372.png', category: 'vlonderplanken', features: ['Twee afwerkingen', 'Los of met clips'], guarantee: 'Scherp geprijsd', slug: 'vlonder-teak', tone: 'teak', durability: 'standaard', productType: 'plank' },
  { id: 'vl-3', name: 'Composiet vlonderplank Vergrijsd Eiken', price: 16.95, priceLabel: 'Vanaf €16,95', image: 'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-standaard-vergrijst-eiken-300x350.png', category: 'vlonderplanken', features: ['Twee afwerkingen', 'Los of met clips'], guarantee: 'Scherp geprijsd', slug: 'vlonder-vergrijsd-eiken', tone: 'eiken', durability: 'standaard', productType: 'plank' },
  { id: 'vl-4', name: 'Composiet vlonderplank Walnoot', price: 16.95, priceLabel: 'Vanaf €16,95', image: 'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-standaard-walnoot-300x343.png', category: 'vlonderplanken', features: ['Twee afwerkingen', 'Los of met clips'], guarantee: 'Scherp geprijsd', slug: 'vlonder-walnoot', tone: 'walnoot', durability: 'standaard', productType: 'plank' },
  { id: 'vl-5', name: 'Composiet vlonderplank naadloos massief Donker Grijs', price: 24.95, priceLabel: 'Vanaf €24,95', image: 'https://www.mthekwerken.nl/wp-content/uploads/Composiet-vlonderplank-massief-naadloos-donker-grijs-300x450.png', category: 'vlonderplanken', features: ['Massief met antislip', 'Naadloos design'], guarantee: '15 jaar garantie', slug: 'vlonder-massief-grijs', tone: 'grijs', durability: 'massief', productType: 'plank' },
  { id: 'vl-6', name: 'Composiet vlonderplank naadloos massief Teak', price: 24.95, priceLabel: 'Vanaf €24,95', image: 'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-naadloos-massief-Teak-300x450.png', category: 'vlonderplanken', features: ['Massief met antislip', 'Naadloos design'], guarantee: '15 jaar garantie', slug: 'vlonder-massief-teak', tone: 'teak', durability: 'massief', productType: 'plank' },
  { id: 'vl-7', name: 'Composiet vlonderplank naadloos massief Zwart', price: 24.95, priceLabel: 'Vanaf €24,95', image: 'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-massief-naadloos-zwart-300x364.png', category: 'vlonderplanken', features: ['Massief met antislip', 'Naadloos design'], guarantee: '15 jaar garantie', slug: 'vlonder-massief-zwart', tone: 'zwart', durability: 'massief', productType: 'plank' },
];

export const categories = [
  {
    id: 'gevelbekleding',
    name: 'Composiet Gevelbekleding',
    description: 'Premium composiet gevelbekleding die jarenlang mooi blijft. Weerbestendig en onderhoudsvriendelijk.',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/gevelbekleding-rhombus-teakzwart-2-1110x840.jpg',
    slug: 'gevelbekleding',
    productCount: 18,
  },
  {
    id: 'schuttingen',
    name: 'Composiet Schuttingen',
    description: 'Premium composiet schuttingen die jarenlang meegaan. Onderhoudsvrij en stijlvol.',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Highlander-Credits-Sven-Scholten-LR-23.JPG-website-1110x840.jpg',
    slug: 'schuttingen',
    productCount: 34,
  },
  {
    id: 'vlonderplanken',
    name: 'Composiet Vlonderplanken',
    description: 'Duurzame composiet vlonderplanken voor een luxe uitstraling. Splintervrij en kleurvast.',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/NoGap-AntislipTeak-5-1110x840.jpg',
    slug: 'vlonderplanken',
    productCount: 10,
  },
];
