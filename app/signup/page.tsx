"use client"; // Directive pour indiquer que ce composant est côté client

import React, { useState } from 'react'; // Importer useState
import * as z from 'zod';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation'; 
import { Button } from "@app/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { signIn } from "next-auth/react";
import { signUpSchema } from '@app/lib/schemas'; // Import the schema from the schemas file
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@app/components/ui/form';
import { Input } from '@app/components/ui/input';
import { FaFacebook, FaGithub, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa6'; // Importer les icônes d'œil
import Link from 'next/link';

const Page = () => {
  // Initialiser le formulaire avec react-hook-form et zod
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const [message, setMessage] = useState<string>(''); // Déclarer `setMessage`

  // États pour gérer la visibilité des mots de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fonction appelée lors de la soumission du formulaire
  
   // Type généré à partir du schéma
  type SignUpFormValues = z.infer<typeof signUpSchema>;

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/signup', {
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'user',
    });

    console.log("✅ Réponse API:", response.data); // Vérifier la réponse

    // Afficher un toast de succès
    toast.success("User created successfully !", {
      duration: 3000, // 5 secondes
    });
    router.push("/login");
  } catch (error) {
    console.error("❌ Erreur Axios complète :", error); // Log détaillé

    if (error instanceof AxiosError) {
      console.error("📌 Réponse serveur :", error.response?.data); // Voir l'erreur exacte du serveur
      toast.error(error.response?.data?.message || "An error occurred", {
      duration: 3000,
      });

    } else {
      toast.error("An unexpected error occurred !", {
        duration: 3000,
      });
    }
  }

      
   
  };

  return (
    <div className='w-full h-screen flex'>
      {/* Left half of the screen - background image */}
      <div
        className='w-[55%] h-full flex flex-col items-center justify-center relative'
        style={{
          backgroundImage: "url('/images/loginscreenpic.png')", // Chemin corrigé
          backgroundSize: 'cover', // Ajuste l'image pour couvrir tout l'espace
          backgroundPosition: 'center', // Centre l'image
        }}
      >
        {/* Filtre sombre */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div> {/* Filtre sombre semi-transparent */}

        {/* Conteneur pour les phrases en bas de la partie gauche */}
        <div className='absolute bottom-8 left-0 right-0 p-8 text-white text-left'>
          <p className='text-4xl font-bold mb-2 -mt-8'>Empower your growth with data-driven insights – Elevate your skills now!</p>
          <p className='text-lg mb-4'>Create a free account and get full access to all features. Trusted by over 4,000 professionals.</p>
        </div>
      </div>

      {/* Right half of the screen - signup form */}
      <div className='w-[45%] h-full bg-[#1a1a1a] flex flex-col p-20 justify-center'>
        {/* Conteneur interne aligné à droite et centré verticalement */}
        <div className='w-full flex flex-col max-w-[450px] ml-auto mr-0'>
          {/* Header section with title and welcome message */}
          <div className='w-full flex flex-col mb-10 text-white'>
            <h3 className='text-3xl font-bold mb-2'>Sign Up</h3> {/* Titre aligné à droite */}
            <p className='text-sm mb-4'>Welcome! Please enter your information below to begin.</p> {/* Texte Welcome! aligné à droite */}
          </div>

          {/* Input fields for name, email, password, and confirm password */}
          <div className='w-full flex flex-col mb-6'>
            <input
              type='text'
              placeholder='Name'
              className='w-full max-w-[350px] text-sm text-white py-2 mb-4 bg-transparent border-b border-gray-500 outline-none' // Suppression de focus:border-white
              {...form.register("name")} // Lier le champ "name" à react-hook-form
            />
            <input
              type='email'
              placeholder='Email'
              className='w-full max-w-[350px] text-sm text-white py-2 mb-4 bg-transparent border-b border-gray-500 outline-none' // Suppression de focus:border-white
              {...form.register("email")} // Lier le champ "email" à react-hook-form
            />
            {/* Champ de mot de passe avec icône d'œil */}
            <div className='relative w-full max-w-[350px]'>
              <input
                type={showPassword ? 'text' : 'password'} // Basculer entre 'text' et 'password'
                placeholder='Password'
                className='w-full text-sm text-white py-2 mb-4 bg-transparent border-b border-gray-500 outline-none pr-10' // Ajouter pr-10 pour l'espace de l'icône
                {...form.register("password")} // Lier le champ "password" à react-hook-form
              />
              <button
                type='button'
                className='absolute right-0 top-2 text-gray-500 focus:outline-none'
                onClick={() => setShowPassword(!showPassword)} // Utiliser `showPassword` ici
              >
                {showPassword ? <FaEyeSlash className='h-4 w-4' /> : <FaEye className='h-4 w-4' />}
              </button>
            </div>
            {/* Champ de confirmation de mot de passe avec icône d'œil */}
            <div className='relative w-full max-w-[350px]'>
              <input
                type={showConfirmPassword ? 'text' : 'password'} // Basculer entre 'text' et 'password'
                placeholder='Re-Enter Password'
                className='w-full text-sm text-white py-2 mb-4 bg-transparent border-b border-gray-500 outline-none pr-10' // Ajouter pr-10 pour l'espace de l'icône
                {...form.register("confirmPassword")} // Lier le champ "confirmPassword" à react-hook-form
              />
              <button
                type='button'
                className='absolute right-0 top-2 text-gray-500 focus:outline-none'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Basculer la visibilité du mot de passe
              >
                {showConfirmPassword ? <FaEyeSlash className='h-4 w-4' /> : <FaEye className='h-4 w-4' />} {/* Afficher l'icône appropriée */}
              </button>
            </div>
          </div>

          {/* Display error message if there is one */}
          {form.formState.errors && (
            <div className='text-sm text-red-500 mb-4 max-w-[350px]'> {/* Aligner avec les inputs */}
              {Object.values(form.formState.errors).map((error, index) => (
                <p key={index}>{error.message}</p>
              ))}
            </div>
          )}

          {/* Button to sign up with email and password */}
          <div className='w-full flex flex-col mb-4'>
          <button
            className='w-full max-w-[350px] bg-transparent border border-white text-xs text-white my-2 font-semibold rounded-md p-3 text-center flex items-center justify-center cursor-pointer 
            active:bg-white active:text-black focus:bg-white focus:text-black' // Ajout de ces classes
            onClick={form.handleSubmit(onSubmit)} 
            disabled={form.formState.isSubmitting}
          >
            Sign Up With Email and Password
          </button>
          </div>

          {/* Afficher le message de succès ou d'erreur */}
          {message && (
            <div className="text-sm text-white bg-green-500 p-2 mt-2 rounded text-center">
          {message}
          </div>
          )}


          {/* Divider with 'OR' text */}
          <div className='w-full flex items-center justify-center relative py-4 max-w-[350px]'> {/* Aligner avec les inputs */}
            <div className='w-full h-[1px] bg-gray-500'></div>
            <p className='text-sm absolute text-gray-500 bg-[#1a1a1a] px-2'>OR</p> {/* Taille réduite : text-sm */}
          </div>

          {/* Buttons to sign up with Google, Facebook, or GitHub */}
          <div className="socialSignUpOptions max-w-[350px]"> {/* Aligner avec les inputs */}
            <Button variant="outline" className="socialFormBtn text-sm"
            onClick={() => signIn('google')} // Ajout de la fonction signIn pour la connexion Google
            >
            <FaGoogle className="h-5 w-5" />
            
            </Button>

            <Button variant="outline" className="socialFormBtn text-sm"> {/* Taille réduite : text-sm */}
                <FaFacebook className="h-5 w-5" /> 
            </Button>
            <Button variant="outline" className="socialFormBtn text-sm"> {/* Taille réduite : text-sm */}
                <FaGithub className="h-5 w-5" /> 
            </Button>
          </div>
        </div>

        {/* Link to login page */}
        <div className='w-full flex flex-col items-center mt-10 max-w-[380px]'>
          <p className='text-xs font-normal text-gray-400 text-left ml-20'>
           Already have an account?   
           <Link href='/login' className='font-semibold text-white underline'>Log In</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Page;