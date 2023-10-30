import LinkQRCode from "@/components/LinkQRCode";
import { Database } from "@/lib/database.types";
import { useProtected } from "@/lib/protectedRoute";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import QRCode from "react-qr-code";

async function ItemDetails({ id }: { id: string }) {
  const supabase = createServerComponentClient<Database>({ cookies });

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
    .eq("id", id)
    .single();

  return (
    <div>
      <h2 className="text-xl font-bold">{data?.name}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default function Item({ params: { id } }: { params: { id: string } }) {
  useProtected();

  return (
    <section>
      <h1 className="text-2xl font-bold">Item</h1>
      <ItemDetails id={id} />
      <LinkQRCode />
    </section>
  );
}
