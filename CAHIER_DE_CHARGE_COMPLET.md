# Cahier de Charge Complet - SIG-Lycée
## Système de Gestion Intégré pour Lycée Malagasy

**Version:** 2.0  
**Date:** Février 2026  
**Statut:** En cours de développement

---

## 1. DESCRIPTION GÉNÉRALE DU PROJET

### 1.1 Objectif
Créer une plateforme de gestion scolaire intégrée (SIG-Lycée) permettant une gestion efficace et sécurisée de tous les processus administratifs et académiques d'une institution scolaire malgache du collège au lycée.

### 1.2 Périmètre
- Gestion des utilisateurs et authentification
- Gestion académique (classes, matières, emplois du temps)
- Suivi des élèves (notes, présence, comportement)
- Gestion administrative et financière
- Communication interne (messagerie, notifications)
- Rapports et statistiques
- Support multi-rôles avec permissions granulaires

### 1.3 Utilisateurs cibles
- **Admin/Direction:** Gestion globale du système
- **Bureau/Secrétariat:** Gestion administrative et inscriptions
- **Professeurs:** Saisie des notes et suivi des élèves
- **Parents:** Suivi de leurs enfants
- **Élèves:** Consultation de leurs données académiques
- **Coordinateur Pédagogique:** Supervision académique

---

## 2. RÔLES ET PERMISSIONS DÉTAILLÉS

### 2.1 Administrateur Système

**Accès:** Complet et illimité

**Responsabilités:**
- Gestion des comptes utilisateurs (création, modification, suppression, désactivation)
- Attribution et modification des rôles utilisateurs
- Gestion des matrices de classe et des niveaux
- Gestion des filières (Scientifique, Littéraire, Technique, etc.)
- Modification des matricules automatiques générés
- Création de matricules manuels si nécessaire
- Consultation des statistiques globales
- Audit trail et historique des actions
- Configuration système et paramètres globaux
- Gestion des années scolaires et calendriers
- Validation des rapports importants
- Accès à tous les modules sans restriction

**Permissions spéciales:**
- Voir tous les bulletins, même non validés
- Voir tous les paiements et dettes
- Modifier les données figées des élèves/profs
- Générer des rapports personnalisés
- Exporter les données de l'école

---

### 2.2 Bureau / Secrétariat

**Accès:** Limité aux domaines administratifs et financiers

**Responsabilités:**
- Gérer les inscriptions des élèves (création, validation, modification)
- Vérifier l'intégralité des dossiers d'inscription
- Accepter ou refuser les demandes d'inscription
- Générer les matricules pour les élèves et les valider
- Assigner les élèves aux classes
- Gérer les comptes financiers de l'école
- Traiter et valider les paiements des élèves
- Gérer les dettes et relances de paiement
- Traiter les salaires des professeurs
- Générer les emplois du temps selon disponibilités
- Valider les bulletins et documents officiels
- Générer les certificats de scolarité
- Générer les attestations de présence
- Générer les cartes étudiantes (si applicable)
- Envoyer/recevoir des remarques de professeurs et parents
- Gestion du calendrier scolaire et événements

**Permissions spéciales:**
- Bloquer l'accès d'un élève (paiement non effectué)
- Modifier les informations financières
- Générer les documents administratifs

**Restrictions:**
- Ne peut pas modifier les notes
- Ne peut pas accéder à certaines données sensibles (salaires détaillés)
- Ne peut pas désactiver les comptes (action admin)

---

### 2.3 Professeurs

**Accès:** Limité à leurs données pédagogiques

**Responsabilités:**
- Gérer leurs élèves par classe
- Ajouter et modifier les notes par trimestre:
  - Contrôles (évaluations classiques)
  - Devoirs (travaux à domicile)
  - Participation en classe
  - Bonus (points supplémentaires)
- Calculer automatiquement les moyennes
- Suivre la présence des élèves
- Envoyer des retours aux élèves
- Envoyer des remarques à l'administration
- Suivre les événements et convocations
- Consulter le calendrier scolaire

**Permissions spéciales:**
- Modifier les notes jusqu'à 48h après saisie (pour correction d'erreur)
- Ajouter des commentaires aux bulletins
- Générer un classement des élèves dans la classe

**Restrictions:**
- Ne peut voir que ses propres classes
- Ne peut voir que ses propres matières
- Ne peut pas modifier les notes après la date limite (configurable)
- Ne peut pas voir les données financières

