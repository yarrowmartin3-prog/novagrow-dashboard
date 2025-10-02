# NovaGrow Dashboard (Next.js + Vercel)
- Chart.js pour pH/EC temps réel
- API proxy `/api/live` vers FastAPI (`/api/v1/live_data`)
- Mode démo si `FASTAPI_URL` non défini

## Déploiement Vercel
1) Import Git → ce repo
2) Settings → Environment Variables:
   - FASTAPI_URL = https://<votre-fastapi>/api/v1/live_data
3) Deploy

## Dev local
npm i
npm run dev  # http://localhost:3000
