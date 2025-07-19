export interface FoodStall {
  id: string;
  name: string;
  location: string;
  description: string;
  mustTryDish: string;
  approximatePrice: number;
  imageUrl: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
} 