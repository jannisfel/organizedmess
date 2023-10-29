import Link from "next/link";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { ProtectRoute } from "@/lib/protectedRoute";
import type { Database } from "@/lib/database.types";

async function ItemsList() {
  const supabase = createServerActionClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data } = await supabase
    .from("items")
    .select("*")
    .eq("created_by", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="grid grid-cols-1 gap-2 mt-4">
      <Link
        href="/items/create"
        className="bg-gray-200 text-gray-800 p-4 rounded-md border"
      >
        Create a new item
      </Link>
      {data?.map((item) => (
        <Link
          href={`/items/${item.id}`}
          key={item.id}
          className="p-4 my-4 rounded-md border"
        >
          <h2 className="text-xl font-bold">{item.name}</h2>
          <p>{item.description}</p>
        </Link>
      ))}
    </div>
  );
}

export default function Items() {
  return (
    <ProtectRoute>
      <section>
        <h1 className="text-2xl font-bold">Items</h1>
        <ItemsList />
      </section>
    </ProtectRoute>
  );
}
