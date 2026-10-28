import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Closing } from "./components/Closing.tsx";
import { Cover } from "./components/Cover.tsx";
import { Folder } from "./components/Folder.tsx";
import { Folio } from "./components/Folio.tsx";
import { SealedFolder } from "./components/SealedFolder.tsx";
import { Notes } from "./components/Notes.tsx";
import { Pocket } from "./components/Pocket.tsx";
import { Sheet } from "./components/Sheet.tsx";
import { Spine } from "./components/Spine.tsx";
import { pageCopy, type PageCopy } from "./content/index.ts";
import {
  applyDocumentLanguage,
  type Language,
  writeStoredLanguage,
} from "./language.ts";
import { Education } from "./pages/Education.tsx";
import { Experience } from "./pages/Experience.tsx";
import { MernSheet } from "./pages/MernSheet.tsx";
import { MissingSheet } from "./pages/MissingSheet.tsx";
import { Skills } from "./pages/Skills.tsx";
import { TycoonSheet } from "./pages/TycoonSheet.tsx";
import { WorkIndex } from "./pages/WorkIndex.tsx";
import { useQuietMotion } from "./motion/quiet.ts";
import { consumeOpening, openingShouldPlay } from "./openingSeen.ts";
import { ReSetContext } from "./reSet.ts";
import { parseLocation, sheetHeadingId, swapLanguage, type RouteId } from "./routes.ts";
import { syncSheetTurn } from "./sheetTurn.ts";
import { useSheetTurn } from "./useSheetTurn.ts";

type CoverIntro = {
  redact: boolean;
  scratch: boolean;
  redactKey: number;
  showReplay: boolean;
  opened: boolean;
  onReplay: () => void;
  onRedactDone: () => void;
};

function sheetBody(
  routeId: RouteId,
  copy: PageCopy,
  language: Language,
  intro: CoverIntro,
): ReactNode {
  switch (routeId) {
    case "cover":
      return (
        <Cover
          copy={copy}
          language={language}
          redact={intro.redact}
          scratch={intro.scratch}
          redactKey={intro.redactKey}
          showReplay={intro.showReplay}
          opened={intro.opened}
          onReplay={intro.onReplay}
          onRedactDone={intro.onRedactDone}
        />
      );
    case "work":
      return <WorkIndex copy={copy} language={language} />;
    case "transjakarta":
      return (
        <Folio
          folio={copy.folio}
          figure={copy.figure}
          classification={copy.work.transjakarta.note}
        />
      );
    case "mern-website":
      return <MernSheet copy={copy} />;
    case "tycoon-game":
      return <TycoonSheet copy={copy} />;
    case "engineering":
      return <Notes notes={copy.notes} />;
    case "experience":
      return <Experience copy={copy} />;
    case "education":
      return <Education copy={copy} />;
    case "skills":
      return <Skills copy={copy} />;
    case "contact":
      return <Closing contact={copy.contact} />;
    case "missing":
      return <MissingSheet copy={copy} language={language} />;
  }
}

export function DossierApp() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const parsed = parseLocation(pathname, hash);
  const { language, routeId, redirectTo } = parsed;
  const [reSetTick, setReSetTick] = useState(0);
  const { exiting, direction, turned } = useSheetTurn(routeId, Boolean(redirectTo));
  const turning = exiting !== null;
  const languageRef = useRef(language);
  const shownRoute = useRef(routeId);

  useLayoutEffect(() => {
    writeStoredLanguage(language);
    applyDocumentLanguage(language);
    if (languageRef.current !== language) {
      languageRef.current = language;
      setReSetTick((tick) => tick + 1);
    }
  }, [language]);

  useLayoutEffect(() => {
    syncSheetTurn({ exiting, direction });
  }, [exiting, direction]);

  useEffect(() => {
    if (redirectTo || turning) return;
    if (shownRoute.current === routeId) return;
    shownRoute.current = routeId;
    const root = `#sheet-${routeId}`;
    const face = document.querySelector<HTMLElement>(`${root} .sheet__face`);
    const body = document.querySelector<HTMLElement>(`${root} .sheet__body`);
    face?.scrollTo({ top: 0, behavior: "instant" });
    body?.scrollTo({ top: 0, behavior: "instant" });
    const heading = document.getElementById(sheetHeadingId(routeId));
    heading?.focus({ preventScroll: true });
    if (!face || !heading) return;
    const faceBox = face.getBoundingClientRect();
    const headBox = heading.getBoundingClientRect();
    const margin = Number.parseFloat(getComputedStyle(heading).scrollMarginTop) || 0;
    if (headBox.top < faceBox.top + margin || headBox.bottom > faceBox.bottom) {
      face.scrollTop += headBox.top - faceBox.top - margin;
    }
  }, [routeId, turning, redirectTo]);

  function onSelectLanguage(next: Language) {
    if (next === language) return;
    writeStoredLanguage(next);
    applyDocumentLanguage(next);
    navigate(swapLanguage(pathname, next));
  }

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  const copy = pageCopy[language];

  return (
    <DossierChrome
      copy={copy}
      language={language}
      routeId={routeId}
      reSetTick={reSetTick}
      turned={turned}
      turning={turning}
      exiting={exiting}
      direction={direction}
      onSelectLanguage={onSelectLanguage}
    />
  );
}

