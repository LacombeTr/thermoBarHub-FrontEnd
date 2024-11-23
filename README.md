# Projet Angular avec Docker

Ce projet Angular utilise Docker pour exécuter une application Angular dans un conteneur, ce qui vous permet d'éviter toute installation locale de Node.js ou d'Angular.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre ordinateur :

- **Docker**:TéléchargerDocker
- **Docker Compose**: Vient généralement avec Docker Desktop, donc vous devriez déjà l'avoir.

## Étapes pour utiliser ce conteneur Docker

### 1. Cloner le projet

Si vous n'avez pas encore le projet, commencez par le cloner depuis GitHub (ou d'autres sources) en exécutant cette commande :

```bash
git clone <URL_DU_REPOSITORY>
cd <nom_du_dossier_du_projet>
```

### 2. Lancer Docker

Assurez-vous que Docker est bien installé et en cours d'exécution sur votre machine. Ouvrez Docker Desktop ou démarrez le service Docker sur votre terminal.

### 3. Construire et démarrer le conteneur

Une fois Docker lancé, dans le terminal, dans le répertoire de votre projet, exécutez les commandes suivantes pour construire (seulement la première fois) et démarrer le conteneur :

```bash
docker-compose --build
docker-compose up -d
```

Cette commande va :

- Télécharger l'image de base pour Node.js.
- Installer les dépendances du projet Angular à l'intérieur du conteneur.
- Démarrer le serveur Angular sur le port 4200.

#### 4. Accéder à l'application Angular

Une fois que le conteneur est lancé, ouvrez votre navigateur et accédez à l'application Angular à l'adresse suivante :

http://localhost:4200

Vous devriez voir l'application Angular fonctionner.

---

## Comprendre la structure du projet Docker

### Dockerfile

Le fichier` Dockerfile` définit l'image Docker pour exécuter le projet Angular. Il utilise une image de base contenant Node.js 20 LTS, puis copie les fichiers du projet et installe les dépendances nécessaires.

### docker-compose.yml

Le fichier `docker-compose.yml` permet de configurer et démarrer le conteneur avec une seule commande. Voici ce que chaque section fait :

- **ports**: Mape le port 4200 du conteneur vers le port 4200 de votre machine, permettant d'accéder à l'application via `localhost:4200`.
- **volumes**: Synchronise les fichiers du projet entre votre ordinateur et le conteneur. Cela permet de voir les modifications en temps réel sans redémarrer le conteneur.

---

## En résumé

Voici les étapes à suivre pour démarrer le projet Angular dans Docker :

1. Cloner le projet.
2. Lancer Docker.
3. (La première fois seulement) construire le conteneur avec `docker-compose --build`
4. Démarrer le conteneur avec `docker-compose up -d`.
5. Accéder à l'application à l'adresse http://localhost:4200.

---

## Résolution des problèmes

Si vous rencontrez des problèmes, voici quelques conseils :

- **"ERR_CONNECTION_RESET"**: Vérifiez que le port 4200 est bien exposé et qu'il n'est pas bloqué par un pare-feu ou une application de sécurité.
- **Application ne démarre pas**: Vérifiez les logs du conteneur avec`docker logs `. Si Angular n'a pas démarré correctement, assurez-vous que vous avez bien désactivé l'option de collecte des données d'usage (analytics).
