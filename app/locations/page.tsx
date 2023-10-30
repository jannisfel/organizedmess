import Link from "next/link";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { useProtected } from "@/lib/protectedRoute";
import type { Database } from "@/lib/database.types";
import LocationPreview from "@/components/LocationPreview";

async function LocationsList() {
  const supabase = createServerActionClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <></>;
  }

  const { data } = await supabase
    .from("locations")
    .select("*")
    .eq("created_by", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="grid grid-cols-1 gap-2 mt-4">
      <Link
        href="/locations/create"
        className="bg-gray-200 text-gray-800 p-4 rounded-xl border"
      >
        Create a new location
      </Link>
      {data?.map((location) => (
        <LocationPreview location={location} key={location.id} />
      ))}
    </div>
  );
}

export default function Locations() {
  useProtected();

  return (
    <section>
      <h1 className="text-2xl font-bold">Locations</h1>
      <LocationsList />
    </section>
  );
}
