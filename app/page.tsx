"use client";
import { useEffect, useRef, useState } from "react";
import StatusCard from "../components/StatusCard";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler } from "chart.js";
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

type Live = {
  status_global: string;
  culture_cible?: string;
  phase?: string;
  reco_action: string;
  data_environnement: { ph_actuel:number; ec_actuel:number; temp_air:number; niveau_eau?:number; };
  justification_ia: string;
};

export default function Page() {
  const [live, setLive] = useState<Live | null>(null);
  const phRef = useRef<HTMLCanvasElement>(null);
  const ecRef = useRef<HTMLCanvasElement>(null);
  const phChart = useRef<Chart | null>(null);
  const ecChart = useRef<Chart | null>(null);

  useEffect(() => {
    const mk = (ctx: CanvasRenderingContext2D, label: string, min:number, max:number) =>
      new Chart(ctx, {
        type: "line",
        data: { labels: [], datasets: [{ label, data: [], fill:true, tension:0.25 }] },
        options: { animation:false, scales:{ x:{ display:false }, y:{ min, max } } }
      });

    if (phRef.current && !phChart.current) phChart.current = mk(phRef.current.getContext("2d")!, "pH", 5.0, 7.5);
    if (ecRef.current && !ecChart.current) ecChart.current = mk(ecRef.current.getContext("2d")!, "EC", 0.6, 2.6);

    let t: any;
    const tick = async () => {
      try {
        const r = await fetch("/api/live");
        const j = await r.json();
        setLive(j);
        const x = "";
        if (phChart.current && j?.data_environnement?.ph_actuel != null) {
          phChart.current.data.labels!.push(x);
          phChart.current.data.datasets[0].data.push(j.data_environnement.ph_actuel);
          if (phChart.current.data.labels!.length > 180) { phChart.current.data.labels!.shift(); phChart.current.data.datasets[0].data.shift(); }
          phChart.current.update();
        }
        if (ecChart.current && j?.data_environnement?.ec_actuel != null) {
          ecChart.current.data.labels!.push(x);
          ecChart.current.data.datasets[0].data.push(j.data_environnement.ec_actuel);
          if (ecChart.current.data.labels!.length > 180) { ecChart.current.data.labels!.shift(); ecChart.current.data.datasets[0].data.shift(); }
          ecChart.current.update();
        }
      } catch {}
      finally { t = setTimeout(tick, 1000); }
    };
    tick();
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">NovaGrow Dashboard</h1>
      {live && (
        <StatusCard
          status={live.status_global}
          action={live.reco_action}
          justification={live.justification_ia}
          culture={live.culture_cible}
          phase={live.phase}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card"><canvas ref={phRef} /></div>
        <div className="card"><canvas ref={ecRef} /></div>
      </div>
      <p className="opacity-70 text-xs">Slogan : Nourriture sans frontières, culture sans limites.</p>
    </main>
  );
}
