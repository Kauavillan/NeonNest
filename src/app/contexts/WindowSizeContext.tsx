"use client";
import {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";

interface WindowSizeContextProps {
  width: number;
  height: number;
}
export const windowSizeContext = createContext<WindowSizeContextProps>({
  width: 0,
  height: 0,
});

interface WindowSizeProviderProps {
  children: ReactNode;
}

const WindowSizeProvider = ({ children }: WindowSizeProviderProps) => {
  const [windowSize, setWindowSize] = useState<WindowSizeContextProps>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <windowSizeContext.Provider value={windowSize}>
      {children}
    </windowSizeContext.Provider>
  );
};

export default WindowSizeProvider;

export function useWindowSizeContext() {
  return useContext(windowSizeContext);
}
