"use client"
import React from "react"
import { Sparkles } from "lucide-react" 
import Image from "next/image"

export default function SplashScreen() {
    return (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_10%,transparent_100%)]" />
            
            <div className="relative flex flex-col items-center gap-16 text-center">
                <div className="relative animate-in fade-in zoom-in duration-1000 ease-out">
                    <div className="absolute -inset-10 bg-primary/5 rounded-full blur-[80px] animate-pulse" />
                    
                    <div className='dark:hidden block relative hover:scale-105 transition-transform duration-700'>
                        <Image
                            src="/logo/mini-logo.svg"
                            alt="Tam Artsy Logo"
                            width={260} 
                            height={80}
                            priority
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-8">
                    <div className="flex items-center justify-center gap-3 animate-pulse">
                        <Sparkles className="h-3.5 w-3.5 text-primary/60" />
                        <p className="text-[11px] font-medium uppercase tracking-[0.6em] text-foreground/60 leading-none">
                            Curando Experiência
                        </p>
                    </div>

                    <div className="relative w-48 h-[1px] bg-muted/30 overflow-hidden">
                        <div 
                            className="absolute h-full bg-foreground animate-progress-slide"
                            style={{
                                width: '30%',
                                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                            }}
                        />
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes progress-slide {
                    0% { left: -100%; width: 20%; }
                    50% { width: 50%; }
                    100% { left: 100%; width: 20%; }
                }
                .animate-progress-slide {
                    animation: progress-slide 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
            `}</style>
        </div>
    )
}