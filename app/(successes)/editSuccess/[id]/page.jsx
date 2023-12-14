import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import getSuccess from "@/services/getSuccess";

//components
import EditForm from "./EditForm";
import BeforeLoginSignup from "@/components/BeforeLoginSignup";

export default async function EditSuccess({ params }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  const success = await getSuccess(params.id);

  if (data.session)
    return (
      <main>
        <h2 className="text-center">Edit Success</h2>
        <EditForm success={success} />
      </main>
    );
  else return <BeforeLoginSignup />;
}
