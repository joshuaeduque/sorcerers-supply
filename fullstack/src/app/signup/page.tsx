"use client";

import { SignupForm } from '@/components/signup/signup-form'

export default function Signup() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <SignupForm className='dark' />
          </div>
        </div>
      )
}