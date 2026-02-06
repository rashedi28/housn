import { createClient } from "./server";
import { Gift, Category } from "@/types";

export async function getGifts(categoryId?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("gifts")
    .select("*, category:categories(*)")
    .order("created_at", { ascending: false });

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return (data || []) as Gift[];
}

export async function getGiftById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gifts")
    .select("*, category:categories(*)")
    .eq("id", id)
    .single();

  // Handle PGRST116 error (no rows found) gracefully
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }
  return data as Gift | null;
}

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name_ar", { ascending: true });

  if (error) throw error;
  return (data || []) as Category[];
}

export async function getCategoryById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  // Handle PGRST116 error (no rows found) gracefully
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }
  return data as Category | null;
}

export async function createGift(gift: Omit<Gift, "id" | "created_at" | "updated_at">) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gifts")
    .insert(gift as any)
    .select()
    .single();

  if (error) throw error;
  return data as Gift;
}

export async function updateGift(id: string, gift: Partial<Gift>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gifts")
    // @ts-expect-error - Supabase types issue
    .update(gift)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Gift;
}

export async function deleteGift(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("gifts").delete().eq("id", id);

  if (error) throw error;
}

export async function createCategory(category: Omit<Category, "id" | "created_at" | "updated_at">) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .insert(category as any)
    .select()
    .single();

  if (error) throw error;
  return data as Category;
}

export async function updateCategory(id: string, category: Partial<Category>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    // @ts-expect-error - Supabase types issue
    .update(category)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Category;
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  // Check if category has gifts
  const { data: gifts } = await supabase
    .from("gifts")
    .select("id")
    .eq("category_id", id)
    .limit(1);

  if (gifts && gifts.length > 0) {
    throw new Error("Cannot delete category with associated gifts");
  }

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) throw error;
}
