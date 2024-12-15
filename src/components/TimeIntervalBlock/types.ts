export interface Event {
  title: string;
  description: string;
  date: string;
}

export interface TimeInterval {
  title: string;
  description: string;
  events: Event[];
}

export interface CategoryCard {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface Category {
  id: number;
  label: string;
  cards: CategoryCard[];
}