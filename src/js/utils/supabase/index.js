import { signInGithub, supabase } from "./login";

// const {
//   data: { session },
// } = await supabase.auth.getSession();

// if (!session) {
//   await supabase.auth.signInWithOAuth({
//     provider: "github",
//     options: { redirectTo: `${window.location.origin}/auth/callback` },
//   });
// }

const {
  data: { user },
  error: authError,
} = await supabase.auth.getUser();
console.log("user:", user, "authError:", authError);

const {
  data: { session },
} = await supabase.auth.getSession();

if (!session) {
  signInGithub();
}

async function setSupabaseStorage(idUrls) {
  try {
    idUrls.forEach((idUrl) => {
      idUrl.user_id = user.id;
    });
    console.log(idUrls);

    const { data: deletedRows, error: errorDelete } = await supabase
      .from("favBookmarks")
      .delete()
      .eq("user_id", user.id)
      .select();

    if (errorDelete) {
      console.error("Erreur DELETE:", errorDelete);
      throw errorDelete;
    }

    const { error: errorInsert } = await supabase
      .from("favBookmarks")
      .insert(idUrls);

    if (errorInsert) {
      console.error("Erreur INSERT:", errorInsert);
      throw errorInsert;
    }
  } catch (err) {
    console.error(err);
  }
}

async function getSupabaseStorage() {
  try {
    const { data, error } = await supabase.from("favBookmarks").select("*");
    if (error) {
      throw error;
    }
    if (!data) {
      return null;
    }
    console.log(data);
    // console.log(user);

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
    return res;
  }
}

export { setSupabaseStorage, getSupabaseStorage, findInSupabaseStorage };
