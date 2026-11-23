import React, { useEffect, useRef } from 'react';

interface StarNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  color: string; // 'gold' | 'cyan' | 'white' | 'blue'
}

interface PulsePacket {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

export const NetworkStarsBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Color palettes for international AI network
    const colors = [
      { r: 56, g: 189, b: 248 }, // Neon Cyan
      { r: 245, g: 158, b: 11 },  // Gold
      { r: 255, g: 255, b: 255 }, // Pure White
      { r: 96, g: 165, b: 250 },  // Blue
      { r: 167, g: 139, b: 250 }, // Purple/Violet
    ];

    const starCount = Math.min(Math.floor((width * height) / 12000), 85);
    const stars: StarNode[] = [];
    const packets: PulsePacket[] = [];
    const shootingStars: ShootingStar[] = [];

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      const colorObj = colors[Math.floor(Math.random() * colors.length)];
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        baseAlpha: Math.random() * 0.5 + 0.35,
        alpha: Math.random() * 0.5 + 0.35,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        color: `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}`,
      });
    }

    // Spawn shooting star periodically
    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * (height * 0.4),
        length: Math.random() * 80 + 50,
        speed: Math.random() * 6 + 7,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 deg diagonal
        opacity: 1,
        active: true,
      });
    };

    let lastShootingStarTime = Date.now();

    // Mouse tracking for subtle network interaction
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Periodically trigger shooting star
      const now = Date.now();
      if (now - lastShootingStarTime > 4500 && Math.random() < 0.03) {
        spawnShootingStar();
        lastShootingStarTime = now;
      }

      // Update & Draw Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Move star
        s.x += s.vx;
        s.y += s.vy;

        // Wrap around borders
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Pulsing twinkle
        s.alpha += s.pulseSpeed;
        if (s.alpha > 0.95 || s.alpha < 0.25) {
          s.pulseSpeed = -s.pulseSpeed;
        }

        // Draw glowing star node
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}, ${Math.max(0.1, Math.min(1, s.alpha))})`;
        ctx.shadowBlur = s.radius * 4;
        ctx.shadowColor = `${s.color}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Draw Network Constellation Lines between nearby stars
      const connectionDist = 130;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const lineAlpha = (1 - dist / connectionDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();

            // Occasionally spawn a glowing data packet along this connection
            if (Math.random() < 0.0004 && packets.length < 8) {
              packets.push({
                fromIndex: i,
                toIndex: j,
                progress: 0,
                speed: 0.015 + Math.random() * 0.015,
                color: Math.random() > 0.5 ? 'rgba(245, 158, 11, 0.95)' : 'rgba(56, 189, 248, 0.95)',
              });
            }
          }
        }

        // Connect star to mouse if near
        const mdx = stars[i].x - mouseX;
        const mdy = stars[i].y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 160) {
          const mAlpha = (1 - mdist / 160) * 0.45;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(245, 158, 11, ${mAlpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }

      // Update & Draw Data Packets
      for (let p = packets.length - 1; p >= 0; p--) {
        const packet = packets[p];
        packet.progress += packet.speed;

        const from = stars[packet.fromIndex];
        const to = stars[packet.toIndex];

        if (!from || !to || packet.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const px = from.x + (to.x - from.x) * packet.progress;
        const py = from.y + (to.y - from.y) * packet.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = packet.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = packet.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Update & Draw Shooting Stars
      for (let k = shootingStars.length - 1; k >= 0; k--) {
        const ss = shootingStars[k];
        if (!ss.active) {
          shootingStars.splice(k, 1);
          continue;
        }

        const cos = Math.cos(ss.angle);
        const sin = Math.sin(ss.angle);

        const tailX = ss.x - cos * ss.length;
        const tailY = ss.y - sin * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        grad.addColorStop(0.6, `rgba(56, 189, 248, ${ss.opacity * 0.4})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ss.x += cos * ss.speed;
        ss.y += sin * ss.speed;
        ss.opacity -= 0.015;

        if (ss.opacity <= 0 || ss.x > width + 100 || ss.y > height + 100) {
          ss.active = false;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-[1] ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
export default NetworkStarsBackground;

