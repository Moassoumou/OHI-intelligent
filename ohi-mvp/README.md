# OHI Dashboard — MVP statique (Étape 1)

Ce dossier contient une **version déployable immédiatement** de votre interface OHI (sans backend).  
Étape 2 : ajout de **Firebase Auth (Google/Microsoft/Email)** et d'une **base de données**.

## Contenu
- `index.html` — Page de connexion (SSO simulé)
- `dashboard.html` — Tableau de bord statique (placeholders)
- `app.js` — Logique UI (chargement, SSO simulé, redirection)
- (pas de build requis — Tailwind via CDN)

## Déploiement rapide sur Vercel
1. Créez un dépôt GitHub et poussez ce dossier (ex: `ohi-mvp`).
2. Sur https://vercel.com → **Add New Project** → Importez votre dépôt.
3. Framework: **Other** (aucun build).  
   - **Build Command**: _None_  
   - **Output Directory**: `/` (racine)
4. Déployez. L’URL sera fournie par Vercel.

### Alternative Netlify (drag & drop)
- Rendez-vous sur https://app.netlify.com/drop et **glissez-déposez** le dossier. Netlify crée un site statique instantanément.

## Étape suivante (plan)
- **Étape 2**: Brancher Firebase Authentication (Google & Microsoft) et stocker l’utilisateur connecté.  
- **Étape 3**: Créer une base de données (Firestore) pour persister les OHI.  
- **Étape 4**: Connecter l’API IA (OpenAI) pour les recommandations intelligentes.  
- **Étape 5**: Graphiques dynamiques (Recharts/Chart.js) + monétisation (Stripe).

---

> Conseil : gardez cette version en ligne comme **démo publique** pendant que nous mettons en place l’authentification réelle.
