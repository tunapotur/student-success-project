"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function EditForm({ success }) {
  const router = useRouter();

  const [title, setTitle] = useState(success.title);
  const [description, setDescription] = useState(success.description);
  const [date, setDate] = useState(success.date);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(function () {
    document.title = "Successes | Edit Success ";

    return () => {
      document.title = "Successes";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO fromcheck özlelliğini daha kullanışılı hale getir
    if (!title || !description || !date) {
      setFormError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    /*   const res = await fetch(`http://localhost:8080/api/success/${success.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        date,
      }),
    });
    const json = await res.json();

    if (json.error) {
      console.log(error);
      setIsLoading(false);
    }
    if (json.data) {
      router.refresh();
      router.push("/");
    } */

    const supabase = createClientComponentClient();

    const { error } = await supabase
      .from("successes")
      .update({ title, description, date })
      .eq("id", success.id);

    if (error) {
      console.log(error);
      setIsLoading(false);
    }
    if (!error) {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Description:</span>
        <textarea
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </label>
      <label>
        <span>Date:</span>
        <input
          type="date"
          required
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </label>

      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Editting...</span>}
        {!isLoading && <span>Edit</span>}
      </button>

      {formError && <p className="error">{formError}</p>}
    </form>
  );
}
