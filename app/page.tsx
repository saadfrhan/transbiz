import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export default function Home() {

  const { userId } = auth();

  if (userId) {
    redirect('/dashboard')
  } else {
    redirect('/sign-in')
  }

  return (
    <div>
      <h1></h1>
    </div>
  )
}
