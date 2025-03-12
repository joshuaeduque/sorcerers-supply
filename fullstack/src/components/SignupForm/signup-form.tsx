
import React from "react"
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
import { cn } from "@/lib/utils"
import { SignupData } from '@/types/authentication'

interface SignupFormProps extends React.ComponentPropsWithoutRef<'div'> {
    onSignupSubmit: (data: SignupData) => void
}

export function SignupForm({ className, onSignupSubmit, ...props }: SignupFormProps) {

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data : SignupData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        };

        onSignupSubmit(data);
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="bg-black/40 border-[1px] border-white/60 dark">
                <CardHeader>
                    <CardTitle className="text-2xl self-center">Sign up</CardTitle>
                    <CardDescription>
                        Enter your information below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name="email"
                                    id="email"
                                    type="email"
                                    className="border-2 border-white/50"
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
                                    className="border-2 border-white/50"
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