import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Copy .env.example to .env and fill in your project's values."
  );
}

export const supabase = createClient(url, anonKey);

const localStoragePrefix = "legal-perspective:";
let remoteStorageAvailable = true;

function localStorageGet(key) {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(`${localStoragePrefix}${key}`);
  return value === null ? null : { key, value, shared: false };
}

function localStorageSet(key, value) {
  if (typeof window !== "undefined") window.localStorage.setItem(`${localStoragePrefix}${key}`, value);
  return { key, value, shared: false };
}

/**
 * Minimal stand-in for the window.storage.get/set API the component was
 * originally written against, backed by a single-row key/value table
 * (see supabase/schema.sql). Keeps the rest of the app's code unchanged.
 */
export async function storageGet(key) {
  if (!remoteStorageAvailable) return localStorageGet(key);
  const { data, error } = await supabase.from("kv_store").select("value").eq("key", key).maybeSingle();
  if (error) {
    remoteStorageAvailable = false;
    console.warn("Supabase storage unavailable; using local browser storage.");
    return localStorageGet(key);
  }
  if (!data) return null;
  return { key, value: data.value, shared: true };
}

export async function storageSet(key, value) {
  if (!remoteStorageAvailable) return localStorageSet(key, value);
  const { error } = await supabase
    .from("kv_store")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
  if (error) {
    remoteStorageAvailable = false;
    console.warn("Supabase storage unavailable; saving to local browser storage.");
    return localStorageSet(key, value);
  }
  return { key, value, shared: true };
}
