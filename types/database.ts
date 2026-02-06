export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name_ar: string;
          name_en: string;
          description_ar: string | null;
          description_en: string | null;
          icon: string | null;
          color: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name_ar: string;
          name_en: string;
          description_ar?: string | null;
          description_en?: string | null;
          icon?: string | null;
          color?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name_ar?: string;
          name_en?: string;
          description_ar?: string | null;
          description_en?: string | null;
          icon?: string | null;
          color?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      gifts: {
        Row: {
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
        };
        Insert: {
          id?: string;
          name_ar: string;
          name_en: string;
          description_ar: string;
          description_en: string;
          price: number;
          image_url: string;
          category_id?: string | null;
          available_quantity?: number;
          rating?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name_ar?: string;
          name_en?: string;
          description_ar?: string;
          description_en?: string;
          price?: number;
          image_url?: string;
          category_id?: string | null;
          available_quantity?: number;
          rating?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
