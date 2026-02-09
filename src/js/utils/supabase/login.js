import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const signInGithub = async () => {
  const authentificationUrl = import.meta.env.VITE_SITE_URL + "/auth/callback";
  try {
    const { data, errorSignIn } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: authentificationUrl,
      },
    });
    console.log("data:", data, "errorSignIn:", errorSignIn);
  } catch (error) {
    console.error(error);
  }
};

export { signInGithub, supabase };
