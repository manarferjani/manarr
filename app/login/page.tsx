"use client"; // Directive pour indiquer que ce composant est côté client

import React, { useState } from 'react';
import * as z from 'zod';
import { Button } from "@app/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'; // ✅ Corrigé: Utiliser useRouter pour la navigation
import axios, { AxiosError } from 'axios';
import { FaFacebook, FaGithub, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa6';
import Link from 'next/link';
import { signIn } from "next-auth/react";

// Définition du schéma de validation avec zod
const loginSchema = z.object({
  email: z.string().email("Email must be valid."),
  password: z.string().min(8, "Password should have at least 8 characters."),
});

const LoginPage = () => {
  const router = useRouter(); // ✅ Corrigé: Utilisation de useRouter
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);

  // Fonction de soumission du formulaire
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    console.log("🔹 Données de connexion :", values);
    try {
      const response = await axios.post("http://localhost:3000/api/users/signin", {
        email: values.email,
        password: values.password,
      });

      console.log("✅ Réponse API:", response.data);

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }

      toast.success("Login successful!"); // ✅ Correction du toast
      router.push("/dashboard");
    } catch (error) {
      console.error("❌ Erreur Axios complète :", error);

      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || "Invalid credentials";
        toast.error(errorMessage); // ✅ Correction du toast
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    const res = await fetch("../Backend/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <div className='w-full h-screen flex'>
      {/* Partie gauche avec l'image */}
      <div
        className='w-[55%] h-full flex flex-col items-center justify-center relative'
        style={{
          backgroundImage: "url('/images/login_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Filtre sombre */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div> {/* Filtre sombre semi-transparent */}

        <div className='absolute bottom-8 left-0 right-0 p-8 text-white text-left'>
          <p className='text-4xl font-bold mb-2 -mt-8'>
            Empower your growth with data-driven insights – Elevate your skills now!
          </p>
          <p className='text-lg mb-4'>
            Create a free account and get full access to all features. Trusted by over 4,000 professionals.
          </p>
        </div>
      </div>

      {/* Partie droite - Formulaire de connexion */}
      <div className='w-[45%] h-full bg-[#1a1a1a] flex flex-col p-20 justify-center'>
        <div className='w-full flex flex-col max-w-[450px] ml-auto mr-0'>
          <div className='w-full max-w-[350px] flex flex-col mb-10 text-white'>
            <h3 className='text-3xl font-bold mb-2'>Log In</h3>
            <p className='text-sm mb-4'>Welcome back! Please enter your credentials to access your account.</p>
          </div>

          <div className='w-full flex flex-col mb-6'>
            <input
              type='email'
              placeholder='Email'
              className='w-full max-w-[350px] text-sm text-white py-2 mb-4 bg-transparent border-b border-gray-500 outline-none'
              {...form.register("email")}
            />
            <div className='relative w-full max-w-[350px]'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                className='w-full text-sm text-white py-2 mb-4 bg-transparent border-b border-gray-500 outline-none pr-10'
                {...form.register("password")}
              />
              <button
                type='button'
                className='absolute right-0 top-2 text-gray-500 focus:outline-none'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash className='h-4 w-4' /> : <FaEye className='h-4 w-4' />}
              </button>
              <div className="w-full flex justify-end text-xs text-gray-400"
              onClick={handleForgotPassword} style={{ cursor: "pointer", color: "blue" }}>
                <Link href="/forgot-password" className="hover:underline text-white">
                Forgot Password
                </Link>
              </div>

            </div>
          </div>

          {/* Affichage des erreurs de validation */}
          {form.formState.errors && (
            <div className='text-sm text-red-500 mb-4 max-w-[350px]'>
              {Object.values(form.formState.errors).map((error, index) => (
                <p key={index}>{error.message}</p>
              ))}
            </div>
          )}

          <div className='w-full flex flex-col mb-4'>
            <button
              className='w-full max-w-[350px] bg-transparent border border-white text-xs text-white my-2 font-semibold rounded-md p-3 text-center flex items-center justify-center cursor-pointer 
              active:bg-white active:text-black focus:bg-white focus:text-black' // Ajout de ces classes
              onClick={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting}
            >
              Log In With Email and Password
            </button>
          </div>

          {/* Divider avec 'OR' */}
          <div className='w-full flex items-center justify-center relative py-4 max-w-[350px]'>
            <div className='w-full h-[1px] bg-gray-500'></div>
            <p className='text-sm absolute text-gray-500 bg-[#1a1a1a] px-2'>OR</p>
          </div>

          {/* Boutons de connexion avec Google, Facebook et GitHub */}
          <div className="socialSignUpOptions max-w-[350px]">
            <Button variant="outline" className="socialFormBtn text-sm" onClick={() => signIn("google")}>
              <FaGoogle className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="socialFormBtn text-sm" onClick={() => signIn("facebook")}>
              <FaFacebook className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="socialFormBtn text-sm" onClick={() => signIn("github")}>
              <FaGithub className="h-5 w-5" />
            </Button>
          </div>

          {/* Lien vers la page d'inscription */}
          <div className='w-full flex items-center justify-center mt-10 max-w-[350px]'>
            <p className='text-xs font-normal text-gray-400'>
              Don't have an account?  
              <Link href='/signup' className='font-semibold  text-white underline'> Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
