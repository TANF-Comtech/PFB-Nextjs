import { useEffect, useState } from "react";

/**
 * useSmoothMount()
 * 
 * This hook lets us smoothly mount components
 * Rehydration can take time in a big app, so this helps improve UX 
 * You can use it in conjunction with components/global/spinner
 */

export default function useSmoothMount( isMounted, delay) {
  const [shouldRender, setShouldRender] = useState(false);
  
  useEffect(() => {
    let timeoutId
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delay);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delay, shouldRender]);
    
  return shouldRender;
}
