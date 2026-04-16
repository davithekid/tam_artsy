"use client"

import React from "react"
import { Activity } from "lucide-react"
import Image from "next/image"

export default function SplashScreen() {
    return (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="relative flex flex-col items-center gap-12 text-center animate-in fade-in zoom-in-95 duration-1000">
                
                <div className="relative group">
                    <div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-1000" />
                    
                    <div className='dark:hidden block relative'>
                        <Image
                            src="/logo/mini-logo.svg"
                            alt="Tam Artsy Logo"
                            width={220}
                            height={70}
                            priority
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center justify-center gap-3">
                            <Activity className="h-3 w-3 text-primary animate-pulse" />
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground italic">
                                Sincronizando Sistema
                            </p>
                        </div>
                    </div>

                    <div className="relative w-56 h-[2px] bg-muted/20 rounded-full overflow-hidden border border-border/5">
                        <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                        <div className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] animate-progress-loading" />
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes progress-loading {
                    0% { width: 0%; left: -100%; }
                    50% { width: 40%; left: 20%; }
                    100% { width: 100%; left: 100%; }
                }
                .animate-progress-loading {
                    position: absolute;
                    animation: progress-loading 2s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
                }
            `}</style>
        </div>
    )
}