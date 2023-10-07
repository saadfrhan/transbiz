import Navbar from '@/components/layout/navbar'
import Statusbar from '@/components/status-bar'
import ThemeToggler from '@/components/theme-toggler'
import dbConnect from '@/lib/db'
import client from '@/lib/models/client'
import { UserButton } from '@clerk/nextjs'

async function countClients() {
    await dbConnect();
    return client.countDocuments({})
}

export default async function Layout(
    { children }:
        { children: React.ReactNode }
) {

    const clients_count = await countClients();

    return (
        <div>
            <div
                className="flex px-5 py-5 max-lg:px-2.5 max-lg:py-2.5 border-b items-center justify-between gap-2.5"
            >
                <div className='flex gap-4'>
                    <Navbar />
                    <ThemeToggler />
                </div>
                <UserButton afterSignOutUrl="/sign-in" appearance={{
                    elements: {
                        avatarBox: "w-10 h-10 rounded-md z-[-50]"
                    }
                }} />
            </div>
            {children}
            <Statusbar clients_count={clients_count} />
        </div>
    )
}
