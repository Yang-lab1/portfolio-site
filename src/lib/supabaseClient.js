const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ||
  import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseKey);

let supabasePromise = null;

export async function getSupabaseClient() {
  if (!hasSupabaseConfig) return null;

  if (!supabasePromise) {
    supabasePromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(supabaseUrl, supabaseKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }),
    );
  }

  return supabasePromise;
}

export async function warmSupabaseConnection() {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { ready: false, reason: 'missing-env' };
  }

  const { error } = await supabase.from('portfolio_health').select('id').limit(1);
  if (error) {
    return { ready: false, reason: error.message };
  }

  return { ready: true, reason: 'connected' };
}
