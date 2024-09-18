# gpc_aeig
Mini plateforme de gestion de projets collaboratifs


## Description

Cette application est construite en utilisant **Express.js**, **MongoDB**, et **Flutter** pour le frontend. Elle implémente un système d'authentification avec JWT, des services pour la gestion des utilisateurs, des projets et des tâches, ainsi que des middlewares pour la validation des requêtes et la gestion des réponses API.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- **Node.js** (version 20.17 ou supérieure)
- **MongoDB** (en local ou dans le cloud)
- **Flutter** (pour le frontend mobile)

---

## Installation

1. **Clonez le projet** :

   ```bash
   git clone https://github.com/optimum-02/gpc_aeig.git
   ```

2. **Installez les dépendances du backend** :

   ```bash
   cd backend
   npm install
   ```

3. **Configurez les variables d'environnement** :

   Créez un fichier `.env` à la racine du projet, au meme hierachie que backend avec les informations suivantes :

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your_jwt_secret
   ```

4. **Démarrez MongoDB** :

   Si vous utilisez MongoDB localement, assurez-vous qu'il est bien en cours d'exécution :

   ```bash
   mongod
   ```

5. **Lancez le serveur backend** :

   ```bash
   npm start
   ```

   Le serveur sera lancé sur `http://localhost:3000`.

6. **Installation du frontend Flutter** (si applicable) :

   Allez dans le répertoire du frontend Flutter et exécutez les commandes suivantes :

   ```bash
   cd frontend
   flutter pub get
   flutter run
   ```

---

## Utilisation
Vous pouvez importer le fichier **api_collection.json** dans postman pour le test  

1. **Inscription d'un utilisateur** :
   Envoyez une requête POST à `/api/auth/signup` avec les informations de l'utilisateur (email, password, etc.).
   
2. **Connexion** :
   Envoyez une requête POST à `/api/auth/login` avec l'email et le mot de passe pour recevoir un token JWT.

3. **Current user data** :
   Utilisez le token JWT dans le header `Authorization: Bearer <token>` 
   Envoyez une requête GET à `/api/auth/user` avec l'email et le mot de passe pour recevoir un token JWT.

4. **Reste à faire** :
   Gestion des project et taches.
   Systeme de chat temps reel
   Developper le front avec Flutter et integrer les apis

---

## Tester l'application

1. **Tests unitaires** :
   Les tests ont été écrits en suivant une approche **Test-Driven Development (TDD)**. Pour exécuter les tests unitaires :

   ```bash
   npm test
   ```

2. **Outils utilisés** :
   - **Jest** : Framework de tests.

---

## Structure du projet

```
.gitignore
│   planning_projet_collaboratif.md
│   README.md
│
└───backend
    │   .env
    │   .gitignore
    │   app.js
    │   eslint.config.mjs
    │   jsonfig.json
    │   package-lock.json
    │   package.json
    │
    ├───config
    │       app_config.js
    │       db.js
    │       dependencie_injection.js
    │
    ├───controllers
    │       auth_controller.js
    │
    ├───dao
    │       project_dao.js
    │       task_dao.js
    │       user_dao.js
    │
    ├───middlewares
    │       auth_middleware.js
    │       error_middleware.js
    │       request_validation_middleware.js
    │
    ├───routes
    │       app_route.js
    │       auth_route.js
    │
    ├───schemas
    │       common.js
    │       project_schema.js
    │       task_schema.js
    │       user_schema.js
    │
    ├───services
    │       auth_service.js
    │       user_service.js
    │       user_service.test.js
    │
    └───utils
            api_response.js
            api_response_formatter.js
            app_error.js
            dto.js
```

---


