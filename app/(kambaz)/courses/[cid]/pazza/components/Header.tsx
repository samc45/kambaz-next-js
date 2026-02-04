// components/PazzaHeader.tsx
export default function PazzaHeader() {
  return (
    <div className="d-flex align-items-center justify-content-between px-3 py-2 bg-pazza-blue text-white">
      <strong>pazza</strong>

      <div className="d-flex gap-3 small">
        <span role="button">Q&amp;A</span>
        <span role="button">Manage Class</span>
      </div>
    </div>
  );
}
