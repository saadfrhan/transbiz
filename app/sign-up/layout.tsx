import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Sign Up",
}

export default function Layout(
	{ children }: { children: React.ReactNode }
) {
	return (
		<div>
			{children}
		</div>
	)
}