import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Login - Transportation Dashboard",
  description: "Login to Transportation Dashboard",
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