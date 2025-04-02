"use client"; // Indique que ce composant est côté client

import { useRouter, useSearchParams } from "next/navigation";

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error"); // Récupérer le message d'erreur de l'URL

  return (
    <div>
      <h1>Erreur d'authentification</h1>
      {error && <p>Erreur : {error}</p>}
      <button onClick={() => router.push("/login")}>Retour à la connexion</button>
    </div>
  );
}