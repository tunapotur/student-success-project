"use client";

import Link from "next/link";

// icons & UI
import { TiEdit } from "react-icons/ti";

export default function EditButton({ id }) {
  return (
    <Link href={`/editSuccess/${id}`} className="ml-auto">
      <button className="btn-primary">
        <TiEdit />
        Update
      </button>
    </Link>
  );
}
