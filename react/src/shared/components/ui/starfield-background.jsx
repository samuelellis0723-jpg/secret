import React, { useEffect, useRef } from 'react';

export function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Configuración del campo estelar
    const NUM_STARS = 280;
    const FOV = 340;
    const SPEED = 0.22; // Movimiento muy lento y elegante
    const MAX_DEPTH = 1200;

    const stars = Array.from({ length: NUM_STARS }, () => ({
      x: (Math.random() - 0.5) * width * 2.8,
      y: (Math.random() - 0.5) * height * 2.8,
      z: Math.random() * MAX_DEPTH + 1,
      baseSize: Math.random() * 2.4 + 1.2,
      opacity: Math.random() * 0.4 + 0.6,
      twinkleSpeed: Math.random() * 0.02 + 0.008,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    // Dibuja una estrella de 8 puntas celestial y elegante
    const draw8PointStar = (context, cx, cy, outerRadius, innerRadius, alpha) => {
      context.save();
      context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      context.shadowColor = 'rgba(255, 255, 255, 0.9)';
      context.shadowBlur = outerRadius > 3.5 ? 8 : 3;

      context.beginPath();
      const step = Math.PI / 8; // 16 vértices en total para 8 puntas
      for (let i = 0; i < 16; i++) {
        const angle = i * step - Math.PI / 2;
        let r;
        if (i % 2 === 0) {
          // Puntas exteriores: las 4 cardinales un poco más largas
          r = i % 4 === 0 ? outerRadius : outerRadius * 0.65;
        } else {
          // Vértices interiores
          r = innerRadius;
        }
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }
      context.closePath();
      context.fill();
      context.restore();
    };

    let time = 0;
    const render = () => {
      time += 1;

      // Fondo negro espacial profundo con micro-desvanecimiento
      ctx.fillStyle = '#070709';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Las estrellas se van acercando muy lento hacia la cámara
        star.z -= SPEED;

        // Si la estrella sobrepasa la pantalla o la cámara, se reubica al fondo
        if (star.z <= 1) {
          star.z = MAX_DEPTH;
          star.x = (Math.random() - 0.5) * width * 2.8;
          star.y = (Math.random() - 0.5) * height * 2.8;
        }

        // Proyección 3D en perspectiva
        const k = FOV / star.z;
        const screenX = cx + star.x * k;
        const screenY = cy + star.y * k;

        // Fuera de los límites visuales
        if (screenX < -40 || screenX > width + 40 || screenY < -40 || screenY > height + 40) {
          star.z = MAX_DEPTH;
          star.x = (Math.random() - 0.5) * width * 2.8;
          star.y = (Math.random() - 0.5) * height * 2.8;
          continue;
        }

        // Proporción de cercanía
        const depthRatio = 1 - star.z / MAX_DEPTH;
        const currentSize = star.baseSize * k * 1.5;
        const cappedOuter = Math.min(Math.max(currentSize, 1.2), 14);
        const inner = cappedOuter * 0.22;

        // Efecto de parpadeo suave
        const twinkle = 0.8 + 0.2 * Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const alpha = Math.min(Math.max(depthRatio * 1.25 * star.opacity * twinkle, 0.12), 1);

        if (cappedOuter < 2.4) {
          // Destello micro lejano
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.75})`;
          ctx.fillRect(screenX - 1, screenY - 1, 2, 2);
        } else {
          // Estrella completa de 8 puntas
          draw8PointStar(ctx, screenX, screenY, cappedOuter, inner, alpha);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ background: '#070709' }}
    />
  );
}

export default StarfieldBackground;
