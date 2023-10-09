import { getGreeting } from "@/lib/utils"
import { auth, currentUser } from "@clerk/nextjs"

export const metadata = {
    title: 'Dashboard'
}

export default async function Page() {
    const user = await currentUser()
    return (
        <div className="lg:container lg:p-5 max-lg:p-2 h-min-screen">
            <p
                className="text-2xl font-bold"
            >{getGreeting()} {user?.firstName}!</p>

        </div>
    )
}
