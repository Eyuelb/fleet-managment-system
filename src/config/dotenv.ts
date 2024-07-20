const envConfig = {
  databaseUrl:process.env.NEXT_PUBLIC_DATABASE_URL || "",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  supabaseS3AccessKey: process.env.NEXT_PUBLIC_SUPABASE_S3_ACCESS_KEY || "",
  supabaseS3SecretKey: process.env.NEXT_PUBLIC_SUPABASE_S3_SECRET_KEY || "",
};

if (!envConfig.supabaseUrl) throw new Error("Supabase URL not found.");
if (!envConfig.supabaseKey) throw new Error("Supabase Anon key not found.");
if (!envConfig.databaseUrl) throw new Error("Database Url not found.");

export default envConfig;
