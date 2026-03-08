export default function BrandLogo({ className = "w-32 h-auto", variant = "colored" }) {
    // If variant is 'white', we force white fills for the text and F/M. Otherwise use brand gradients.
    const isWhite = variant === "white";

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 250"
            className={className}
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                {/* Yellow-Orange Gradient for F and M */}
                <linearGradient id="grad-gold" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={isWhite ? "#FFF" : "#FFC107"} />
                    <stop offset="100%" stopColor={isWhite ? "#FFF" : "#FF7043"} />
                </linearGradient>

                {/* Red-Orange Gradient for the Hand */}
                <linearGradient id="grad-red" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={isWhite ? "#FFF" : "#FF5252"} />
                    <stop offset="100%" stopColor={isWhite ? "#FFF" : "#D32F2F"} />
                </linearGradient>

                {/* Lens Gradient */}
                <radialGradient id="grad-lens" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#444" />
                    <stop offset="80%" stopColor="#111" />
                    <stop offset="100%" stopColor="#000" />
                </radialGradient>

                {/* Lens Reflection */}
                <linearGradient id="grad-glare" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
                </linearGradient>

                {/* Camera Top Bars */}
                <linearGradient id="grad-dark" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={isWhite ? "#FFF" : "#333"} />
                    <stop offset="100%" stopColor={isWhite ? "#FFF" : "#111"} />
                </linearGradient>
            </defs>

            {/* --- TOP ICON GRAPHIC --- */}
            <g transform="translate(100, 10)">

                {/* Left side: 'F' element */}
                <g transform="translate(45, 60)">
                    {/* Top camera nub */}
                    <rect x="10" y="-12" width="20" height="8" rx="2" fill="url(#grad-dark)" />
                    <rect x="5" y="-4" width="30" height="4" fill="url(#grad-dark)" />
                    {/* The F letter shape */}
                    <path d="M0,0 H40 V15 H15 V35 H35 V50 H15 V85 H0 Z" fill="url(#grad-gold)" />
                </g>

                {/* Right side: 'M' element */}
                <g transform="translate(180, 60)">
                    {/* Top camera nub */}
                    <rect x="25" y="-12" width="25" height="8" rx="2" fill="url(#grad-dark)" />
                    <rect x="20" y="-4" width="35" height="4" fill="url(#grad-dark)" />
                    {/* The M letter shape */}
                    <path d="M0,0 L20,35 L40,0 H60 V85 H45 V35 L25,70 L5,35 V85 H-10 V0 Z" fill="url(#grad-gold)" />
                </g>

                {/* Center: The Hand ("OK" sign) */}
                <g transform="translate(110, 30)">
                    <path
                        d="M35,115 L45,65 C45,65 25,40 20,45 C15,50 35,75 35,75 
                           C35,75 10,25 5,30 C0,35 25,65 25,65 
                           C25,65 5,10 0,15 C-5,20 20,55 20,55 
                           C20,55 -5,35 -5,45 C-5,60 10,80 15,115 Z"
                        fill="url(#grad-red)"
                    />

                    {/* The "O" loop in the fingers making the camera body base */}
                    <path d="M45,115 C75,115 95,95 90,65 C85,35 60,35 55,50 C50,65 25,115 45,115 Z" fill="url(#grad-red)" />

                    {/* The central Camera Lens inside the OK gesture */}
                    <g transform="translate(68, 80)">
                        <circle cx="0" cy="0" r="18" fill="#222" stroke="url(#grad-gold)" strokeWidth="3" />
                        <circle cx="0" cy="0" r="14" fill="url(#grad-lens)" />
                        <circle cx="-4" cy="-4" r="5" fill="url(#grad-glare)" />
                        <circle cx="0" cy="0" r="6" fill="#0A0A0A" />
                        <circle cx="0" cy="0" r="2" fill="#3D82F6" opacity="0.8" />
                    </g>
                </g>
            </g>
        </svg>
    );
}
