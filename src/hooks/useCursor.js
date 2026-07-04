import { useEffect, useRef } from 'react';
 
const useCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
 
  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;
 
    const move = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      setTimeout(() => {
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
      }, 80);
    };
 
    const onHover = () => cursor.classList.add('hover');
    const onLeave = () => cursor.classList.remove('hover');
 
    document.addEventListener('mousemove', move);
    document.querySelectorAll('button, a, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onLeave);
    });
 
    return () => {
      document.removeEventListener('mousemove', move);
    };
  }, []);
 
  return { cursorRef, ringRef };
};
 
export default useCursor;