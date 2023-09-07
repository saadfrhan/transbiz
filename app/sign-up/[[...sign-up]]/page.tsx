"use client";

import { Card } from "@/components/ui/card";
import { H2 } from "@/components/ui/h2";
import { P } from "@/components/ui/p";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ErrorThrower from "@/components/error-thrower";
import Link from "next/link";

const formSchema = z.object({
	firstName: z.string().min(2, { message: "First name is too short" }),
	lastName: z.string().min(2, { message: "Last name is too short" }),
	email: z.string().email({ message: "Invalid email" }),
	password: z.string().min(8, { message: "Password is too short" }),
})

export default function Page() {

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
	})

	const { isLoaded, signUp, setActive } = useSignUp();
	const {push} = useRouter()


	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			if (!isLoaded) {
				return;
			}
			await signUp?.create({
				emailAddress: values.email,
				password: values.password,
				firstName: values.firstName,
				lastName: values.lastName			
      });

			// send the email.
			await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
			setPendingVerification(true);
		} catch (error) {
			console.error(JSON.stringify(error, null, 2));
			setError((error as any).errors[0].message);
		}
	}

	const onPressVerify = async (e:  any) => {
		e.preventDefault();
		if (!isLoaded) {
			return;
		}
		setError("")
		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code,
			});
			if (completeSignUp.status !== "complete") {
				/*  investigate the response, to see if there was an error
				 or if the user needs to complete more steps.*/
				console.log(JSON.stringify(completeSignUp, null, 2));
				setError("");
				setError("Invalid code")
			}
			if (completeSignUp.status === "complete") {
				await setActive({ session: completeSignUp.createdSessionId })
				toast.loading("Redirecting you to homepage...", {
					duration: 2000
				})
				setError("")
				push('/')
			}
		} catch (error) {
			console.error(JSON.stringify(error, null, 2));
			setError((error as any).errors[0].message);
		}
	};


	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState("");
	const [error, setError] = useState("");

	return <div className="flex justify-center items-center m-2 flex-col min-h-screen">
		<div className="text-center pb-6">
    <H2>Register</H2>
    <P>Already have an account? <Link href="/sign-in" className="text-primary cursor-pointer hover:underline">Sign In!</Link></P>
    </div>
		<Card className="p-12 max-[650px]:p-6 min-[748px]:w-[600px] max-[748px]:w-[500px] max-[650px]:w-[450px] max-[530px]:w-full w-full rounded-md border-[1px] border-gray-300 flex items-center justify-center gap-2 flex-col">
		{error && <ErrorThrower error={error} />}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col w-full">
					{!pendingVerification && (<>
						<div className="flex gap-x-12 gap-y-4 max-[650px]:flex-col">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name:</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last Name:</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
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
									<FormLabel>Password:</FormLabel>
									<FormControl>
										<Input {...field} type="password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full text-white gap-2 font-bold">
							Sign Up
						</Button>
					</>)}
				</form>
					{pendingVerification && (<>
						<form className="flex w-full gap-5 flex-col">
						<P>A code has been sent to your entered email.</P>
							<Input
								value={code}
								placeholder="Code..."
								onChange={async (e) => {
									setCode(e.target.value);
									if (code.length === 6) {
										await onPressVerify(e);
									}
								}}
							/>
							<Button className="w-full text-white" onClick={async (e) => await onPressVerify(e)}>
								Verify Email
							</Button>
						</form>
					</>)}
			</Form>
		</Card>
	</div>
} 