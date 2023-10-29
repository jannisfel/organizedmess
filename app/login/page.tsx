import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LoginForm from "@/components/LoginForm";
import { Database } from "@/lib/database.types";

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const doSignup = async ({ id, name }: { id: string; name: string }) => {
    "use server";

    // TODO: check if user is allowed to sign up

    const supabase = createServerActionClient<Database>({ cookies });
    const res = await supabase.from("users").select("id").match({ id });

    if (!res.data || res.data.length <= 0) {
      await supabase.from("users").insert({ id, name });
    }
  };

  return <LoginForm session={session} doSignup={doSignup} />;
}
