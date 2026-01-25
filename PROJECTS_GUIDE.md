# Guide d'ajout de projets / Project Addition Guide

## Comment ajouter un nouveau projet / How to Add a New Project

### Étape 1 : Préparer les images / Step 1: Prepare Images

1. Créez un nouveau dossier dans `_include/img/work/FancyBoxes/` avec le nom de votre projet
   Create a new folder in `_include/img/work/FancyBoxes/` with your project name
   
   Exemple / Example: `_include/img/work/FancyBoxes/fancybox32/`

2. Ajoutez vos images dans ce dossier :
   Add your images to this folder:
   - `preview.jpg` - L'image de prévisualisation (obligatoire) / Preview image (required)
   - `1.jpg`, `2.jpg`, `3.jpg`, etc. - Les images de la galerie dans l'ordre / Gallery images in order

### Étape 2 : Ajouter le projet dans le fichier JSON / Step 2: Add Project to JSON File

Ouvrez le fichier `_include/data/projects.json` et ajoutez votre projet :
Open the file `_include/data/projects.json` and add your project:

```json
{
  "id": "fancybox32",
  "folder": "fancybox32",
  "category": ["individual"],
  "title": {
    "fr": "Titre en français",
    "en": "English title",
    "ru": "Русский заголовок"
  },
  "subtitle": {
    "fr": "Sous-titre en français",
    "en": "English subtitle",
    "ru": "Русский подзаголовок"
  },
  "previewImage": "_include/img/work/FancyBoxes/fancybox32/preview.jpg",
  "link": "",
  "order": 32
}
```

### Propriétés / Properties

- **id** : Identifiant unique du projet / Unique project identifier
- **folder** : Nom du dossier contenant les images / Folder name containing images
- **category** : Catégories du projet / Project categories
  - `"individual"` - Maisons individuelles / Individual houses
  - `"design"` - Design d'intérieur / Interior design
  - `"comercial"` - Projets commerciaux / Commercial projects
- **title** : Titre principal en 3 langues / Main title in 3 languages
- **subtitle** : Sous-titre optionnel en 3 langues / Optional subtitle in 3 languages
- **previewImage** : Chemin vers l'image de prévisualisation / Path to preview image
- **link** : Lien externe optionnel (pour les visites virtuelles) / Optional external link (for virtual tours)
- **order** : Ordre d'affichage (nombre) / Display order (number)

### Étape 3 : Rafraîchir le site / Step 3: Refresh the Site

Rechargez simplement la page et votre projet apparaîtra automatiquement !
Simply reload the page and your project will appear automatically!

## Projets avec liens externes / Projects with External Links

Pour les visites virtuelles ou liens externes, laissez le champ `folder` vide et ajoutez l'URL :
For virtual tours or external links, leave the `folder` field empty and add the URL:

```json
{
  "id": "virtual_tour_xxx",
  "folder": "",
  "link": "https://webobook.com/tour/xxxxx",
  ...
}
```

## Structure des fichiers / File Structure

```
ap-archigroup/
├── _include/
│   ├── data/
│   │   └── projects.json          ← FICHIER À ÉDITER / FILE TO EDIT
│   ├── img/
│   │   └── work/
│   │       └── FancyBoxes/
│   │           ├── fancybox1/
│   │           ├── fancybox2/
│   │           └── [nouveau-projet]/  ← NOUVEAU DOSSIER / NEW FOLDER
│   │               ├── preview.jpg
│   │               ├── 1.jpg
│   │               ├── 2.jpg
│   │               └── ...
│   └── js/
│       └── projects-loader.js     ← Chargeur automatique / Automatic loader
├── index.html                     ← Page française / French page
├── indexEN.html                   ← Page anglaise / English page
└── indexRU.html                   ← Page russe / Russian page
```

## Exemple complet / Complete Example

Ajout d'un nouveau projet "Rénovation Appartement Paris 2026" :
Adding a new project "Apartment Renovation Paris 2026":

1. **Créer le dossier / Create folder:**
   `_include/img/work/FancyBoxes/fancybox32/`

2. **Ajouter les images / Add images:**
   - `preview.jpg`
   - `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`

3. **Éditer projects.json / Edit projects.json:**
   ```json
   {
     "id": "fancybox32",
     "folder": "fancybox32",
     "category": ["design"],
     "title": {
       "fr": "Rénovation d'un appartement à Paris, 2026",
       "en": "Apartment renovation in Paris, 2026",
       "ru": "Ремонт квартиры в Париже, 2026"
     },
     "previewImage": "_include/img/work/FancyBoxes/fancybox32/preview.jpg",
     "link": "",
     "order": 32
   }
   ```

4. **Sauvegarder et recharger la page / Save and reload the page**

C'est tout ! Le projet apparaît automatiquement sur toutes les versions linguistiques.
That's it! The project appears automatically on all language versions.
