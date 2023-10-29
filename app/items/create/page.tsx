import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AddItemForm from "@/components/AddItemForm";
import { FormState, formStateSchema } from "./schema";
import { Database } from "@/lib/database.types";

export default function Home() {
  const createItem = async (data: FormState) => {
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
      .from("items")
      .insert({ ...data, created_by: user.id });

    if (error) {
      throw error;
    }
  };

  return <AddItemForm createItem={createItem} />;
}
