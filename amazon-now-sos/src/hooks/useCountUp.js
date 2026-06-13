import { useEffect, useRef, useState } from "react";

export function useCountUp(target, duration = 1200) {
  const [val, setVal] = useState(0);
  const raf = useRef(null);
  const start = useRef(null);
  const from = useRef(0);

  useEffect(() => {
    from.current = 0;
    start.current = null;
    const tick = (t) => {
      if (start.current === null) start.current = t;
      const p = Math.min(1, (t - start.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from.current + (target - from.current) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return val;
}
