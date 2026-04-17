"use client";

import { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";

export default function LoadingScreen() {

    return (
        <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
            <div className="flex flex-col items-center text-center leading-none">


                <div className=" ml-10 flex justify-center items-center">
                    <BrandLogo className="w-30 h-30" />
                </div>


                {/* Main Text (Single Line) */}
                <h1 className="-mt-7 font-space-grotesk font-extrabold text-2xl md:text-3xl text-brand-dark tracking-wider">
                    FOCUS MOMENTS STUDIO
                </h1>

                {/* ESTD */}
                <p className="mt-2 text-[10px] font-space-grotesk md:text-xs tracking-[0.35em] text-brand-orange font-bold uppercase">
                    ESTD 2018
                </p>

                {/* Loading Line */}
                <div className="mt-6 w-35 h-[2px] bg-brand-orange/20 rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full w-1/2 bg-brand-orange animate-loading" />
                </div>

            </div>

            <style jsx>{`
    @keyframes loading {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(200%);
        }
    }

    .animate-loading {
        animation: loading 1.4s ease-in-out infinite;
    }
`}</style>
        </div>
    );
}