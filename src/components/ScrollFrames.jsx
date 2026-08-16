import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const frameCount = 120;

// Preload images
const preloadImages = async () => {
  const images = [];

  for (let i = 1; i <= frameCount; i++) {
    const index = i.toString().padStart(3, '0');

    const img = new Image();

    img.src = `${import.meta.env.BASE_URL}/frames/frame_${index}.jpg`;

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

  // Track scroll of the entire page instead of a specific container
  const { scrollYProgress } = useScroll();

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  const drawFrame = (index) => {
    if (!canvasRef.current || !images.length || !isLoaded) return;
    
    const context = canvasRef.current.getContext('2d');
    const image = images[index];
    
    if (image && image.complete && image.naturalWidth > 0) {
      const canvas = canvasRef.current;
      const hRatio = canvas.width / image.width;
      const vRatio = canvas.height / image.height;
      
      // Multiply ratio by 1.05 (5% zoom) to crop out the edges and hide the bottom-right watermark
      const ratio = Math.max(hRatio, vRatio) * 1.05;
      
      const centerShift_x = (canvas.width - image.width * ratio) / 2;
      const centerShift_y = (canvas.height - image.height * ratio) / 2;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        image,
        0, 0, image.width, image.height,
        centerShift_x, centerShift_y, image.width * ratio, image.height * ratio
      );
    }
  };

  useEffect(() => {
    const loadedImages = preloadImages();
    let loadedCount = 0;
    
    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === frameCount) {
        setIsLoaded(true);
      }
    };

    loadedImages.forEach((img) => {
      if (img.complete) {
        handleLoad();
      } else {
        img.onload = handleLoad;
        img.onerror = handleLoad;
      }
    });

    setImages(loadedImages);
  }, []);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawFrame(Math.round(latest));
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Set actual pixel dimensions to match display size
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        
        // Redraw current frame
        if (isLoaded) {
          drawFrame(Math.round(frameIndex.get()));
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, images]);

  // Initial draw once loaded
  useEffect(() => {
    if (isLoaded) {
      drawFrame(Math.round(frameIndex.get()));
    }
  }, [isLoaded]);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden flex items-center justify-center z-[-2] pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      {/* Dark overlay to ensure text content remains readable over the background video */}
      <div className="absolute inset-0 bg-[#07080e]/60"></div>
    </div>
  );
}
