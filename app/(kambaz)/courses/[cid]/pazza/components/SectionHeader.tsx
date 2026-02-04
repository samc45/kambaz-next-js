import { RxCaretDown } from "react-icons/rx";


export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="px-2 py-1 fw-bold border-top"
      style={{ backgroundColor: "#f5f5f5", color: "#494A4C", cursor: "pointer" }}
    >
      <RxCaretDown className="mb-1 fs-4" /> {title}
    </div>
  );
}