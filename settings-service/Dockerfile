# 1. Utiliser une image officielle Node.js
FROM node:18-alpine

# 2. Définir le dossier de travail dans le container
WORKDIR /app

# 3. Copier les fichiers de dépendances d’abord
COPY *.json ./


# 4. Installer les dépendances
RUN npm install

# 5. Copier le reste du projet
COPY . .

# 6. Enregistrer les alias de module (si tu utilises module-alias)
RUN npm i

# 7. Assurer que les chemins fonctionnent correctement
ENV NODE_PATH=./src

# 8. Exposer le port (à adapter si ton microservice tourne ailleurs)
EXPOSE 4005

# 9. Lancer l’application
CMD ["node", "src/index.js"]