function DossierChrome({
  copy,
  language,
  routeId,
  reSetTick,
  turned,
  turning,
  exiting,
  direction,
  onSelectLanguage,
}: {
  copy: PageCopy;
  language: Language;
  routeId: RouteId;
  reSetTick: number;
  turned: boolean;
  turning: boolean;
  exiting: RouteId | null;
  direction: 1 | -1;
  onSelectLanguage: (next: Language) => void;
}) {
  const quiet = useQuietMotion();
  const [replayCount, setReplayCount] = useState(0);
  const [overlay, setOverlay] = useState(() => openingShouldPlay(routeId));
  const [redact, setRedact] = useState(() => openingShouldPlay(routeId));
  const [scratch, setScratch] = useState(false);
  const replayFocus = useRef(false);
  const languageSeen = useRef(language);
  const onCover = routeId === "cover";

  useEffect(() => {
    document.title = copy.documentTitle;
  }, [copy.documentTitle]);

  useLayoutEffect(() => {
    if (routeId === "cover") return;
    consumeOpening();
    setOverlay(false);
    setRedact(false);
    setScratch(false);
  }, [routeId]);

  useLayoutEffect(() => {
    if (languageSeen.current === language) return;
    languageSeen.current = language;
    consumeOpening();
    setOverlay(false);
    setRedact(false);
    setScratch(false);
  }, [language]);

  function finishOverlay() {
    consumeOpening();
    setOverlay(false);
  }

  function skipIntro() {
    consumeOpening();
    setOverlay(false);
    setRedact(false);
    setScratch(false);
    document.getElementById(sheetHeadingId("cover"))?.focus({ preventScroll: true });
  }

  function replayOpening() {
    replayFocus.current = true;
    setReplayCount((count) => count + 1);
    setOverlay(true);
    setRedact(true);
    setScratch(false);
  }

  useLayoutEffect(() => {
    if (!replayFocus.current || !overlay || !onCover) return;
    replayFocus.current = false;
    document.querySelector<HTMLButtonElement>(".opening-skip")?.focus({ preventScroll: true });
  }, [overlay, onCover, replayCount]);

  const showReplay = !quiet && onCover && !overlay && !redact;
  const intro: CoverIntro = {
    redact: redact && onCover,
    scratch: scratch && onCover,
    redactKey: replayCount,
    showReplay,
    opened: onCover && (!overlay || scratch),
    onReplay: replayOpening,
    onRedactDone: () => setRedact(false),
  };

  const sheets: RouteId[] =
    exiting && exiting !== routeId ? [exiting, routeId] : [routeId];

  return (
    <ReSetContext.Provider value={reSetTick > 0}>
      {overlay && onCover ? (
        <SealedFolder
          key={replayCount}
          copy={copy}
          onDone={finishOverlay}
          onSkip={skipIntro}
          onReveal={() => setScratch(true)}
        />
      ) : null}
      <Folder
        turned={turned}
        turning={turning}
        reSetTick={reSetTick}
        spine={
          <Spine
            copy={copy}
            language={language}
            routeId={routeId}
            onSelectLanguage={onSelectLanguage}
          />
        }
      >
        {sheets.map((id) => (
          <Sheet
            key={id}
            routeId={id}
            active={id === routeId}
            exiting={id === exiting}
            turning={turning}
            direction={direction}
            language={language}
            copy={copy}
            head={
              id === "cover"
                ? { label: copy.dossier.label, docRef: copy.dossier.fileId }
                : undefined
            }
            after={id === "contact" ? <Pocket copy={copy} /> : undefined}
          >
            {sheetBody(id, copy, language, intro)}
          </Sheet>
        ))}
      </Folder>
    </ReSetContext.Provider>
  );
}

export default DossierApp;
