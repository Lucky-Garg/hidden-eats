import type { FoodStall } from '../types/FoodStall';
import type { Review } from '../types/Review';

// Mock current user
export const currentUser = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com'
};

class LocalStorageService {
  private readonly STALLS_KEY = 'foodStalls';
  private readonly REVIEWS_KEY = 'reviews';

  constructor() {
    // Initialize storage if empty
    if (!localStorage.getItem(this.STALLS_KEY)) {
      localStorage.setItem(this.STALLS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.REVIEWS_KEY)) {
      localStorage.setItem(this.REVIEWS_KEY, JSON.stringify([]));
    }

    // Add some demo data if no stalls exist
    const stalls = this.getAllStalls();
    if (stalls.length === 0) {
      this.addStall({
        name: "Joe's Street Tacos",
        location: "Downtown",
        description: "Authentic Mexican street tacos with homemade salsas",
        mustTryDish: "Al Pastor Tacos",
        approximatePrice: 8,
        imageUrl: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=800",
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      this.addStall({
        name: "Mei's Dumplings",
        location: "Chinatown",
        description: "Handmade dumplings and noodles, family recipes",
        mustTryDish: "Xiaolongbao",
        approximatePrice: 12,
        imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800",
        rating: 4.8,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      this.addStall({
        name: "Curry Express",
        location: "Little India",
        description: "Quick and delicious Indian street food",
        mustTryDish: "Butter Chicken",
        approximatePrice: 10,
        imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
        rating: 4.2,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  // Stall methods
  getAllStalls(): FoodStall[] {
    const stalls = localStorage.getItem(this.STALLS_KEY);
    return stalls ? JSON.parse(stalls) : [];
  }

  addStall(stall: Omit<FoodStall, 'id'>): FoodStall {
    const stalls = this.getAllStalls();
    const newStall: FoodStall = {
      ...stall,
      id: Date.now().toString(),
    };
    stalls.push(newStall);
    localStorage.setItem(this.STALLS_KEY, JSON.stringify(stalls));
    return newStall;
  }

  getStallById(id: string): FoodStall | undefined {
    const stalls = this.getAllStalls();
    return stalls.find(stall => stall.id === id);
  }

  // Review methods
  getAllReviews(): Review[] {
    const reviews = localStorage.getItem(this.REVIEWS_KEY);
    return reviews ? JSON.parse(reviews) : [];
  }

  addReview(review: Omit<Review, 'id'>): Review {
    const reviews = this.getAllReviews();
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    reviews.push(newReview);
    localStorage.setItem(this.REVIEWS_KEY, JSON.stringify(reviews));

    // Update stall rating
    const stalls = this.getAllStalls();
    const stallIndex = stalls.findIndex(s => s.id === review.stallId);
    if (stallIndex !== -1) {
      const stallReviews = reviews.filter(r => r.stallId === review.stallId);
      const avgRating = stallReviews.reduce((acc, r) => acc + r.rating, 0) / stallReviews.length;
      stalls[stallIndex].rating = avgRating;
      localStorage.setItem(this.STALLS_KEY, JSON.stringify(stalls));
    }

    return newReview;
  }

  getReviewsByStallId(stallId: string): Review[] {
    const reviews = this.getAllReviews();
    return reviews.filter(review => review.stallId === stallId);
  }

  // Image handling
  async uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

export const localStorageService = new LocalStorageService(); 