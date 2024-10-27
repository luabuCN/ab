import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database

export const supabaseUrl = process.env.SUPABASE_URL as string;
export const supabaseServiceRoleKey = process.env.SUPABASE_ANON_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
