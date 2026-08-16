import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const frameCount = 120;

const preloadImages = async () => {
  const images = [];

  for (let i = 1; i <= frameCount; i++) {
    const index = i.toString().padStart(3, '0');

    const img = new Image();

    img.src = `${import.meta.env.BASE_URL}frames/frame_${index}.jpg`;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    images.push(img);
    console.log(`Loaded ${i}/${frameCount}`);
  }

  return images;
};

export default function ScrollFrames() {
  const canvasRef = useRef(null);

  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll();

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, frameCount - 1]
  );

  const drawFrame = (index) => {
    if (!canvasRef.current || !images.length || !isLoaded) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = images[index];

    if (!image || !image.complete || image.naturalWidth === 0) return;

    const hRatio = canvas.width / image.width;
    const vRatio = canvas.height / image.height;

    const ratio = Math.max(hRatio, vRatio) * 1.05;

    const centerShift_x =
      (canvas.width - image.width * ratio) / 2;

    const centerShift_y =
      (canvas.height - image.height * ratio) / 2;

    context.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    context.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      centerShift_x,
      centerShift_y,
      image.width * ratio,
      image.height * ratio
    );
  };

  // Preload all frames
  useEffect(() => {
    let cancelled = false;

    const loadImages = async () => {
      try {
        const loadedImages = await preloadImages();

        if (cancelled) return;

        setImages(loadedImages);
        setIsLoaded(true);

        console.log('ALL FRAMES LOADED');
      } catch (error) {
        console.error('Failed to load frames:', error);
      }
    };

    loadImages();

    return () => {
      cancelled = true;
    };
  }, []);

  // Update frame according to scroll
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    drawFrame(Math.round(latest));
  });

  // Canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;

      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;

      if (isLoaded) {
        drawFrame(Math.round(frameIndex.get()));
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, images]);

  // Initial frame
  useEffect(() => {
    if (isLoaded && images.length === frameCount) {
      drawFrame(Math.round(frameIndex.get()));
    }
  }, [isLoaded, images]);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden flex items-center justify-center z-[-2] pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />

      <div className="absolute inset-0 bg-[#07080e]/60" />
    </div>
  );
}