import { createClient } from "@supabase/supabase-js";
var supabase = createClient("https://your-project-id.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZlcmVuY2UiOiJ5b3VyLXByb2plY3QtaWQiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoyMDAwMDAwMDAwfQ.dummy_key_replace_with_real_supabase_anon_key", { auth: {
	persistSession: true,
	autoRefreshToken: true,
	detectSessionInUrl: true,
	storageKey: "cancelkit-auth-token"
} });
//#endregion
export { supabase as t };
