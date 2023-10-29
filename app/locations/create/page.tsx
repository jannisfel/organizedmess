import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AddLocationForm from "@/components/AddLocationForm";
import { FormState, formStateSchema } from "./schema";
import type { Database } from "@/lib/database.types";

export default function Home() {
  const createLocation = async (data: FormState) => {
    "use server";

    formStateSchema.parse(data);

    const supabase = createServerActionClient<Database>({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const { error } = await supabase
      .from("locations")
      .insert({ ...data, created_by: user.id });

    if (error) {
      throw error;
    }
  };

  return <AddLocationForm createLocation={createLocation} />;
}
