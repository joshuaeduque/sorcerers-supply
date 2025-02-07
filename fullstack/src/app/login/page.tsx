'use client';

import { signInWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { WandSparkles } from 'lucide-react';

import { LoginForm } from '@/components/LoginForm/login-form'

import { useToast } from "@/hooks/use-toast"

import { auth } from '@/app/firebase/config'

import { LoginData } from '@/types/login';

import background from '../../assets/background/login.png';

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();

  const handleLoginSubmit = (data: LoginData) => {
    const email = data.email;
    const password = data.password;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast({
          title: "Login successful",
          variant: "success",
          description: "Welcome back!",
        })

        router.push('/');
      })
      .catch(error => {
        console.error(error.message);
        toast({
          title: "Login failed",
          variant: "destructive",
          description: "Please check your email and password and try again.",
        })
      });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 h-screen overflow-hidden w-full">
      
      {/* Background image */}
      <Image src={background} alt='background' fill={true} className='fixed -z-20 inset-0'/>
      <div className='fixed w-full h-full backdrop-blur-md -z-10'></div>
      
      {/* Header */}
      <h1 className='text-3xl font-semibold text-center text-white'> <WandSparkles className='inline mx-2'/>Sorcerer's Supply</h1>

      {/* Login form */}
      <LoginForm onLoginSubmit={handleLoginSubmit}/>
    </div>
  )
}