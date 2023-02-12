import React from 'react'
import debounce from "lodash/debounce";

export const useDebounce = (callback: VoidFunction, ms:number = 500) => {
  const ref = React.useRef<Function>();

  React.useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = React.useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, ms);
  }, []);

  return debouncedCallback;
};
