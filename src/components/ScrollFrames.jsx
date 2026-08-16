import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const frameCount = 120;

const INITIAL_BATCH = 10;
const BATCH_SIZE = 10;

export default function ScrollFrames() {
  const canvasRef = useRef(null);

  const [images, setImages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);

  const loadingRef = useRef(new Set());
  const imagesRef = useRef([]);

  const { scrollYProgress } = useScroll();

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, frameCount - 1]
  );

  /*
   * Load a single frame
   */
  const loadFrame = (index) => {
    if (index < 0 || index >= frameCount) return;

    // Already loaded or currently loading
    if (imagesRef.current[index] || loadingRef.current.has(index)) {
      return;
    }

    loadingRef.current.add(index);

    const img = new Image();

    const frameNumber = index + 1;
    const paddedIndex = frameNumber.toString().padStart(3, '0');

    img.src = `${import.meta.env.BASE_URL}frames/frame_${paddedIndex}.jpg`;

    img.onload = () => {
      imagesRef.current[index] = img;

      loadingRef.current.delete(index);

      setImages([...imagesRef.current]);
      setLoadedCount((count) => count + 1);

      console.log(
        `Loaded frame ${frameNumber}/${frameCount}`
      );

      // Frame 1 is ready → show the animation immediately
      if (index === 0) {
        setIsFirstFrameLoaded(true);
      }
    };

    img.onerror = () => {
      loadingRef.current.delete(index);

      console.error(
        `Failed to load frame ${frameNumber}`
      );
    };
  };

  /*
   * Load a batch of frames
   */
  const loadBatch = (startIndex, count = BATCH_SIZE) => {
    const endIndex = Math.min(
      startIndex + count,
      frameCount
    );

    for (let i = startIndex; i < endIndex; i++) {
      loadFrame(i);
    }
  };

  /*
   * Draw frame on canvas
   */
  const drawFrame = (index) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const image = imagesRef.current[index];

    if (!image || !image.complete || image.naturalWidth === 0) {
      return;
    }

    const context = canvas.getContext('2d');

    const hRatio = canvas.width / image.width;
    const vRatio = canvas.height / image.height;

    // 5% zoom to crop edges
    const ratio = Math.max(hRatio, vRatio) * 1.05;

    const centerShiftX =
      (canvas.width - image.width * ratio) / 2;

    const centerShiftY =
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
      centerShiftX,
      centerShiftY,
      image.width * ratio,
      image.height * ratio
    );
  };

  /*
   * Initial loading
   *
   * Frame 1 gets highest priority.
   * Then frames 2-10 are loaded.
   */
  useEffect(() => {
    loadFrame(0);

    loadBatch(1, INITIAL_BATCH - 1);
  }, []);

  /*
   * Load more frames as the user scrolls.
   */
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const currentFrame = Math.round(latest);

    /*
     * Load the current frame immediately.
     */
    loadFrame(currentFrame);

    /*
     * Preload a few frames ahead.
     */
    for (
      let i = currentFrame + 1;
      i <= currentFrame + 5;
      i++
    ) {
      loadFrame(i);
    }

    /*
     * Load the next batch when approaching
     * the end of the currently loaded range.
     */
    const nextBatchStart =
      Math.floor(currentFrame / BATCH_SIZE) * BATCH_SIZE;

    loadBatch(nextBatchStart, BATCH_SIZE);
  });

  /*
   * Draw the current frame whenever:
   *
   * - scroll changes
   * - a new image loads
   */
  useEffect(() => {
    const unsubscribe = frameIndex.on('change', (latest) => {
      drawFrame(Math.round(latest));
    });

    return unsubscribe;
  }, []);

  /*
   * Canvas resize
   */
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      drawFrame(Math.round(frameIndex.get()));
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /*
   * Draw frame 1 as soon as it loads.
   */
  useEffect(() => {
    if (isFirstFrameLoaded) {
      drawFrame(0);
    }
  }, [isFirstFrameLoaded]);

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