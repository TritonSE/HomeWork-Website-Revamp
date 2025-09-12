"use client";
/**
 * Hook that allows components to keep track of current page width and height
 * PIA-Program-Manager
 */

import { useEffect, useState } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      setWindowSize(newSize);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowSize.width < 640;
  const isTablet = windowSize.width < 1024;

  return { windowSize, isMobile, isTablet };
}
