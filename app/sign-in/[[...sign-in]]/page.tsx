"use client";

import ErrorThrower from "@/components/error-thrower";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { H2 } from "@/components/ui/h2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { P } from "@/components/ui/p";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from 'zod';

const formSchema = z.object({
	email: z.string().email({ message: "Invalid email" }),
	password: z.string().min(8, { message: "Password is too short" })
})


export default function Page() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: ""
		},
	});

	const searchParams = useSearchParams();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');
	const [successfulCreation, setSuccessfulCreation] = useState(false);
	const [complete, setComplete] = useState(false);
	const [secondFactor, setSecondFactor] = useState(false);
	const [isForgotPassword, setIsForgotPassword] = useState(false);
	const [error, setError] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const { isLoaded, signIn, setActive } = useSignIn();
	const { push } = useRouter()

	if (!isLoaded) {
		return null;
	}


	async function onSubmit(values: z.infer<typeof formSchema>) {
		await signIn
			?.create({
				identifier: values.email,
				password: values.password,
				redirectUrl: searchParams.get('redirect_url') || "/"
			})
			.then(async (result) => {
				if (result.status === "complete") {
					console.log(result);
					await setActive({ session: result.createdSessionId });
					toast.loading("Redirecting you to homepage...", {
						duration: 2000
					})
					push("/")
				}
				else {
					console.log(result);
				}
			})
			.catch((err) => {
				console.error("error", err.errors[0].longMessage)
				setError(err.errors[0].longMessage)
			});
	}

	async function create(e: SyntheticEvent) {
		e.preventDefault();
		await signIn
			?.create({
				strategy: 'reset_password_email_code',
				identifier: email,
			})
			.then(_ => {
				setSuccessfulCreation(true);
				toast.loading("Redirecting you to homepage...", {
					duration: 2000
				})
				push('/')
			})
			.catch(err => {
				console.error('error', err.errors[0].longMessage)
				setError(err.errors[0].longMessage)
			});
	}

	async function reset(e: SyntheticEvent) {
		e.preventDefault();
		await signIn
			?.attemptFirstFactor({
				strategy: 'reset_password_email_code',
				code,
				password,
			})
			.then(async (result) => {
				if (result.status === 'needs_second_factor') {
					setSecondFactor(true);
				} else if (result.status === 'complete') {
					await setActive({ session: result.createdSessionId });
					setComplete(true);
					toast.loading("Redirecting you to homepage...", {
						duration: 2000
					});
				} else {
					console.log(result);
				}
			})
			.catch(err => {
				console.error('error', err.errors[0].longMessage)
				setError(err.errors[0].longMessage)
			});
	}

	return <div className="flex justify-center items-center flex-col h-auto py-16 px-3">
		<H2 className="text-center px-10 pb-5">Log In</H2>
		<Card className="p-12 max-[650px]:p-6 min-[748px]:w-[600px] max-[748px]:w-[500px] max-[650px]:w-[450px] max-[530px]:w-full w-full">
			{error && <ErrorThrower error={error} />}
			{!isForgotPassword && <div className="flex mt-2 items-center justify-center gap-2 flex-col">
				<H2>Welcome back!</H2>
				<P>Don&#39;t have an account? <Link href="/sign-up" className="text-primary cursor-pointer hover:underline">Sign Up!</Link></P>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full">
						<div className="space-y-8">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email:</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<div className="flex justify-between items-center w-full">
										<FormLabel>Password:</FormLabel>
										<div className="hover:underline" onClick={() => setIsForgotPassword(true)}>Forgot Password?</div>
										</div>
										<FormControl>
										<Input {...field} type={showPassword ? "text" : "password"} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex justify-start w-full gap-2 items-center py-4 ">
								<Checkbox checked={showPassword} onCheckedChange={() => setShowPassword(!showPassword)} /> Show Password
						</div>
						<Button type="submit" className="w-full">Log In</Button>
					</form>
				</Form>
			</div>}
			{isForgotPassword && (
				<form
					className="flex flex-col space-y-4 w-full"
					onSubmit={!successfulCreation ? create : reset}
				>
					{!successfulCreation && !complete && (
						<>
							<Label htmlFor='email'>Please provide email address</Label>
							<Input
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>

							<Button>Sign in</Button>
						</>
					)}

					{successfulCreation && !complete && (
						<>
							<Label htmlFor='password'>New password</Label>
							<Input
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>

							<Label htmlFor='password'>A code has been sent to your email address.</Label>
							<Input
								type='text'
								placeholder="Please enter the code"
								value={code}
								onChange={e => setCode(e.target.value)}
							/>
							<Button disabled={(password.length < 8 && code.length !== 6) ? true : false}>Reset</Button>
						</>
					)}

					{complete && <div className="flex flex-col w-full gap-3">
						<P>You successfully changed your password</P>
						<Link href="/" className={
							buttonVariants()
						}>Home</Link>							
					</div>}
					{secondFactor && '2FA is required, this UI does not handle that'}
				</form>
			)}
		</Card>
	</div>
}