export default function StatRow({ label, value }: { label: string; value: string; }) {
  return (
    <div className="d-flex justify-content-between mb-1">
      <span className="text-muted">{label}</span>
      <span className="fw-semibold">{value}</span>
    </div>
  );
}