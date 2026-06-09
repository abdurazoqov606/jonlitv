import React, { useEffect, useRef } from "react";
import { audio } from "./AudioEngine";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  color: string;
}

interface Drop {
  x: number;
  y: number;
  length: number;
  speed: number;
  alpha: number;
  width: number;
}

export default function DropletCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const dropsRef = useRef<Drop[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle Resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize gentle background rain/droplets slides
    const initialDrops: Drop[] = [];
    for (let i = 0; i < 35; i++) {
      initialDrops.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        length: Math.random() * 12 + 6,
        speed: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.15 + 0.05,
        width: Math.random() * 1.5 + 0.5,
      });
    }
    dropsRef.current = initialDrops;

    // Pulse colors (soft pinks, soft sky blues, gentle purples)
    const rippleColors = [
      "rgba(139, 92, 246, 0.4)", // Purple
      "rgba(6, 182, 212, 0.4)",  // Cyan
      "rgba(236, 72, 153, 0.3)", // Pink
      "rgba(99, 102, 241, 0.4)", // Indigo
    ];

    // Animation Loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw and update slow-flowing vertical droplets
      dropsRef.current.forEach((drop) => {
        ctx.beginPath();
        // Soft drop brush
        const gradient = ctx.createLinearGradient(
          drop.x,
          drop.y,
          drop.x,
          drop.y + drop.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${drop.alpha})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = drop.width;
        ctx.lineCap = "round";
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        // Move drop
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
          drop.speed = Math.random() * 1.5 + 0.5;
        }
      });

      // 2. Draw and update interactive splash ripples
      const activeRipples = ripplesRef.current;
      for (let i = activeRipples.length - 1; i >= 0; i--) {
        const ripple = activeRipples[i];
        
        ctx.beginPath();
        ctx.strokeStyle = ripple.color.replace("0.4", `${ripple.alpha}`);
        ctx.lineWidth = 1.5 + (1 - ripple.alpha) * 3;
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary subtle inner ring
        if (ripple.radius > 15) {
          ctx.beginPath();
          ctx.strokeStyle = ripple.color.replace("0.4", `${ripple.alpha * 0.4}`);
          ctx.lineWidth = 1;
          ctx.arc(ripple.x, ripple.y, ripple.radius - 12, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Update ripple state
        ripple.radius += ripple.speed;
        ripple.alpha = 1 - ripple.radius / ripple.maxRadius;

        if (ripple.alpha <= 0 || ripple.radius >= ripple.maxRadius) {
          activeRipples.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Click handler to launch dynamic ripples from clicks
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Add gorgeous ripple
      const randomColor = rippleColors[Math.floor(Math.random() * rippleColors.length)];
      ripplesRef.current.push({
        x,
        y,
        radius: 2,
        maxRadius: Math.random() * 60 + 50,
        alpha: 1,
        speed: Math.random() * 1.2 + 0.8,
        color: randomColor,
      });

      // Trigger soft interaction acoustic pop
      audio.playBubblePop();
    };

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (canvas) {
        canvas.removeEventListener("click", handleCanvasClick);
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-10 opacity-70"
      id="droplet-interactive-canvas"
    />
  );
}
