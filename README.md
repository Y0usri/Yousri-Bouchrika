# Yousri Bouchrika — Portfolio

Développeur web junior (PHP / Symfony / JavaScript / MySQL), à la recherche d'un stage en développement web à Chartres ou dans ses environs.

**Site en ligne : https://y0usri.github.io/**

Site vitrine monopage en HTML / CSS / JavaScript vanilla — sans framework ni dépendance de build, hébergé sur GitHub Pages.

## Structure

```
.
├── index.html
├── css/style.css
├── js/main.js
├── assets/
│   ├── images/       (photo + captures de projets)
│   ├── icons/        (favicons)
│   └── documents/    (CV au format PDF)
├── favicon.ico / favicon.svg
├── robots.txt
├── sitemap.xml
└── README.md
```

## Lancer le site en local

Aucune installation n'est nécessaire. Deux options :

1. **Ouvrir directement le fichier** : double-cliquer sur `index.html`.
2. **Avec un serveur local** (recommandé, évite certains blocages liés au chargement de fichiers) :
   ```bash
   python -m http.server 8000
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

## Déploiement

Le site est un **site utilisateur GitHub Pages** : ce dépôt s'appelle exactement
`y0usri.github.io`, donc GitHub le publie automatiquement à la racine
(`https://y0usri.github.io/`) à chaque push sur la branche `main`, sans configuration
supplémentaire.

## Contact

Le formulaire de contact utilise [Formspree](https://formspree.io) — les messages
partent directement dans la boîte mail, sans backend à maintenir.
