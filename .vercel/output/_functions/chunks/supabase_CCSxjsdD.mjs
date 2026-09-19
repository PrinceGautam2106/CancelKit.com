import { createClient } from "@supabase/supabase-js";
var supabase = createClient("https://srgmysjkpmduhxhhbwrc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyZ215c2prcG1kdWh4aGhid3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NDgzNDMsImV4cCI6MjEwNTAyNDM0M30.6j_OT1oVOsZzMZjtuHYZBEOZrsrcVZvBChWoahLm42o", { auth: {
	persistSession: true,
	autoRefreshToken: true,
	detectSessionInUrl: true,
	storageKey: "cancelkit-auth-token"
} });
//#endregion
export { supabase as t };
