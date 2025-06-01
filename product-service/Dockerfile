FROM node:20.9.0-alpine

WORKDIR /app

# 3. Copier les fichiers de dépendances d’abord
COPY *.json ./


# 4. Installer les dépendances
RUN npm install

# 5. Copier le reste du projet
COPY . .

EXPOSE 4004

CMD ["npm", "start", "dev"]