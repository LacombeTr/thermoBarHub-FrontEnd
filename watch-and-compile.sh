#!/bin/bash

# Vérifie si Sass est installé
if ! command -v sass &> /dev/null
then
    echo "Sass n'est pas installé. Veuillez installer Sass dans votre conteneur."
    exit 1
fi

# Lance le watcher Sass
echo "Lancement du File Watcher pour Sass..."
sass --watch src/styles.scss:src/styles.css &

# Vérifie si PostCSS est installé
if ! command -v postcss &> /dev/null
then
    echo "PostCSS n'est pas installé. Veuillez installer PostCSS dans votre conteneur."
    exit 1
fi

# Lancer un watcher pour PostCSS si nécessaire (optionnel)
echo "File Watcher démarré. Sass compile les fichiers SCSS automatiquement."
wait
