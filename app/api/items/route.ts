import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";

const insertItemSchema = z
  .object({
    name: z.string(),
    location: z.string(),
    description: z.string().optional(),
    expires_at: z.string().optional(),
    item_type: z.string().optional(),
  })
  .strict();

export async function POST(request: Request) {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect("/login");
  }

  const body = await request.json();

  const { error } = await supabase.from("items").insert([
    {
      ...insertItemSchema.parse(body),
      created_by: user.id,
    },
  ]);

  if (error) {
    console.error(error);
    return NextResponse.error();
  }

  return NextResponse.redirect("/");
}
