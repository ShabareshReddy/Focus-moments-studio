import Image from "next/image";

export default function BrandLogo({ className = "" }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <Image
                src="/Fmlogos.png"
                alt="Focus Moments Studio Logo"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
}