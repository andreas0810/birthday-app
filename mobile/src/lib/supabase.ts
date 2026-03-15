import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://dnhjtoxfttnzwahbrdgb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuaGp0b3hmdHRuendhaGJyZGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NDM1NTcsImV4cCI6MjA4OTExOTU1N30.eht8rrChKJlPAMiX_7UMEBoD-okM79dQ6kM1C6JcBRo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
