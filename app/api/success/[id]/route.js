import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {
  const id = params.id;

  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.from("successes").delete().eq("id", id);

  return NextResponse.json({ error });
}

// TODO api de bu fonksiyonları çalışır hale getir
export async function PUT(request, { params }) {
  const id = params.id;
  const { newTitle, newDescription, newDate } = await request.json();

  const supabase = createRouteHandlerClient({ cookies });

  await supabase
    .from("successes")
    .update({ title: newTitle, description: newDescription, date: newDate })
    .eq("id", id);

  return NextResponse.json({ message: "Success updated" }, { status: 200 });
}
