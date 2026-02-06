export interface Category {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar?: string;
  description_en?: string;
  icon?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export interface Gift {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  price: number;
  image_url: string;
  category_id: string | null;
  available_quantity: number;
  rating: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export type Locale = "ar" | "en";
