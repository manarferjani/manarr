import { signIn } from "next-auth/react";

const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    signIn('google'); // Appel à la fonction de connexion Google
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Connexion avec Google
    </button>
  );
};

export default GoogleSignInButton;
