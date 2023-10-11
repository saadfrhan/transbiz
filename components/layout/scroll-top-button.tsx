"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { ChevronUp } from 'lucide-react';
import { TooltipComponent } from '../tooltip-component';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show the button when the user scrolls down 100 pixels
    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to the top of the page when the button is clicked
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Add a scroll event listener when the component mounts
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <TooltipComponent label='Scroll to top'>
            <div
                className={`fixed bottom-4 right-4 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    } transition-opacity duration-300 cursor-pointer`}
                onClick={scrollToTop}
            >
                <Button size="icon" variant="outline">
                    <ChevronUp size={24} />
                </Button>
            </div>
        </TooltipComponent>
    );
};

export default ScrollToTopButton;
