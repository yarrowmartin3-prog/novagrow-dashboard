import type { NextApiRequest, NextApiResponse } from "next";
const FASTAPI_URL = process.env.FASTAPI_URL || "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!FASTAPI_URL) {
      const now = Date.now()/1000;
      return res.status(200).json({
        status_global: "Attention",
        culture_cible: "cannabis",
        phase: "floraison",
        reco_action: "Micro-dosing pH Down (~0.15)",
        data_environnement: { ph_actuel: 6.9 + 0.2*Math.sin(now/10), ec_actuel: 1.6 + 0.1*Math.sin(now/7), temp_air: 24.0 },
        justification_ia: "Mode démo (FASTAPI_URL non défini)"
      });
    }
    const r = await fetch(FASTAPI_URL, { cache: "no-store" });
    const j = await r.json();
    return res.status(200).json(j);
  } catch (e:any) {
    return res.status(200).json({
      status_global: "Attention",
      culture_cible: "demo",
      phase: "demo",
      reco_action: "Lecture en mode démo (erreur proxy)",
      data_environnement: { ph_actuel: 6.4, ec_actuel: 1.7, temp_air: 24.0 },
      justification_ia: String(e?.message || e)
    });
  }
}
