# Étape de construction de l'application Angular
FROM node:14 AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de l'application (package.json, package-lock.json, etc.)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application Angular
RUN npm run build

# Étape de production avec Nginx
FROM nginx:alpine

# Copier les fichiers construits de l'application depuis le conteneur de construction vers Nginx
COPY --from=builder /app/dist/vuexy /usr/share/nginx/html

# Exposer le port 80 (par défaut pour Nginx)
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
