import { useState, useEffect } from 'react';
 
const useCountdown = (daysFromNow = 60) => {
  const [time, setTime] = useState({ d: '60', h: '00', m: '00', s: '00' });
 
  useEffect(() => {
    const end = new Date();
    end.setDate(end.getDate() + daysFromNow);
 
    const tick = () => {
      const diff = end - new Date();
      if (diff <= 0) {
        setTime({ d: '00', h: '00', m: '00', s: '00' });
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({
        d: String(d).padStart(2, '0'),
        h: String(h).padStart(2, '0'),
        m: String(m).padStart(2, '0'),
        s: String(s).padStart(2, '0'),
      });
    };
 
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [daysFromNow]);
 
  return time;
};
 
export default useCountdown;