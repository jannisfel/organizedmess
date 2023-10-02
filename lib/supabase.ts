import { createClient } from '@supabase/supabase-js';
import { env } from './env';
import type { Database } from './database.types';

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
