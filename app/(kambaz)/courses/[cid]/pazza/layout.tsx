import './pazza.css';

export default function PazzaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="w-100"
        style={{
          maxWidth: "1200px",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
}