---

### 2.4 Parents

**Accès:** Limité au suivi de leurs enfants

**Responsabilités:**
- Initier les inscriptions de leurs enfants (validation requise par admin)
- Suivre tous leurs enfants inscrits
- Consulter les bulletins de leurs enfants
- Consulter les notes par matière
- Consulter les remarques des professeurs
- Consulter les événements scolaires
- Voir les statuts de paiement
- Demander des documents officiels:
  - Bulletins complets
  - Certificats de scolarité
  - Attestations de présence
- Envoyer des réponses aux remarques professeurs/admin
- Gérer les informations de famille (contact, adresse)
- Payer les frais via le système

**Permissions spéciales:**
- Accès au portail parent multienfant
- Notifications par email/SMS (configurable)

**Restrictions:**
- Voir uniquement les enfants qui les concernent
- Ne peut pas modifier les données académiques
- Accès en lecture seule aux bulletins

---

### 2.5 Élèves

**Accès:** Minimal, lecture seule

**Responsabilités:**
- Consulter toutes leurs notes par matière et trimestre
- Consulter leurs bulletins générés automatiquement
- Voir les remarques des professeurs
- Répondre aux remarques des professeurs
- Visualiser les convocations et événements
- Consulter l'emploi du temps
- Consulter les absences
- Gérer les informations de profil
- Voir les notifications de l'administration

**Permissions spéciales:**
- Générateur automatique de bulletins
- Téléchargement des bulletins en PDF

**Restrictions:**
- Accès en lecture seule
- Ne peut pas voir les données financières
- Ne peut pas voir les données d'autres élèves

---

### 2.6 Coordinateur Pédagogique

**Accès:** Gestion académique et supervision

**Responsabilités:**
- Superviser les programmes scolaires
- Valider les programmes par classe
- Suivre la progression académique
- Analyser les performances par classe
- Générer des rapports pédagogiques
- Superviser les emplois du temps
- Valider les notes et bulletins
- Consulter les statistiques académiques

**Restrictions:**
- Ne peut pas modifier les données financières
- Ne peut pas créer/supprimer des utilisateurs
- Accès en lecture seule à la plupart des données

---

## 3. FONCTIONNALITÉS PRINCIPALES

### 3.1 Authentification et Sécurité

**Exigences:**
- Authentification par email/identifiant et mot de passe
- Tokens JWT sécurisés (expire après 24h)
- Refresh tokens (expire après 7 jours)
- Support du "Mémoriser mes identifiants"
- Page "Mot de passe oublié" avec réinitialisation sécurisée
- Historique des connexions par utilisateur
- Détection de tentatives de connexion échouées
- Blocage temporaire après 5 tentatives échouées
- Audit trail complet des actions

**Infrastructure de sécurité:**
- Mots de passe hachés avec bcrypt (12 rounds)
- HTTPS obligatoire en production
- CORS configuré correctement
- CSRF tokens sur tous les formulaires
- Validation côté client et serveur
- Sanitization des inputs contre XSS

---

### 3.2 Gestion des Utilisateurs

**Structure de données:**
```
Utilisateur {
  id: UUID
  email: String (unique)
  nom: String
  prenom: String
  motDePasse: String (hashé)
  role: Enum [Admin, Bureau, Professeur, Parent, Élève, Coordinateur]
  statut: Enum [Actif, Inactif, Suspendu]
  dateCreation: DateTime
  dateModification: DateTime
  dateLastLogin: DateTime
  photo: String (URL)
  telephone: String
  adresse: String
  ville: String
  codePostal: String
  dateNaissance: DateTime
}
```

**Gestion des rôles:**
- Chaque utilisateur a UN rôle principal
- Possibilité de rôles multiples futur (v2.1)
- Permissions basées sur les rôles (RBAC)
- Configuration centralisée des permissions
- Audit des modifications de rôle

---

### 3.3 Gestion Académique

#### 3.3.1 Classes et Niveaux
- Gestion des classes (6ème, 5ème, 4ème, 3ème, 2nde, 1ère, Term)
- Assignation des élèves aux classes
- Gestion de la capacité des classes
- Historique de classe par élève
- Support des années académiques multiples

#### 3.3.2 Filières
- Gestion des filières (Scientifique, Littéraire, Technique)
- Assignation par classe/niveau
- Matières obligatoires par filière
- Matières optionnelles

