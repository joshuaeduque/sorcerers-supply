import { cn } from "@/lib/utils"

import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// I think this is the right way to handle this in TypeScript?
interface SignupData {
    name: string,
    email: string,
    password: string
}

interface SignupFormProps extends React.ComponentPropsWithoutRef<'div'> {
    onSignupSubmit: (data: SignupData) => void
}

export function SignupForm({ className, onSignupSubmit, ...props }: SignupFormProps) {

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data : SignupData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string
        };

        onSignupSubmit(data);
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Sign up</CardTitle>
                    <CardDescription>
                        Enter your information below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    name="name"
                                    id="name"
                                    type="text"
                                    placeholder="John Smith"
                                    required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name="email"
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    name="password"
                                    id="password"
                                    type="password"
                                    required />
                            </div>
                            <Button type="submit" className="w-full">Sign up</Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a href="/login" className="underline underline-offset-4">Login</a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
