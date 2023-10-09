"use client"

import { getGreeting } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import Refresh from './refresh';
import { Folders, Plus, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { TooltipComponent } from './tooltip-component';

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
                    <TooltipComponent label='Refresh'>
                        <RefreshCcw className='text-muted-foreground w-4 h-4 cursor-pointer hover:text-foreground duration-300' />
                    </TooltipComponent>
                </Refresh>
            </div>
            <div className='flex gap-2 items-center'>
                <TooltipComponent label={`
                    Journal Voucher: ${jvs_count}
                `}>
                    <div className='flex gap-2 items-center text-muted-foreground hover:text-foreground duration-300'>
                        <Folders className='w-4 h-4' />
                        <p>{jvs_count}</p>
                    </div>
                </TooltipComponent>
                <TooltipComponent label='Create a new JV'>
                    <Link href="/dashboard/journal-vouchers/add">
                        <Plus className="w-4 h-4 text-muted-foreground hover:text-foreground duration-300" />
                    </Link>
                </TooltipComponent>
            </div>
        </div>
    )
}
