"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop() || "";
  const formattedSegment = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  return (
    <span>
      {course?.name} &gt; {formattedSegment}
    </span>
  );
}