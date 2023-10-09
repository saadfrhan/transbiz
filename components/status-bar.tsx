"use client"

import { useState, useEffect } from 'react';

export default function Statusbar({
    jvs_count
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


    return (
        <div
            className={`fixed text-sm inset-x-0 bottom-0 bg-gray-100 dark:bg-gray-800 shadow-lg transition-transform space-x-4 flex justify-between items-center px-4 duration-300 ease-in-out transform-gpu ${isVisible ? 'translate-y-0' : 'translate-y-full'
                }`}
        >
            <div className='flex gap-1'>
                <h2 className=" font-semibold dark:text-white">Journal Vouchers: </h2>
                <p className=" font-bold dark:text-white">{jvs_count}</p>
            </div>
        </div>
    )
}
