import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import getSuccess from "@/services/getSuccess";

// components
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: success } = await supabase
    .from("successes")
    .select()
    .eq("id", params.id)
    .single();

  return {
    title: `Success | ${success?.title || "Success not Found"}`,
  };
}

export default async function SuccessDetail({ params }) {
  const success = await getSuccess(params.id);

  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  return (
    <main>
      <nav>
        <h2>Success Details</h2>
        {data.session && data.session.user.email === success.user_email && (
          <div className="ml-auto flex space-x-3">
            <EditButton id={success.id} />
            <DeleteButton id={success.id} />
          </div>
        )}
      </nav>
      <div className="card">
        <h3>{success.title}</h3>
        <small>Created by {success.user_email}</small>
        <p>{success.description}</p>
        <div className={`pill low`}>{success.date}</div>
      </div>
    </main>
  );
}
