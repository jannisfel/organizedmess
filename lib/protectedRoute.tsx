import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "./database.types";
import RedirectClient from "@/components/RedirectClient";

export async function useProtected() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.log(session);

    return <RedirectClient href="/login" />;
  }
}
