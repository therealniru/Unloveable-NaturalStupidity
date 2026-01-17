import { Warp } from "@paper-design/shaders-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WarpBackgroundProps {
    children: ReactNode;
    className?: string;
}

export default function WarpBackground({ children, className }: WarpBackgroundProps) {
    return (
        <main className={cn("relative min-h-screen overflow-hidden bg-[#1A2F2A]", className)}>
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <Warp
                    style={{ height: "100%", width: "100%" }}
                    proportion={0.45}
                    softness={1}
                    distortion={0.25}
                    swirl={0.8}
                    swirlIterations={10}
                    shape="checks"
                    shapeScale={0.1}
                    scale={1}
                    rotation={0}
                    speed={1}
                    // Dark Green Theme Colors
                    // Base: #325A50 (approx hsl(165, 29%, 27%))
                    // Darker: #1A2F2A (approx hsl(166, 29%, 14%))
                    // Lighter: #416C62 (approx hsl(166, 25%, 34%))
                    // Accent: #5a867c (approx hsl(166, 20%, 44%))
                    colors={[
                        "hsl(165, 30%, 20%)", // Deepest Green
                        "hsl(166, 25%, 35%)", // Mid Green
                        "hsl(165, 40%, 15%)", // Darker Shadow
                        "hsl(166, 20%, 45%)"  // Lighter Accent
                    ]}
                />
            </div>

            <div className="relative z-10 w-full">
                {children}
            </div>
        </main>
    );
}
