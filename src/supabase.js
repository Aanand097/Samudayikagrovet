import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pelwuoapihfdscgmiauk.supabase.co";
const supabaseKey = "PASTE_YOUR_ANON_KEY_HERE";

export const supabase = createClient(supabaseUrl, supabaseKey);