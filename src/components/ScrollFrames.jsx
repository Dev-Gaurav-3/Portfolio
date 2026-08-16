import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const frameCount = 120;
const CONCURRENCY = 12; // how many frames to fetch in parallel

function frameSrc(i) {
  const index = i.toString().padStart(3, '0');
  return `${import.meta.env.BASE_URL}frames/frame_${index}.jpg`;
}

// Load a single image, resolving with it (never rejecting, so one bad
// frame can't stall the whole batch).
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export default function ScrollFrames() {
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Array(frameCount).fill(null)); // mutable, avoids re-renders per frame
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const { scrollYProgress } = useScroll();
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = imagesRef.current[index];
    if (!image) return; // frame not loaded yet — keep last drawn frame on screen

    const context = canvas.getContext('2d');
    const hRatio = canvas.width / image.width;
    const vRatio = canvas.height / image.height;
    const ratio = Math.max(hRatio, vRatio) * 1.05;
    const centerShift_x = (canvas.width - image.width * ratio) / 2;
    const centerShift_y = (canvas.height - image.height * ratio) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      image,
      0, 0, image.width, image.height,
      centerShift_x, centerShift_y,
      image.width * ratio, image.height * ratio
    );
  }, []);

  // Load frame 0 first (blocking, for instant first paint), then stream
  // the rest in parallel batches, closest-to-current-scroll first.
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // 1. First frame ASAP so something renders immediately.
      const first = await loadImage(frameSrc(1));
      if (cancelled) return;
      imagesRef.current[0] = first;
      setFirstFrameReady(true);
      setLoadedCount(1);
      drawFrame(0);

      // 2. Remaining frames, in parallel batches (not one-by-one).
      const remaining = [];
      for (let i = 2; i <= frameCount; i++) remaining.push(i);

      let cursor = 0;
      const worker = async () => {
        while (cursor < remaining.length) {
          const i = remaining[cursor++];
          if (cancelled) return;
          const img = await loadImage(frameSrc(i));
          if (cancelled) return;
          imagesRef.current[i - 1] = img;
          setLoadedCount((c) => c + 1);
        }
      };

      const workers = Array.from({ length: CONCURRENCY }, worker);
      await Promise.all(workers);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [drawFrame]);

  // Redraw on scroll — draws whatever frame is currently loaded, and
  // simply holds the nearest already-loaded frame otherwise.
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (!firstFrameReady) return;
    let idx = Math.round(latest);
    if (!imagesRef.current[idx]) {
      // fall back to nearest loaded frame so the canvas doesn't blank out
      for (let d = 1; d < frameCount; d++) {
        if (imagesRef.current[idx - d]) { idx = idx - d; break; }
        if (imagesRef.current[idx + d]) { idx = idx + d; break; }
      }
    }
    drawFrame(idx);
  });

  // Canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      if (firstFrameReady) drawFrame(Math.round(frameIndex.get()));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [firstFrameReady, drawFrame, frameIndex]);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden flex items-center justify-center z-[-2] pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-[#07080e]/60" />
      {!firstFrameReady && (
        <div className="absolute inset-0 bg-[#07080e]" />
      )}
    </div>
  );
}