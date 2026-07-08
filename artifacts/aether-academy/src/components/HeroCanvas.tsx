import React, { useEffect, useRef } from 'react';
import heroIsland from '@assets/generated_images/hero-island-clean.jpg';

interface Star {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  trail: number;
}

interface Cloud {
  x: number;
  y: number;
  speed: number;
  width: number;
  height: number;
  opacity: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const cloudsRef = useRef<Cloud[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load background image (castle without girls)
    const img = new Image();
    img.src = heroIsland;
    imgRef.current = img;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Falling stars
      starsRef.current = Array.from({ length: 60 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 0.7, // stars fall from upper portion
        speed: 0.4 + Math.random() * 1.2,
        size: 0.5 + Math.random() * 1.5,
        opacity: 0.4 + Math.random() * 0.6,
        trail: 4 + Math.random() * 10,
      }));

      // Moving clouds
      cloudsRef.current = Array.from({ length: 8 }, (_, i) => ({
        x: Math.random() * w * 1.5 - w * 0.25,
        y: 20 + Math.random() * (h * 0.55),
        speed: 0.12 + Math.random() * 0.2,
        width: 100 + Math.random() * 220,
        height: 28 + Math.random() * 40,
        opacity: 0.06 + Math.random() * 0.12,
      }));
    };

    const drawCloud = (ctx: CanvasRenderingContext2D, c: Cloud) => {
      ctx.save();
      ctx.globalAlpha = c.opacity;
      // Soft glowing cloud blob
      const grad = ctx.createRadialGradient(c.x + c.width / 2, c.y + c.height / 2, 0, c.x + c.width / 2, c.y + c.height / 2, c.width / 1.5);
      grad.addColorStop(0, 'rgba(180, 140, 255, 0.9)');
      grad.addColorStop(0.5, 'rgba(100, 80, 200, 0.4)');
      grad.addColorStop(1, 'rgba(60, 40, 120, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      // Draw cloud shape using bezier curves
      ctx.ellipse(c.x + c.width * 0.5, c.y + c.height * 0.5, c.width * 0.5, c.height * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Second smaller puff
      ctx.globalAlpha = c.opacity * 0.6;
      ctx.beginPath();
      ctx.ellipse(c.x + c.width * 0.3, c.y + c.height * 0.3, c.width * 0.3, c.height * 0.4, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawStar = (ctx: CanvasRenderingContext2D, s: Star) => {
      ctx.save();
      ctx.globalAlpha = s.opacity;
      // Draw trailing line
      const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.trail);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(1, `rgba(255,220,255,${s.opacity})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.size;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y - s.trail);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
      // Draw star dot
      ctx.fillStyle = `rgba(255,235,255,${s.opacity})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    let frameCount = 0;
    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      frameCount++;

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw background image
      if (img.complete) {
        ctx.drawImage(img, 0, 0, w, h);
        // Dark overlay at bottom for depth
        const bottomGrad = ctx.createLinearGradient(0, h * 0.5, 0, h);
        bottomGrad.addColorStop(0, 'rgba(8,8,26,0)');
        bottomGrad.addColorStop(1, 'rgba(8,8,26,0.85)');
        ctx.fillStyle = bottomGrad;
        ctx.fillRect(0, 0, w, h);
      } else {
        // Fallback dark background
        const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
        bgGrad.addColorStop(0, '#0D0B2B');
        bgGrad.addColorStop(1, '#08081A');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);
      }

      // Draw and update clouds
      for (const c of cloudsRef.current) {
        drawCloud(ctx, c);
        c.x += c.speed;
        if (c.x > w + c.width) {
          c.x = -c.width * 1.2;
          c.y = 20 + Math.random() * (h * 0.55);
        }
      }

      // Draw and update falling stars
      for (const s of starsRef.current) {
        drawStar(ctx, s);
        s.y += s.speed;
        // Twinkle
        if (frameCount % 30 === 0) s.opacity = 0.4 + Math.random() * 0.6;
        if (s.y > h * 0.8) {
          s.y = -s.trail;
          s.x = Math.random() * w;
          s.opacity = 0.4 + Math.random() * 0.6;
        }
      }

      // Subtle aurora shimmer at top
      const auroraGrad = ctx.createLinearGradient(0, 0, w, 0);
      const t = (Math.sin(frameCount * 0.008) + 1) / 2;
      auroraGrad.addColorStop(0, `rgba(182,77,255,${0.03 + t * 0.04})`);
      auroraGrad.addColorStop(0.4, `rgba(255,106,203,${0.02 + t * 0.03})`);
      auroraGrad.addColorStop(0.7, `rgba(76,201,255,${0.03 + t * 0.04})`);
      auroraGrad.addColorStop(1, `rgba(74,232,255,${0.02})`);
      ctx.fillStyle = auroraGrad;
      ctx.fillRect(0, 0, w, h * 0.5);
    };

    // Guard so only one RAF loop ever runs at a time
    let running = true;
    const safeAnimate = () => {
      if (!running) return;
      animRef.current = requestAnimationFrame(safeAnimate);
      animate();
    };

    // Start exactly once after initial resize; img.onload triggers re-init via resize
    resize();
    safeAnimate();

    img.onload = () => { resize(); }; // resize re-inits particles; loop already running

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
