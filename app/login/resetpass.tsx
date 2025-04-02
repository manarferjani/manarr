"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword })
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div>
      <h2>Réinitialiser le mot de passe</h2>
      <input type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={handleResetPassword}>Confirmer</button>
      {message && <p>{message}</p>}
    </div>
  );
}
