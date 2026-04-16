"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./SplashScreen";
import { cn } from "@/lib/utils";

export default function GlobalLayout({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 400); 

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <SplashScreen key="splash" />}
            </AnimatePresence>

            <div className={cn("transition-opacity duration-700", isLoading ? "opacity-0" : "opacity-100")}>
                {children}
            </div>
        </>
    );
}