import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@app/lib/mongodb";
import { compare } from "bcrypt";
import { JWT } from "next-auth/jwt";

// Extend the built-in session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role?: string;
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role?: string;
  }
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google Client ID or Client Secret is missing in .env");
}

//export const authOptions = {
  //providers: [
    //GoogleProvider({
      //clientId: process.env.GOOGLE_CLIENT_ID, // Assurez-vous que c'est défini
      //clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Assurez-vous que c'est défini
    //}),
    // Ajoute d'autres fournisseurs si nécessaire (Facebook, GitHub, etc.)
  //],
  //secret: process.env.NEXTAUTH_SECRET, // Assurez-vous que cette variable est définie aussi
//};

//export default NextAuth(authOptions);
//}
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing credentials");
        }

        const { email, password } = credentials as { 
          email: string;
          password: string;
        };

        const db = await connectToDatabase();
        const user = await db.collection("users").findOne({ email });

        if (!user) throw new Error("Utilisateur non trouvé");

        const isValid = await compare(password, user.password);
        if (!isValid) throw new Error("Mot de passe incorrect");

        return { id: user._id.toString(), email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
