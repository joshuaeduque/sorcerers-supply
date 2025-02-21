"use client";

import { SignupForm, SignupData } from '@/components/Signup/signup-form'

import { auth } from '@/app/firebase/config';
import background from '../../assets/background/login.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import { WandSparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation";

export default function Signup() {

  const {toast} = useToast();
  const router = useRouter();

  const handleSignupSubmit = async (data: SignupData) => {

        try {
          const { email, password } = data;
      
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
          toast({
            title: "Login successful",
            variant: "success",
            description: "Welcome back!",
          });
      
          const token = await userCredential.user.getIdToken();
      
          // Store token in cookies
          document.cookie = `token=${token}; path=/;`;
      
          router.push('/');
    
        } catch (error) {
          console.error(error);
      
          toast({
            title: "Login failed",
            variant: "destructive",
            description: "Please check your email and password and try again.",
          });
        }

    const email = data.email;
    const password = data.password;

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // console.log('user cred', userCredential);
        alert('Signed up successfully');
      })
      .catch(error => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 h-screen overflow-hidden w-full">

      {/* Background image */}
      <Image src={background} alt='background' fill={true} className='fixed -z-20 inset-0'/>
      <div className='fixed w-full h-full backdrop-blur-md -z-10'></div>
      
      {/* Header */}
      <h1 className='text-3xl font-semibold text-center text-white'> <WandSparkles className='inline mx-2'/>Sorcerer's Supply</h1>

        <SignupForm onSignupSubmit={handleSignupSubmit} className='dark' />
    </div>
  )
}