"use client";

import { LoginForm } from '@/components/login/login-form'

export default function Login() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <LoginForm onLoginSubmit={(data)=>{console.log('login data', data)}} className='dark' />
          </div>
        </div>
      )
}