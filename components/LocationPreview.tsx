// @ts-ignore
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Link from "next/link";
import type { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// location: {
//   created_at: string;
//   created_by: string;
//   description: string | null;
//   id: string;
// }

export default async function LocationPreview({
  location,
}: {
  location: Database["public"]["Tables"]["locations"]["Row"];
}) {
  return (
    <Link href={`/locations/${location.id}`}>
      <Card shadow="md">
        <CardHeader>
          <h1>{location.name}</h1>
        </CardHeader>
        <CardBody className="px-3 pt-0 pb-3 text-small text-default-400">
          <p>{location.description}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
