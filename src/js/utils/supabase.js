import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
);

async function setSupabaseStorage(idUrls) {
  try {
    const { error } = await supabase.from("bookmarks").insert(idUrls);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
  }
}

async function getSupabaseStorage() {
  try {
    const { data, error } = await supabase.from("bookmarks").select();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function findInSupabaseStorage(id) {
  const bookmarks = await getSupabaseStorage();
  if (bookmarks) {
    const res = bookmarks.find((item) => {
      return item.id === id;
    });
    console.log(res);
    return res;
  }
}

export { setSupabaseStorage, getSupabaseStorage, findInSupabaseStorage };
