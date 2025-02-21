'use client';

import { LoginForm } from '@/components/LoginForm/login-form'
import { auth } from '@/app/firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth';
import background from '../../assets/background/login.png';
import Image from 'next/image';
import { WandSparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation";
import { LoginData } from '@/types/authType';

export default function Login() {
  // Toaster
  const { toast } = useToast();

  // Use to Navigate after successful login
  const router = useRouter();

  const handleLoginSubmit = async (data: LoginData) => {

    try {
      const { email, password } = data;
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
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