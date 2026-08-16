import React, { useEffect, useRef } from 'react';

export default function StardustCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particles creation
    const particleCount = Math.min(Math.floor((width * height) / 9000), 120);
    const particles = [];

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    for (let i = 0; i < particleCount; i++) {
      const isOrange = Math.random() < 0.35; // 35% cosmic orange stardust
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.5,
        baseAlpha: Math.random() * 0.6 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.1,
        color: isOrange
          ? `rgba(255, ${Math.floor(100 + Math.random() * 60)}, 0, `
          : `rgba(220, 225, 255, `,
        pulseSpeed: Math.random() * 0.02 + 0.005
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint mouse background glow spotlight
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          250
        );
        gradient.addColorStop(0, 'rgba(255, 107, 0, 0.12)');
        gradient.addColorStop(0.5, 'rgba(255, 69, 0, 0.04)');
        gradient.addColorStop(1, 'rgba(7, 8, 14, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Distance to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let extraGlow = 0;
        if (dist < mouse.radius) {
          extraGlow = (1 - dist / mouse.radius) * 0.6;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + (extraGlow * 1.5), 0, Math.PI * 2);
        const currentAlpha = Math.min(1, p.baseAlpha + extraGlow);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.shadowBlur = extraGlow > 0 ? 12 : 4;
        ctx.shadowColor = 'rgba(255, 107, 0, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
