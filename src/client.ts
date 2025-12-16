import { createClient } from '@supabase/supabase-js';

// Replace these with your real values:
const SUPABASE_URL = 'https://lzpsdaqmfzvlwejllbvl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6cHNkYXFtZnp2bHdlamxsYnZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNzkyNDgsImV4cCI6MjA3OTk1NTI0OH0.4o7VD2F6EIjsyoEz43QCFFFrr_8kPzKotdbUxY58aVU'

// Create the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
