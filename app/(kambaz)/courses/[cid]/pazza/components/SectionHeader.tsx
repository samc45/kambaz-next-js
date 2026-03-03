"use client";

import { ReactNode, useState } from "react";
import { RxCaretDown, RxCaretRight } from "react-icons/rx";

export default function SectionHeader({
  title,
  children,
  defaultExpanded = true,
}: {
  title: string;
  children?: ReactNode;
  defaultExpanded?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border-top">
      <button
        className="px-2 py-1 fw-bold border-0 w-100 text-start d-flex align-items-center"
        style={{ backgroundColor: "#f5f5f5", color: "#494A4C", cursor: "pointer" }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <RxCaretDown className="mb-1 fs-4" /> : <RxCaretRight className="mb-1 fs-4" />}
        {title}
      </button>

      {isExpanded && children}
    </div>
  );
}