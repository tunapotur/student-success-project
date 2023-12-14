import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function getSuccess(id) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase
    .from("successes")
    .select()
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  return data;
}