#### 3.3.3 Matières
- Gestion des matières
- Assignation des professeurs par matière et classe
- Horaires de cours
- Crédits/poids pour calcul de moyennes
- Matières obligatoires vs optionnelles

#### 3.3.4 Emplois du Temps
- Création automatisée ou manuelle
- Vérification des disponibilités professeurs
- Vérification des conflits de salle
- Export en PDF/iCal
- Visualisation par classe, prof, ou salle
- Support des changements/remplacement

---

### 3.4 Gestion des Élèves

#### 3.4.1 Inscription
- Formulaire en ligne pour les parents
- Importation en masse depuis Excel/CSV
- Validation des documents
- Workflow d'approbation admin
- Notification automatique des statuts

#### 3.4.2 Données d'Élève
```
Élève {
  id: UUID
  utilisateurId: UUID
  matricule: String (généré automatiquement ou manuel)
  numeroMatricule: String (formaté: YYYY-XXX-CODE)
  classe: Classe
  filiere: Filiere
  dateInscription: DateTime
  statut: Enum [Inscrit, Suspendu, Résilié]
  parents: List[Parent]
  dossierComplet: Boolean
  observations: String
}
```

#### 3.4.3 Suivi Académique
- Voir toutes les notes par matière
- Bulletins générés automatiquement
- Absences et justifications
- Convocations
- Remarques des professeurs
- Historique complet

---

### 3.5 Gestion des Notes

#### 3.5.1 Structure des Notes
```
Note {
  id: UUID
  eleveId: UUID
  matiereId: UUID
  trimestre: Int [1, 2, 3]
  anneeAcademique: String (ex: 2025-2026)
  type: Enum [Contrôle, Devoir, Participation, Bonus]
  valeur: Float [0-20]
  dateEnregistrement: DateTime
  professeurId: UUID
  observations: String
}
```

#### 3.5.2 Calcul des Moyennes
- Moyenne par trimestre = moyenne pondérée des notes
- Moyenne annuelle = moyenne des trois trimestres (ou configurable)
- Support du poids personnalisé par type de note
- Calcul automatique + cache pour performance
- Recalcul automatique à chaque nouvelle note

#### 3.5.3 Validation des Notes
- Les notes restent modifiables 48h après saisie
- Au-delà, intervention admin requise
- Validation finale par coordinateur pédagogique
- Lock des notes après validation
- Historique des modifications de notes

---

### 3.6 Gestion de la Présence

#### 3.6.1 Saisie de Présence
- Marquage présence/absence par classe
- Justification des absences (maladie, événement, etc.)
- Taux de présence par élève
- Alertes si absence excessive (paramétrable, défaut: 20%)

#### 3.6.2 Gestion des Absences
- Justification par les parents
- Validation par admin/prof
- Génération des certificats d'absence
- Historique complet

---

### 3.7 Bulletins et Documents

#### 3.7.1 Bulletins
- Génération automatique par trimestre
- Modèles personnalisables par classe
- Affichage des notes et moyennes
- Remarques professeurs et admin
- Appréciation générale
- État de validation
- Export en PDF
- Archivage par année

#### 3.7.2 Documents Officiels
- Certificats de scolarité
- Attestations de présence
- Attestations de conduite
- Relevés de notes
- Cartes d'étudiant (si applicable)
- Autorisations de sortie

**Signature électronique:**
- Signature du directeur/chef d'établissement
- Signature du coordinateur pédagogique
- Signature du professeur principal
- Horodatage automatique

---

### 3.8 Gestion Financière

#### 3.8.1 Paiements des Élèves
```
Paiement {
  id: UUID
  eleveId: UUID
  montant: Decimal
  type: Enum [Frais Inscription, Frais Scolarité, Restauration, Transport]
  statut: Enum [En attente, Payé, En retard, Partiel]
  datePaiement: DateTime
  modePaiement: Enum [Espèces, Chèque, Virement, Carte, Autre]
  referenceTransaction: String
  observations: String
}
```

#### 3.8.2 Suivi des Dettes
- Vue d'ensemble des dettes par élève
- Relances automatiques (configurable)
- Rapports de recouvrement
- Taux de recouvrement par classe/année
- Alertes si dette excessive

#### 3.8.3 Salaires des Professeurs
- Calcul automatique basé sur grille
- Pièces jointes (fiches de paie)
- Historique des salaires
- Gestion des absences/retards
- Support des heures supplémentaires
- Export pour comptabilité

---

### 3.9 Messagerie Interne

