# Utiliser une image Node.js LTS basée sur Alpine (légère)
FROM node:20-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances (node_modules)
RUN npm install

# Étape 4 : Installer Sass et PostCSS globalement (si nécessaire)
RUN npm install -g sass postcss-cli autoprefixer

# Étape 5 : Copier le script de surveillance
COPY watch-and-compile.sh /usr/local/bin/watch-and-compile.sh
RUN chmod +x /usr/local/bin/watch-and-compile.sh

# Copier tout le reste du projet dans le conteneur
COPY . .

# Exposer le port 4200 pour l'accès à Angular via localhost
EXPOSE 4200

# Étape 7 : Commande par défaut pour lancer le watcher et Angular
CMD ["sh", "-c", "/usr/local/bin/watch-and-compile.sh & npm start"]
