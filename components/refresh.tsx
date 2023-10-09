"use client";

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

export default function Refresh({
    children
}: {
    children: React.ReactNode
}) {
    const { refresh } = useRouter()
    return (
        <div onClick={() => {
            refresh()
            toast.success('Refreshed!')
        }}>
            {children}
        </div>
    )
}
