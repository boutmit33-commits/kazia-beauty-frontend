# Cahier des Charges : Projet Kazia

## 1. PRESENTATION GENERALE

### 1.1 Contexte
Le projet **Kazia** vise à développer une plateforme e-commerce moderne et performante. Face à une forte demande pour des achats en ligne rapides et intuitifs, cette boutique applicative permet de mettre en valeur les produits (ex: cosmétiques, soins) de la marque et de faciliter la gestion du cycle de vente.

### 1.2 Objet du document
Ce document définit l'ensemble des spécifications fonctionnelles et techniques du projet Kazia. Il sert de cadre de référence contractuel et technique pour l'ensemble des parties prenantes (développeurs, chef de projet, client) concernant les besoins, l'architecture attendue, et le déroulement du projet.

### 1.3 Equipe projet
- **Commanditaire / Client** : Kazia
- **Chef de Projet / Product Owner** : À définir
- **Pôle Développement Frontend** : Oumayma Laalali
- **Pôle Développement Backend** : Latifa Boutmit

### 1.4 Stack technique & Outils 
- **Outils Frontend** : Next.js 16+, React 19, Tailwind CSS 4
- **Outils Backend** : Framework PHP Laravel 11/12
- **Base de données** : PostgreSQL / MySQL
- **Outils de développement et suivi** : Git (versioning), Serveur Node.js local, Artisan (CLI Laravel), Postman (test des endpoints d'API).

---

## 2. OBJECTIFS DU PROJET ET PUBLIC CIBLE (TARGETED AUDIENCE)

### 2.1 Objectifs
- Développer une interface e-commerce attractive, rapide à charger et 100% responsive (mobile-friendly).
- Mettre à disposition un panneau de contrôle (dashboard admin) simple pour gérer le catalogue en toute autonomie.
- Garantir un tunnel d'achat fiable, sécurisé et minimisant l'abandon de panier.

### 2.2 Public Cible (Targeted Audience)
- **Clients finaux (B2C)** : Une cible principalement orientée vers des consommateurs recherchant des produits spécifiques (ex. soins, beauté), allant du jeune internaute dynamique à la clientèle adepte des achats depuis le téléphone portable (smartphone). L'interface doit être assez intuitive pour convenir à des acheteurs de différents niveaux de maîtrise des outils numériques.
- **Administrateurs du site** : L'équipe de Kazia (marketing, e-commerce, logistique) dont le but est d'interagir facilement avec l'outil de gestion sans nécessiter de compétences avancées en programmation.

---

## 3. FONCTIONNALITES DETAILLEES

### 3.1 Module Client
- **Consultation du Catalogue** : Affichage des produits de la boutique (images, prix, description courte et état des stocks).
- **Fonctions de Recherche** : Filtrage dynamique des produits par catégories (ex: 'Skincare', 'All') et système de requêtage par mot-clé (nom du produit).
- **Panier Virtuel** : Ajout d'articles au panier et stockage temporaire de la sélection avec le montant récapitulatif.
- **Commande & Checkout** : Formulaire de renseignement pour l'expédition de la commande (Nom, Email, Adresse postale, Numéro de téléphone) et calcul terminal du total.
- **Espace Personnel** : Module d'inscription (Register), module de connexion (Login) et bouton de déconnexion.

### 3.2 Module Administrateur
- **Gestion du Catalogue (Produits)** : Droits de création (Create), lecture détaillée (Read), modification partielle/totale (Update) et retrait (Delete) du catalogue.
- **Suivis des Commandes** : Panneau indiquant la liste des commandes générées par le module client. Chaque commande affiche la liste des items et l'état actuel (ex. 'pending').
- **Gestion des Accès** : L'interface est masquée pour le public et est conditionnée par le booléen administrateur. 

---

## 4. SPECIFICATIONS TECHNIQUES

### 4.1 Architecture
Architecture structurée selon un modèle **Headless** (Découplé) permettant la dissociation de la logique métier et de l'affichage. 
Le Frontend (Next.js) consomme les ressources du Backend (Laravel) au travers d'appels API RESTful standardisés (par exemple les endpoints exposés sur `/api/products`).

### 4.2 Base de donnees
Le modèle relationnel Eloquent de Laravel s'articule autour des tables maitresses suivantes :
- `users` : Gestion des identifications, incluant le flag déterminant l'accès au rôle admin (`is_admin`).
- `products` : Fiche produit (identifiants uniques, nom, description explicite, montant commercial, volume du stock, sous-famille et url d'image par défaut).
- `orders` : Traces des transactions (coordonnées sécurisées de l'acheteur client, array JSON des produits achetés, total facture et statut d'avancement).

### 4.3 Securite
- **Authentification & API** : Laravel Sanctum sécurise chaque appel API client par la génération de jetons valides dans le système (`personal access tokens`).
- **Validation Serveur** : Toutes les entrées (panier, login) font l'objet de règles de validation automatiques Laravel pour pallier aux tentatives d'injections.
- **Cryptographie** : Tout mot de passe renseigné est chiffré par l'algorithme "bcrypt" avant l'insertion au sein de la base de données.

---

## 5. ORGANISATION ET PLANNING (8 semaines)

- **Semaines 1 - 2** : Analyse, structuration DB, migrations et configuration des accès d'API via Laravel.
- **Semaines 3 - 4** : Conception UI Frontend, réalisation du template React/Tailwind, et connexion aux routes d'affichage catalogue.
- **Semaines 5 - 6** : Implémentation du tunnel d'achat (panier et commande), création de session client. 
- **Semaine 7** : Développement de la logique des vues administrateur (Backoffice) pour le pilotage complet.
- **Semaine 8** : Tests d'intégration, audits de performance, validation métier et déploiement initial.

---

## 6. ESTIMATION DES COUTS (PROJET V1)

L'estimation de temps et d'effort pour cette première phase est évaluée ainsi (les montants financiers viendront affiner cette charge suivant la facturation journalière) :
- **Conception Backend & API** : ~ 15 Jours / Homme
- **Intégration Frontend Next.js** : ~ 20 Jours / Homme
- **Maquettage & Design UX** : ~ 5 Jours / Homme
- **Pilotage Projet & Phase de tests** : ~ 8 Jours / Homme
- **TOTAL temps prévu** : *Environ 48 Jours / Homme*

*(Note: Les frais d'hébergement matériel, de noms de domaine, et de serveurs neufs ou certificats SSL ne sont pas indexés ici).*

---

## 7. EXCLUSIONS (NON INCLUS)

Les processus suivants ne font pas partie de ce cahier des charges et devront faire l'objet d'un développement ultérieur si nécessité :
- L’intégration d'un Prestataire de Service de Paiement (PSP comme Stripe / Mollie) de manière concrète qui génèrerait un appel au serveur TPE.
- La réalisation d'une application native App Store / Play Store au profit de la PWA/Website existante.
- Moteur multilingue (L'application sera initialisée avec une seule langue source principale).

---

## 8. SIGNATURES

Les soussignés déclarent avoir pris pleinement connaissance des caractéristiques et modalités de réalisation des présentes étapes.

**Pour le Client (Kazia)** 
Signature précédée de la mention "Lu et approuvé"

_________________________________________
Date :  ___ / ___ / 2026


**Pour l'Equipe de Développement / Agence** 
Signature précédée de la mention "Lu et approuvé"

_________________________________________
Date :  ___ / ___ / 2026
