import { Suspense } from "react";
import Loading from "./loading";
import Link from "next/link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

async function getSuccess() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("successes").select();

  if (error) {
    console.log(error.message);
  }

  return data;
}

export default async function SuccessesHomePage() {
  const allsuccesses = await getSuccess();
  allsuccesses.sort((a, b) => b.id - a.id);

  return (
    <main>
      <nav>
        <div>
          <h2>Add Success</h2>
          <p>
            <small>do not leave your success without record.</small>
          </p>
        </div>
        <Link href="/createSuccess" className="ml-auto">
          <button className="btn-primary">New Success</button>
        </Link>
      </nav>
      <Suspense fallback={<Loading />}>
        {allsuccesses.map((success) => (
          <div key={success.id} className="card my-5">
            <Link href={`/detailSuccess/${success.id}`}>
              <h3>{success.title}</h3>
              <p>{success.description.slice(0, 200)}...</p>
              <div className={`pill low`}>{success.date}</div>
            </Link>
          </div>
        ))}
        {allsuccesses.length === 0 && (
          <p className="text-center">There are no open tickets!</p>
        )}
      </Suspense>
    </main>
  );
}
