# Mada Champion — Frontend

Interface Next.js 16 (App Router), React 19 et Tailwind CSS pour l’API FastAPI du dossier `../Back-G`.

## Démarrer

1. Copier `.env.example` vers `.env.local` et renseigner l’URL de l’API et du WebSocket.
2. `npm install`
3. `npm run dev`

## Contrat API intégré

- `POST /api/v1/auth/register`, `/login`, `/refresh`, `GET /me`
- Défis : liste, création, questions, programmation, jointure et classement
- Jeu : réponses, statistiques, historique
- WebSocket : `/ws/challenges/{id}?token={access_token}`

Les URLs sont uniquement lues depuis `NEXT_PUBLIC_API_BASE_URL` et `NEXT_PUBLIC_WS_BASE_URL`. Un secret JWT ne doit jamais être placé dans une variable `NEXT_PUBLIC_*` : il reste exclusivement dans le backend. Le jeton d’accès retourné par l’API est conservé en `sessionStorage` pour la session courante ; pour un déploiement production, préférez un BFF Next.js utilisant un cookie `HttpOnly`, `Secure`, `SameSite=Lax` et une protection CSRF.

> Le backend actuel doit aussi autoriser explicitement l’origine du frontend avec `CORSMiddleware` si les deux services sont hébergés sur des origines distinctes.
