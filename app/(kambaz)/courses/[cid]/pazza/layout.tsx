import './pazza.css';

export default function PazzaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-100">{children}</div>;
}
