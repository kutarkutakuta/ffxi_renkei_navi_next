import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!; // SupabaseのURLを設定
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // SupabaseのAPIキーを設定

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
