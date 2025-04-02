// frontend/types/backend.d.ts
declare module '@Backend/models/users' {
    import { Model } from 'mongoose'; // Import des types Mongoose
  
    // Définition de l'interface utilisateur
    interface IUser {
      name: string;
      email: string;
      password: string;
      role: 'admin' | 'user';
      createdAt: Date;
    }
  
    // Déclaration de la constante User
    const User: Model<IUser>; // Dit à TS que User est un modèle Mongoose
    export { User }; // Export correspondant à votre fichier JS
  }

/*Procédure Complète pour les Modèles Backend/Frontend
Pour tout nouveau modèle :
Backend :
1.Créer le modèle Mongoose dans
Backend/models/nomDuModele.js

Déclarations TypeScript :
2.Générer le fichier de déclaration dans
frontend/types/nomDuModele.d.ts

Types Frontend :
3.Créer un type optimisé pour le frontend dans
frontend/types/nomDuModeleTypes.ts
(Exemple ci-dessous)

Configuration :
4.Ajouter les alias nécessaires dans
tsconfig.json si nouveau chemin*/