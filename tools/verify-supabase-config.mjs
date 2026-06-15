#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const root = process.cwd();
loadDotEnv(path.join(root, '.env'));
loadDotEnv(path.join(root, '.env.local'));

const supabaseUrl = readEnv('VITE_SUPABASE_URL');
const supabaseKey = readEnv('VITE_SUPABASE_PUBLISHABLE_KEY') || readEnv('VITE_SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseKey) {
  console.error(
    JSON.stringify(
      {
        ready: false,
        reason: 'missing-env',
        required: ['VITE_SUPABASE_URL', 'VITE_SUPABASE_PUBLISHABLE_KEY or VITE_SUPABASE_ANON_KEY'],
      },
      null,
      2,
    ),
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const { data, error } = await supabase.from('portfolio_health').select('id,label,updated_at').limit(1);

if (error) {
  console.error(
    JSON.stringify(
      {
        ready: false,
        reason: error.message,
        hint: 'Run supabase/portfolio_health.sql in the Supabase SQL editor and confirm the anon/publishable key can read the table.',
      },
      null,
      2,
    ),
  );
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ready: true,
      reason: 'connected',
      rows: data?.length ?? 0,
      sample: data?.[0] ?? null,
    },
    null,
    2,
  ),
);

function readEnv(name) {
  return process.env[name]?.trim();
}

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const equals = trimmed.indexOf('=');
    if (equals < 1) continue;
    const key = trimmed.slice(0, equals).trim();
    let value = trimmed.slice(equals + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}
