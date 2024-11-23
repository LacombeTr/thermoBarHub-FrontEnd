# Utiliser une image Node.js LTS basée sur Alpine (légère)
FROM node:20-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances (node_modules)
RUN npm install

# Copier tout le reste du projet dans le conteneur
COPY . .

# Exposer le port 4200 pour l'accès à Angular via localhost
EXPOSE 4200

# Commande pour démarrer le serveur Angular
CMD ["npm", "run", "start"]
