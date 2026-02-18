# SIG-LYCÉE - Système Informatisé de Gestion pour Établissements Scolaires

## 📋 Description du Projet

SIG-LYCÉE est une plateforme de gestion complète pour établissements scolaires (Lycée) permettant la centralisation et l'administration efficace des données académiques, pédagogiques et financières. Le système offre une interface moderne et sécurisée accessible selon les rôles des utilisateurs.

## 🏗️ Architecture

### Frontend (React + Vite)
- **Technologie**: React 19.2.0 avec Vite
- **UI Framework**: Material-UI (@mui/material) et TailwindCSS
- **Routing**: React Router DOM
- **Gestion des formulaires**: Formik + Yup
- **HTTP Client**: Axios
- **Notifications**: Notistack

### Backend (Django REST)
- **Framework**: Django avec Django REST Framework
- **Authentification**: JWT (djangorestframework-simplejwt)
- **Base de données**: SQLite3
- **CORS**: django-cors-headers
- **Gestion des variables d'environnement**: django-environ

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ pour le frontend
- Python 3.8+ pour le backend

### Installation du Frontend
```bash
cd frontend
npm install
npm run dev
```
Le frontend sera disponible sur: **http://localhost:5173**

### Installation du Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Le backend API sera disponible sur: **http://localhost:8000**

## 📱 URL et Points d'Accès

### Frontend URLs
- **Application principale**: http://localhost:5173
- **Page de connexion**: http://localhost:5173/login
- **Tableau de bord**: http://localhost:5173/dashboard

### Backend API URLs
- **API de base**: http://localhost:8000/api/
- **Admin Django**: http://localhost:8000/admin/
- **Documentation API**: http://localhost:8000/api/docs/
- **Authentification JWT**: 
  - Login: `POST /api/auth/login/`
  - Refresh: `POST /api/auth/refresh/`
  - Logout: `POST /api/auth/logout/`

## 👥 Rôles Utilisateurs

### 🛡️ Administrateur
Accès complet à tous les modules:
- Gestion globale du système
- Administration des utilisateurs
- Supervision académique et financière
- Rapports et statistiques complètes

### 📚 Responsable Pédagogique
Supervision académique inter-classes/filières:
- Gestion des programmes et emplois du temps
- Validation des bulletins
- Analyses de performance par filière

### 👨‍🏫 Enseignant
Gestion pédagogique de ses classes assignées:
- Saisie des notes et évaluations
- Suivi des présences
- Communication avec les étudiants

### 👨‍🎓 Étudiant
Consultation de ses données personnelles:
- Notes et bulletins
- Emploi du temps
- Statut de paiement

## 🎯 Modules Principaux

### 📊 Tableau de Bord
Vue d'ensemble personnalisée avec statistiques clés et alertes

### 🏫 Gestion Académique
- Classes et filières
- Matières et programmes
- Emplois du temps
- Affectation des enseignants

### 👥 Gestion des Étudiants
- Inscription et suivi
- Historique académique
- Parcours scolaires

### 📝 Notes et Évaluations
- Saisie des notes
- Calcul automatique des moyennes
- Génération de bulletins

### ✅ Présence et Absences
- Suivi quotidien
- Justifications
- Rapports d'assiduité

### 💰 Gestion Financière
- Configuration des frais de scolarité
- Enregistrement des paiements
- Suivi des dettes et recouvrement

### 📢 Communication
- Notifications et annonces
- Messagerie interne
- Emails ciblés

### 📈 Rapports et Statistiques
- Export PDF/Excel/CSV
- Analyses par période
- Tableaux de bord analytiques

## 🔧 Configuration

### Variables d'Environnement Frontend
Créer un fichier `.env` dans le dossier `frontend/`:
```
VITE_API_URL=http://localhost:8000/api/
```

### Variables d'Environnement Backend
Créer un fichier `.env` dans le dossier `backend/`:
```
SECRET_KEY=votre_clé_secrète
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

## 📊 Standards et Performance

- **Langue**: Français
- **Devise**: Ariary (Ar)
- **Timezone**: UTC+3 (Madagascar)
- **Capacité**: 1000+ étudiants, 50+ classes
- **Temps de réponse**: < 2s
- **Uptime cible**: 99%

## 🔮 Évolutions Futures

- Portail parent dédié
- Application mobile native
- Paiements en ligne intégrés
- Module e-learning
- Chatbot IA
- Visioconférence intégrée

## 📞 Support

Pour toute question ou support technique, veuillez contacter l'équipe de développement.

---

**Version 1.0** - Système de Gestion Informatisé pour Lycée (SIG-LYCÉE)