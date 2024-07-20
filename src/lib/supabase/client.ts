import envConfig from "@/config/dotenv";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = envConfig.supabaseUrl;
const supabaseAnonKey = envConfig.supabaseKey;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
