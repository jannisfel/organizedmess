import ItemView from "@/components/ItemView";
import LinkQRCode from "@/components/LinkQRCode";
import { Database } from "@/lib/database.types";
import { useProtected } from "@/lib/protectedRoute";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function ItemDetails({ id }: { id: string }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <></>;
  }

  const { data } = await supabase
    .from("items")
    .select("*")
    .eq("created_by", user.id)
    .eq("id", id)
    .single();

  

  return <div>
    {data && <ItemView item={data} />}
  </div>;
}

export default async function Item({
  params: { id },
}: {
  params: { id: string };
}) {
  const notProtected = await useProtected();
  if (notProtected) {
    return notProtected;
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Item</h1>
      <ItemDetails id={id} />
      
    </section>
  );
}
