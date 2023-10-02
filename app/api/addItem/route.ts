import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect("/login");
  }

  const body = await request.json();

  //  created_at?: string
  //  created_by?: string | null
  // description?: string | null
  // expires_at?: string | null
  //  id?: string
  // item_type?: string | null
  // location: string
  // name: string
  //  updated_at?: string

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
