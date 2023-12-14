import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

//components
import CreateForm from "./CreateForm";
import BeforeLoginSignup from "@/components/BeforeLoginSignup";

export default async function AddSuccess() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data.session)
    return (
      <main>
        <h2 className="text-center">Add a new success</h2>
        <CreateForm />
      </main>
    );
  else return <BeforeLoginSignup />;
}
