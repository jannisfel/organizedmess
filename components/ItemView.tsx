// @ts-ignore
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Link from "next/link";
import type { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LinkQRCode from "./LinkQRCode";

// item: {
//   created_at: string;
//   created_by: string;
//   description: string | null;
//   expires_at: string | null;
//   id: string;
//   item_type: string | null;
//   location: string;
//   name: string;
//   updated_at: string;
// }

export default async function ItemView({
  item,
}: {
  item: Database["public"]["Tables"]["items"]["Row"];
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  let locationData: Database["public"]["Tables"]["locations"]["Row"] | null =
    null;
  if (item.location) {
    locationData = (
      await supabase
        .from("locations")
        .select("*")
        .eq("id", item.location)
        .single()
    ).data;
  }

  return (
    <Card shadow="md">
      <div className="flex justify-between">
        <div>
          <CardHeader>
            <h1>{item.name}</h1>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400">
            <p>{item.description}</p>
          </CardBody>
          <CardFooter className="gap-3 flex-wrap">
            {locationData && (
              <div className="flex gap-1">
                <p className=" text-default-400 text-small">Location:</p>
                <p className="font-semibold text-default-400 text-small">
                  {locationData?.name || "Unknown Location"}
                </p>
              </div>
            )}

            {item.item_type && (
              <div className="flex gap-1">
                <p className=" text-default-400 text-small">Type:</p>
                <p className="font-semibold text-default-400 text-small">
                  {item.item_type}
                </p>
              </div>
            )}

            {item.expires_at && (
              <div className="flex gap-1">
                <p className=" text-default-400 text-small">Expires:</p>
                <p className="font-semibold text-default-400 text-small">
                  {new Date(item.expires_at).toLocaleDateString()}
                </p>
              </div>
            )}
          </CardFooter>
        </div>
        <div>
          <LinkQRCode />
        </div>
      </div>
    </Card>
  );
}
