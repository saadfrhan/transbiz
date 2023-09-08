import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Signup - Transportation Dashboard",
  description: "Signup to Transportation Dashboard",
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