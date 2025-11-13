// lib/supabase.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase'; // Nous allons le générer

export const supabase = createClientComponentClient<Database>();