#### 3.9.1 Système de Messages
```
Message {
  id: UUID
  expediteur: Utilisateur
  destinataire: Utilisateur
  objet: String
  contenu: String
  dateEnvoi: DateTime
  dateVue: DateTime
  pieceJointe: File (optionnel)
  typeMessage: Enum [Direct, Remarque, Notification]
}
```

#### 3.9.2 Types de Communications
- Messages directs entre utilisateurs
- Remarques des professeurs (notes visibles parents/élève)
- Notifications système (automatiques)
- Annonces générales (à tous les parents/élèves)
- Circulaires

#### 3.9.3 Notifications
- Email (paramétrable par utilisateur)
- SMS (optionnel, intégration future)
- Push notifications (optionnel)
- Dashboard en-app
- Archive permanente

---

### 3.10 Gestion des Événements

#### 3.10.1 Événements Scolaires
```
Événement {
  id: UUID
  titre: String
  description: String
  dateDebut: DateTime
  dateFin: DateTime
  lieu: String
  typeEvenement: Enum [Congé, Examen, Réunion, Visite, Autre]
  visibleAux: List[Rôle] (qui peut voir cet événement)
  pieceJointe: List[File]
}
```

#### 3.10.2 Calendrier Partagé
- Vue par mois, semaine, jour
- Filtrage par type d'événement
- Importation iCal
- Export iCal
- Notifications avant événement

#### 3.10.3 Convocations
- Création par admin/bureau
- Notification automatique
- Confirmation de présence
- Historique des convocations

---

### 3.11 Rapports et Statistiques

#### 3.11.1 Tableaux de Bord Personnalisés

**Admin:**
- Nombre total d'élèves, profs, parents
- Revenus collectés vs dettes
- Taux de présence global
- Performances par classe
- Graphiques de tendance

**Bureau:**
- Inscriptions en attente
- Paiements en retard
- Dettes par élève
- Emplois du temps confirmés vs non confirmés

**Professeurs:**
- Moyennes de classe par matière
- Distribution des notes
- Taux de présence par classe
- Progrès des élèves

**Parents:**
- Progression de leurs enfants
- Comparaison avec la moyenne
- Tendances par trimestre

**Élèves:**
- Ma progression
- Comparaison avec la moyenne
- Prédiction de notes finales (optionnel)

#### 3.11.2 Rapports Personnalisés
- Sélection des critères (classe, matière, trimestre, etc.)
- Export en PDF/Excel
- Historique des rapports générés
- Planification des rapports récurrents

#### 3.11.3 Aperçus Clés (KPIs)
- Taux de réussite au bac
- Taux de recouvrement des frais
- Satisfaction des parents (optional)
- Attrition/rétention des élèves

---

## 4. INFRASTRUCTURE TECHNIQUE

### 4.1 Architecture

**Frontend:**
- React 18+ avec TypeScript
- Next.js 16 (App Router)
- Tailwind CSS + Shadcn UI pour styling
- SWR pour data fetching et caching
- Responsive design (mobile-first)

**Backend:**
- Framework: Django 4.2+ ou Node.js/Express
- Base de données: PostgreSQL
- ORM: Django ORM ou Prisma
- Authentication: JWT tokens
- Cache: Redis (optionnel)

**Infrastructure:**
- Hébergement: Vercel, AWS, ou DigitalOcean
- Base de données: PostgreSQL (managed)
- Stockage fichiers: S3 ou Vercel Blob
- Email: SendGrid ou service similaire
- SMS (future): Twilio ou API locale

### 4.2 Exigences de Performance

- Temps de chargement pages: < 3s
- Temps de réponse API: < 500ms (p95)
- Uptime: 99.5% minimum
- Support de 5000+ utilisateurs simultanés
- Cache des rapports volumineux

### 4.3 Sécurité

- HTTPS obligatoire
- HSTS headers
- CSP (Content Security Policy)
- Rate limiting sur API
- Protection CSRF
- Validation côté serveur obligatoire
- Encryption des données sensibles (salaires, etc.)
- Backup quotidien de la base de données
- Conformité RGPD/données personnelles

---

## 5. DESIGN SYSTEM

