// src/lib/supabase/client.ts

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Ensure environment variables are loaded (e.g., in .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_PROJECT_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.anon_key || '';

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
    try {
        // Create the Supabase client instance
        supabase = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
            },
            global: {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${supabaseAnonKey}`
                },
            },
        });
        console.log("Supabase client initialized successfully.");
    } catch (error) {
        console.error("Supabase client initialization error:", error);
    }

} else {
    console.warn(
        "Supabase URL or Anon Key is missing in environment variables. Supabase client not initialized. Check SUPABASE_PROJECT_URL and anon_key."
    );
}

// Export the initialized client (or null if initialization failed)
export { supabase };

// Export default client as well for potential convenience
export default supabase;