"use client";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  console.log(params);
  const searchParams = useSearchParams();
  console.log(searchParams);

  return (
    <div>
      <div>Subpage Dynamic Route</div>
    </div>
  );
};

export default Page;
