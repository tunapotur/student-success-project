"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getCurrentDateInput = () => {
  const dateObj = new Date();

  // get the month in this format of 04, the same for months
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);
  const year = dateObj.getFullYear();

  const shortDate = `${year}-${month}-${day}`;

  return shortDate;
};

export default function CreateForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(getCurrentDateInput());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    document.title = "Successes | Add a new success";

    return () => {
      document.title = "Successes";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newSuccess = { title, description, date };

    const res = await fetch(`http://localhost:8080/api/success`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSuccess),
    });

    const json = await res.json();

    if (json.error) {
      console.log(error);
      setIsLoading(false);
    }
    if (json.data) {
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
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add</span>}
      </button>
    </form>
  );
}
