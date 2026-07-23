# Portfolio — Yousri Bouchrika

Site vitrine monopage en HTML / CSS / JavaScript vanilla, sans framework ni dépendance de build.

## Structure

```
portfolio/
├── index.html
├── css/style.css
├── js/main.js
├── assets/
│   ├── images/       (photo + captures de projets)
│   └── documents/    (CV au format PDF)
├── favicon.svg
├── netlify.toml
└── README.md
```

## Lancer le site en local

Aucune installation n'est nécessaire. Deux options :

1. **Ouvrir directement le fichier** : double-cliquer sur `index.html`.
2. **Avec un serveur local** (recommandé, évite certains blocages liés au chargement de fichiers) :
   ```bash
   # avec Python
   python -m http.server 8000

   # ou avec l'extension VS Code "Live Server"
   ```
   Puis ouvrir `http://localhost:8000`.

## Remplacer les images

- **Photo de profil** : remplacer `assets/images/yousri-bouchrika.jpg` par une nouvelle photo en conservant le même nom de fichier (idéalement un carré, au moins 600×600 px).
- **Captures de projets** : chaque projet réserve deux emplacements dans `assets/images/` :
  - `easybts-1.webp`, `easybts-2.webp`
  - `vinted-tool-1.webp`, `vinted-tool-2.webp`
  - `fc-fulbert-1.webp`, `fc-fulbert-2.webp`

  Tant qu'un fichier n'existe pas, le site affiche automatiquement un encadré neutre
  « Capture à ajouter » à la place (géré par `js/main.js`), sans erreur ni image cassée.
  Il suffit d'ajouter un fichier portant exactement le même nom au même endroit pour que
  la capture s'affiche.

  Formats acceptés : `.webp` de préférence (léger), mais `.jpg` ou `.png` fonctionnent aussi
  à condition de mettre à jour l'extension dans `index.html`.

## Ajouter une URL à un projet

Par défaut, aucun projet n'affiche de bouton « Voir le projet » car aucune URL n'a été
fournie. Pour en ajouter une, ouvrir `index.html`, repérer le projet concerné et ajouter
un lien juste après la liste des technologies, par exemple :

```html
<p class="tech-list">HTML · CSS · JavaScript · SEO · Git · Netlify</p>
<a href="https://exemple.com" class="project-link" target="_blank" rel="noopener noreferrer">Voir le projet</a>
```

## Déployer sur Netlify

**Option 1 — glisser-déposer**
1. Aller sur [app.netlify.com](https://app.netlify.com).
2. Glisser le dossier `portfolio` entier sur la zone de dépôt ("Deploys").
3. Le site est en ligne en quelques secondes.

**Option 2 — via Git (recommandé pour les mises à jour futures)**
1. Créer un dépôt Git et y pousser le contenu du dossier `portfolio`.
2. Sur Netlify : **New site from Git** → sélectionner le dépôt.
3. Laisser les réglages de build par défaut (`netlify.toml` s'en charge : pas de commande
   de build, dossier publié = racine du dépôt).
4. Déployer.

Aucune variable d'environnement ni étape de build n'est nécessaire : le site est 100 % statique.
