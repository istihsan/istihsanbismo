import {
  createContext,
  createElement,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type PageMotionValue = {
  /** False while this sheet is leaving or already inactive. */
  live: boolean;
  /** Changes on language switch so in-flight content motion can stop. */
  epoch: string;
};

const PageMotionContext = createContext<PageMotionValue>({ live: true, epoch: "" });

export function PageMotionProvider({
  live,
  epoch,
  children,
}: PageMotionValue & { children: ReactNode }) {
  return createElement(PageMotionContext.Provider, { value: { live, epoch } }, children);
}

export function usePageMotion(): PageMotionValue {
  return useContext(PageMotionContext);
}

/** True after a language switch, so a reveal does not start again. */
export function useContentHeld(): boolean {
  const { epoch } = usePageMotion();
  const mountEpoch = useRef(epoch);
  const [held, setHeld] = useState(false);

  useLayoutEffect(() => {
    if (epoch !== mountEpoch.current) setHeld(true);
  }, [epoch]);

  return held;
}
