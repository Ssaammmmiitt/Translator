// "use client";
// import { cn } from "@/lib/utils";
// import React, { useEffect, useRef, useState } from "react";
// import { createNoise3D } from "simplex-noise";

// export const WavyBackground = ({
//   children,
//   className,
//   containerClassName,
//   colors,
//   waveWidth,
//   backgroundFill,
//   blur = 10,
//   speed = "fast",
//   waveOpacity = 0.5,
//   ...props
// }: {
//   children?: any;
//   className?: string;
//   containerClassName?: string;
//   colors?: string[];
//   waveWidth?: number;
//   backgroundFill?: string;
//   blur?: number;
//   speed?: "slow" | "fast";
//   waveOpacity?: number;
//   [key: string]: any;
// }) => {
//   const noise = createNoise3D();
//   let w: number,
//     h: number,
//     nt: number,
//     i: number,
//     x: number,
//     ctx: any,
//     canvas: any;
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const getSpeed = () => {
//     switch (speed) {
//       case "slow":
//         return 0.001;
//       case "fast":
//         return 0.002;
//       default:
//         return 0.001;
//     }
//   };

//   const init = () => {
//     canvas = canvasRef.current;
//     ctx = canvas.getContext("2d");
//     w = ctx.canvas.width = window.innerWidth;
//     h = ctx.canvas.height = window.innerHeight;
//     ctx.filter = `blur(${blur}px)`;
//     nt = 0;
//     window.onresize = function () {
//       w = ctx.canvas.width = window.innerWidth;
//       h = ctx.canvas.height = window.innerHeight;
//       ctx.filter = `blur(${blur}px)`;
//     };
//     render();
//   };

//   const waveColors = colors ?? [
//     "#38bdf8",
//     "#818cf8",
//     "#c084fc",
//     "#e879f9",
//     "#22d3ee",
//   ];
//   const drawWave = (n: number) => {
//     nt += getSpeed();
//     for (i = 0; i < n; i++) {
//       ctx.beginPath();
//       ctx.lineWidth = waveWidth || 50;
//       ctx.strokeStyle = waveColors[i % waveColors.length];
//       for (x = 0; x < w; x += 5) {
//         var y = noise(x / 800, 0.3 * i, nt) * 100;
//         ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
//       }
//       ctx.stroke();
//       ctx.closePath();
//     }
//   };

//   let animationId: number;
//   const render = () => {
//     ctx.fillStyle = backgroundFill || "black";
//     ctx.globalAlpha = waveOpacity || 0.5;
//     ctx.fillRect(0, 0, w, h);
//     drawWave(5);
//     animationId = requestAnimationFrame(render);
//   };

//   useEffect(() => {
//     init();
//     return () => {
//       cancelAnimationFrame(animationId);
//     };
//   }, []);

//   const [isSafari, setIsSafari] = useState(false);
//   useEffect(() => {
//     // I'm sorry but i have got to support it on safari.
//     setIsSafari(
//       typeof window !== "undefined" &&
//         navigator.userAgent.includes("Safari") &&
//         !navigator.userAgent.includes("Chrome")
//     );
//   }, []);

//   return (
//     <div
//       className={cn(
//         "h-screen flex flex-col items-center justify-center",
//         containerClassName
//       )}
//     >
//       <canvas
//         className="absolute inset-0 z-0"
//         ref={canvasRef}
//         id="canvas"
//         style={{
//           ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
//         }}
//       ></canvas>
//       <div className={cn("relative z-10", className)} {...props}>
//         {children}
//       </div>
//     </div>
//   );
// };

"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number;
    let ctx: CanvasRenderingContext2D | null = null;
    let canvas: HTMLCanvasElement | null = null;
    
    const init = useCallback(() => {
      canvas = canvasRef.current;
      if (canvas) {
        ctx = canvas.getContext("2d") || null; // Handle undefined by defaulting to null
      }
      if (ctx) {
        w = ctx.canvas.width = window.innerWidth;
        h = ctx.canvas.height = window.innerHeight;
        ctx.filter = `blur(${blur}px)`;
        nt = 0;
        window.onresize = function () {
          w = ctx!.canvas.width = window.innerWidth;  // Non-null assertion here
          h = ctx!.canvas.height = window.innerHeight; // Non-null assertion here
          ctx!.filter = `blur(${blur}px)`;  // Non-null assertion here
        };
        render();
      }
    }, [blur]);
    

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };


  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  const drawWave = (n: number) => {
    if (!ctx) return; // Add a null check to ensure ctx is not null
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
      }
      ctx.stroke();
      ctx.closePath();
    }
  };
  
  const render = () => {
    if (!ctx) return; // Add a null check here as well
    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationIdRef.current = requestAnimationFrame(render);
  };
  
  useEffect(() => {
    init();
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [init]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