### 5.1 Couleurs
- **Primaire:** Bleu professionnel (#0072E6, HSL 217° 100% 42%)
- **Accent:** Bleu ciel (#2E7FEE, HSL 221° 83% 53%)
- **Secondary:** Gris bleu léger (#EBF1FF)
- **Destructive:** Rouge (#E11D48)
- **Supportive Tones:** Gris neutres pour les interfaces

### 5.2 Typography
- **Headings:** Font-sans (défault system font)
- **Body:** Font-sans (pour cohérence)
- **Monospace:** Font-mono (pour données tabulaires)
- **Font sizes:** Hiérarchie claire (h1-h6)

### 5.3 Dark Mode
- Support complet du dark mode
- Couleurs adaptées pour la lisibilité
- Persistance de la préférence utilisateur
- Transitions smooth

### 5.4 Composants Réutilisables
- Cards, Buttons, Forms, Tables
- Modals, Dropdowns, Tooltips
- Pagination, Breadcrumbs
- Status badges, Alerts
- Navigation sidebars

---

## 6. PHASES DE DÉVELOPPEMENT

### Phase 1: MVP (Janvier-Mars 2026)
- Authentification et gestion utilisateurs
- Gestion basique des élèves/classes
- Saisie et consultation des notes
- Bulletins simples
- Dashboard basique

### Phase 2: Fonctionnalités Clés (Avril-Juin 2026)
- Gestion complète des paiements
- Messagerie interne
- Événements et calendrier
- Rapports avancés
- Présence/absences

### Phase 3: Optimisations (Juillet-Août 2026)
- Performance et cache
- Tests complets
- Documentation
- Formation utilisateurs
- Migration données réelles

### Phase 4: Extensions (Septembre 2026+)
- Notifications SMS
- App mobile (React Native)
- Intégrations externes
- Modules de clubs/activités
- Modules d'examens

---

## 7. CRITÈRES D'ACCEPTATION

- [x] Toutes les routes authentifiées
- [x] Dashboard avec statistiques
- [x] CRUD complet pour élèves/classes
- [x] Saisie et calcul des notes
- [x] Génération automatique des bulletins
- [x] Gestion des paiements basique
- [x] Messagerie interne fonctionnelle
- [ ] 90%+ tests unitaires et d'intégration
- [ ] Performance < 500ms API (p95)
- [ ] Uptime 99.5% en production
- [ ] Documentation complète (API, user guide)
- [ ] Formation utilisateurs complétée

---

## 8. FLUX UTILISATEURS CLÉS

### 8.1 Flux d'Inscription (Parent)
1. Parent visite le site
2. Clique sur "Inscriptions"
3. Remplit le formulaire avec données enfant
4. Télécharge les documents requis
5. Soumet la demande
6. Bureau reçoit notification
7. Bureau valide et active le compte
8. Parent reçoit confirmation
9. Parent peut se connecter

### 8.2 Flux de Saisie des Notes (Professeur)
1. Professeur se connecte
2. Navigue vers "Saisie des Notes"
3. Sélectionne classe et trimestre
4. Saisit les notes de ses élèves
5. Système calcule les moyennes automatiquement
6. Professeur peut ajouter des remarques
7. Soumet les notes
8. Coordinateur reçoit pour validation
9. Notes deviennent visibles aux parents après validation

### 8.3 Flux de Suivi des Paiements (Bureau)
1. Bureau va sur "Gestion Financière"
2. Voit les paiements en attente et dettes
3. Envoie relance aux parents en retard
4. Parent paie (en ligne ou manuel)
5. Bureau marque paiement comme reçu
6. Système met à jour le statut d'accès
7. Parents et élève reçoivent confirmation

---

## 9. DONNÉES À IMPORTER/INITIALISER

- [ ] Années scolaires (au moins 5)
- [ ] Niveaux et classes standards
- [ ] Filières pré-configurées
- [ ] Matières standards du cursus malgache
- [ ] Utilisateurs initiaux (admin, bureau)
- [ ] Données élèves/profs existants (si migration)
- [ ] Calendrier scolaire

---

## 10. NOTES ET RECOMMANDATIONS

1. **Évolutivité:** Architecture prête pour 10,000+ utilisateurs
2. **Flexibilité:** Paramètres configurables par l'admin
3. **Compliance:** Respecte normes éducation Malagasy
4. **Support:** Plan de support utilisateur après launch
5. **Maintenance:** Mise à jour de sécurité hebdomadaire minimum
6. **Sauvegarde:** Backup automatique quotidien + test de restauration mensuel

---

**Approuvé par:** [Signature/Validation requise]  
**Date d'approbation:** [Date]  
**Prochaine révision:** [Date]
