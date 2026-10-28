import { useLayoutEffect, useRef, type ReactNode } from "react";

type FolderProps = {
  spine: ReactNode;
  turned: boolean;
  turning: boolean;
  reSetTick: number;
  children: ReactNode;
};

/** The charcoal folder: viewport shell, attached spine, stacked sheets. */
export function Folder({ spine, turned, turning, reSetTick, children }: FolderProps) {
  const folderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = folderRef.current;
    if (!node) return;
    const spineNode = node.querySelector(".spine");
    if (!spineNode) return;
    if (turning) spineNode.setAttribute("inert", "");
    else spineNode.removeAttribute("inert");
  }, [turning]);

  useLayoutEffect(() => {
    const node = folderRef.current;
    if (!node || reSetTick === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    node.classList.remove("is-re-set");
    void node.offsetWidth;
    node.classList.add("is-re-set");
    const hold = Number.parseFloat(
      getComputedStyle(node).getPropertyValue("--duration-re-set"),
    );
    const done = window.setTimeout(() => {
      node.classList.remove("is-re-set");
    }, Number.isFinite(hold) ? hold : 560);
    return () => window.clearTimeout(done);
  }, [reSetTick]);

  return (
    <div className="desk font-sans font-normal antialiased">
      <div
        ref={folderRef}
        className="folder on-dark"
        data-turned={turned ? "" : undefined}
      >
        <aside className="spine">{spine}</aside>
        <main className="stage">
          <div className="sheet-stack" data-turning={turning ? "" : undefined}>
            {children}
            {turning ? (
              <span className="sheet-stack__guard" aria-hidden="true" />
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}
