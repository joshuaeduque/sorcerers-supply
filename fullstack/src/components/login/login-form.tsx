import { cn } from "@/lib/utils"

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

import { FormEventHandler } from "react"

interface LoginData {
    email: string,
    password: string
}

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
    onLoginSubmit: (data: LoginData) => void
}

export function LoginForm({ className, onLoginSubmit, ...props }: LoginFormProps) {

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: LoginData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }

        onLoginSubmit(data);
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
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
                                    placeholder="m@example.com"
                                    required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                        Forgot your password?</a>
                                </div>
                                <Input
                                    name="password"
                                    id="password"
                                    type="password"
                                    required />
                            </div>
                            <Button type="submit" className="w-full">Login</Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="/signup" className="underline underline-offset-4">Sign up</a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export type { LoginData };