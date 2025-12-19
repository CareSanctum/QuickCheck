import { createClient } from "@supabase/supabase-js";
import { Database } from '../types/supabase-db.types'
import { MMKV_SUPABASE } from '../Storage';

const supabaseUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}`;
const supabaseAnonKey = `${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: MMKV_SUPABASE,
        autoRefreshToken: true,
        persistSession: true,
    }
});

console.log("supabase url in native", supabaseUrl);

