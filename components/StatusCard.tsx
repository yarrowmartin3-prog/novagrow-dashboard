"use client";
type Props = { status: string; action: string; justification: string; culture?: string; phase?: string; };

const badge = (s: string) => {
  const k = s.toLowerCase();
  if (k.includes("alerte")) return "badge badge-alerte";
  if (k.includes("attention")) return "badge badge-attention";
  return "badge badge-optimal";
};

export default function StatusCard({ status, action, justification, culture, phase }: Props) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">NovaGrow Smart Grow Box</h2>
        <span className={badge(status)}>{status}</span>
      </div>
      <p className="text-sm opacity-80 mb-2">Culture: {culture ?? "—"} • Phase: {phase ?? "—"}</p>
      <p className="text-lg">Action recommandée: <b>{action}</b></p>
      <p className="text-sm opacity-70 mt-2">{justification}</p>
    </div>
  );
}
