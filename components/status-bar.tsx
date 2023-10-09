"use client"

import { getGreeting } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import Refresh from './refresh';
import { Plus, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function Statusbar({
    jvs_count,
}: {
    jvs_count: number
}) {
    const [isVisible, setIsVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    // Function to handle scroll event
    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        // Add scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);
        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const { user } = useUser()


    return (
        <div
            className={`fixed text-sm inset-x-0 bottom-0 bg-background border-t shadow-lg transition-transform space-x-4 flex justify-between items-center py-2 px-3 duration-300 ease-in-out transform-gpu ${isVisible ? 'translate-y-0' : 'translate-y-full'
                }`}
        >
            <div className='flex gap-2 items-center'>
                <h2 className=" font-semibold">{getGreeting()} {
                    user?.firstName
                }! </h2>
                <Refresh>
                    <RefreshCcw className='text-muted-foreground w-4 h-4 cursor-pointer' />
                </Refresh>
            </div>
            <div className='flex gap-2 items-center'>
                <h2 className=" font-semibold dark:text-white">Journal Vouchers: </h2>
                <p className=" font-bold dark:text-white">{jvs_count}</p>
                <Link href="/dashboard/journal-vouchers/add">
                    <Plus className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
