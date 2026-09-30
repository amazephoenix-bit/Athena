import { useEffect, useRef, useState } from 'react';

/**
 * CanvasScrollSequence
 *
 * Full-screen sticky HTML5 Canvas that stays pinned while the user scrolls.
 * Driven strictly by scroll progress through the parent container.
 *
 * Features:
 * - Preloads frames progressively (1 to 50)
 * - requestAnimationFrame persistent loop with smooth interpolation (lerp)
 * - DPI / Retina support
 * - Aspect ratio cover scaling with centering
 * - Never gets stuck on frame 1
 * - Respects prefers-reduced-motion
 * - Deep gold / dark luxury tone blending
 */
export default function CanvasScrollSequence({ containerRef, totalFrames = 50, framePrefix = '/frames/ezgif-frame-', frameSuffix = '.png' }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const animationFrameIdRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);

  // Progressive preloader
  useEffect(() => {
    let isCancelled = false;
    const images = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `${framePrefix}${paddedIndex}${frameSuffix}`;

      img.onload = () => {
        if (!isCancelled) {
          setLoadedCount((prev) => prev + 1);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, framePrefix, frameSuffix]);

  // Render a specific frame onto canvas with cover aspect-ratio
  const renderFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clampedIndex = Math.max(1, Math.min(totalFrames, Math.round(frameIndex)));
    const img = imagesRef.current[clampedIndex - 1];

    if (!img || !img.complete || img.naturalWidth === 0) {
      // Fallback to closest available loaded image if current frame is still loading
      const fallbackImg = imagesRef.current.find((im) => im && im.complete && im.naturalWidth > 0);
      if (!fallbackImg) return;
      drawCover(ctx, fallbackImg, canvas.width, canvas.height);
      return;
    }

    drawCover(ctx, img, canvas.width, canvas.height);
  };

  const drawCover = (ctx, img, cw, ch) => {
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);

    const nw = iw * ratio;
    const nh = ih * ratio;
    const dx = (cw - nw) / 2;
    const dy = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, 0, 0, iw, ih, dx, dy, nw, nh);

    // Apply seamless deep gold / dark luxury atmospheric gradient overlay
    // Darkens edges and creates soft luxury blending so there are no visible canvas borders
    const gradient = ctx.createRadialGradient(
      cw * 0.5,
      ch * 0.45,
      Math.min(cw, ch) * 0.2,
      cw * 0.5,
      ch * 0.5,
      Math.max(cw, ch) * 0.75
    );
    gradient.addColorStop(0, 'rgba(6, 4, 10, 0.05)');
    gradient.addColorStop(0.5, 'rgba(12, 9, 20, 0.35)');
    gradient.addColorStop(0.85, 'rgba(6, 4, 10, 0.85)');
    gradient.addColorStop(1, 'rgba(6, 4, 10, 0.98)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, cw, ch);

    // Golden bottom fade for smooth transition to sections below
    const bottomFade = ctx.createLinearGradient(0, ch * 0.65, 0, ch);
    bottomFade.addColorStop(0, 'rgba(6, 4, 10, 0)');
    bottomFade.addColorStop(0.5, 'rgba(6, 4, 10, 0.5)');
    bottomFade.addColorStop(1, 'rgba(6, 4, 10, 1)');
    ctx.fillStyle = bottomFade;
    ctx.fillRect(0, ch * 0.65, cw, ch * 0.35);
  };

  // Resize canvas according to device pixel ratio
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      renderFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll tracking and persistent requestAnimationFrame loop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      const container = containerRef?.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) return;

      // Calculate progress between 0 and 1
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      const target = 1 + progress * (totalFrames - 1);
      targetFrameRef.current = target;

      if (prefersReducedMotion) {
        currentFrameRef.current = target;
        renderFrame(target);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // Persistent animation loop with smooth lerp
    let lastRenderedFrame = -1;

    const updateLoop = () => {
      if (!prefersReducedMotion) {
        const diff = targetFrameRef.current - currentFrameRef.current;
        // Smooth interpolation factor (0.12 provides Apple-level fluidity)
        currentFrameRef.current += diff * 0.12;

        // Redraw whenever currentFrame moves noticeably
        if (Math.abs(currentFrameRef.current - lastRenderedFrame) > 0.05) {
          renderFrame(currentFrameRef.current);
          lastRenderedFrame = currentFrameRef.current;
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [containerRef, totalFrames]);

  // Initial draw once first frame loads
  useEffect(() => {
    if (loadedCount >= 1) {
      renderFrame(currentFrameRef.current);
    }
  }, [loadedCount]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{ filter: 'contrast(1.04) brightness(0.98)' }}
      />
    </div>
  );
}
