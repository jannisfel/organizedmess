import { Database } from "@/lib/database.types";
import { useProtected } from "@/lib/protectedRoute";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function LocationDetails({ id }: { id: string }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data } = await supabase
    .from("locations")
    .select("*")
    .eq("created_by", user.id)
    .eq("id", id)
    .single();

  return (
    <div>
      <h2 className="text-xl font-bold">{data?.name}</h2>
      <p>{data?.description}</p>
    </div>
  );
}

export default function Location({
  params: { id },
}: {
  params: { id: string };
}) {
  useProtected();

  return (
    <section>
      <h1 className="text-2xl font-bold">Location</h1>
      <LocationDetails id={id} />
    </section>
  );
}
