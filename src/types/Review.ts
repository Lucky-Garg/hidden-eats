export interface Review {
  id?: string;
  stallId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
} 