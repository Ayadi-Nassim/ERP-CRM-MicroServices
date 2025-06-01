// CRM/server.js

require('module-alias/register');
const mongoose = require('mongoose');
const { globSync } = require('glob');
const path = require('path');

// Vérifie la version de Node.js
const [major] = process.versions.node.split('.').map(Number);
if (major < 20) {
  console.error('⛔️ Veuillez utiliser Node.js version 20 ou supérieure.');
  process.exit(1);
}

// Charge les variables d'environnement
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

// Connexion MongoDB
mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', (error) => {
  console.error('🚫 Erreur MongoDB :', error.message);
  console.error('💡 Vérifiez votre fichier .env et l’URL de la base de données.');
});

// Charge tous les modèles dynamiquement
const modelsFiles = globSync('./src/models/**/*.js');
for (const filePath of modelsFiles) {
  require(path.resolve(filePath));
}

// Démarrage de l'application
const app = require('./app');
const port = process.env.PORT || 4002;
const server = app.listen(port, () => {
  console.log(`🚀 Billing Service prêt sur le port ${port}`);
});

