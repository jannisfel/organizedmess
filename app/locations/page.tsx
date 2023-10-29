import Link from "next/link";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { ProtectRoute } from "@/lib/protectedRoute";
import type { Database } from "@/lib/database.types";

async function LocationsList() {
  const supabase = createServerActionClient<Database>({ cookies });

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
    .order("created_at", { ascending: false });

  return (
    <div className="grid grid-cols-1 gap-2 mt-4">
      <Link
        href="/locations/create"
        className="bg-gray-200 text-gray-800 p-4 rounded-md border"
      >
        Create a new location
      </Link>
      {data?.map((location) => (
        <Link
          href={`/locations/${location.id}`}
          key={location.id}
          className="p-4 my-4 rounded-md border"
        >
          <h2 className="text-xl font-bold">{location.name}</h2>
          <p>{location.description}</p>
        </Link>
      ))}
    </div>
  );
}

export default function Locations() {
  return (
    <ProtectRoute>
      <section>
        <h1 className="text-2xl font-bold">Locations</h1>
        <LocationsList />
      </section>
    </ProtectRoute>
  );
}
