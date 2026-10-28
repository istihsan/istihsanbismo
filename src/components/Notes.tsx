import type { Layer, PageCopy } from "../content/index.ts";
import { sheetHeadingId } from "../routes.ts";
import { DecisionLedger } from "./DecisionLedger.tsx";
import { EntryList } from "./EntryList.tsx";
import { LayerDiagram } from "./LayerDiagram.tsx";
import { ReSetText } from "./ReSetText.tsx";
import { TableStates } from "./TableStates.tsx";

function LayerNote({ layer, index }: { layer: Layer; index: number }) {
  return (
    <div className="layer">
      <p className="layer__bar">
        <span className="layer__no" aria-hidden="true">
          L{index}
        </span>
        <ReSetText text={layer.name} className="layer__name" />
      </p>
      <ReSetText as="p" text={layer.note} className="layer__note" />
    </div>
  );
}

type NotesProps = {
  notes: PageCopy["notes"];
};

export function Notes({ notes }: NotesProps) {
  const { sections, principles, layers, decisions, decisionColumns } = notes;

  return (
    <div className="notes">
      <div className="notes__intro">
        <ReSetText
          as="h2"
          id={sheetHeadingId("engineering")}
          tabIndex={-1}
          text={notes.title}
          className="sheet-title"
        />
        <ReSetText as="p" text={notes.lead} className="prose prose--lead" />
      </div>

      <section className="notes__section">
        <ReSetText as="h3" text={sections.featureArchitecture} className="subhead" />
        <EntryList entries={[principles[0]]} titleAs="h4" />
        <LayerDiagram figure={notes.layerFigure} layers={layers} markedIndex={3} />
      </section>

      <section className="notes__section">
        <ReSetText as="h3" text={sections.serverState} className="subhead" />
        <EntryList entries={[principles[1]]} titleAs="h4" />
        <DecisionLedger columns={decisionColumns} decisions={[decisions[0]]} />
      </section>

      <section className="notes__section">
        <ReSetText as="h3" text={sections.dataHeavyAdmin} className="subhead" />
        <EntryList entries={[principles[2]]} titleAs="h4" />
        <DecisionLedger columns={decisionColumns} decisions={[decisions[2]]} />
        <TableStates figure={notes.statesFigure} states={notes.states} />
      </section>

      <section className="notes__section">
        <ReSetText as="h3" text={sections.forms} className="subhead" />
        <EntryList entries={[notes.formsNote]} titleAs="h4" />
        <LayerNote layer={layers[2]} index={3} />
      </section>

      <section className="notes__section">
        <ReSetText as="h3" text={sections.reusableUi} className="subhead" />
        <DecisionLedger columns={decisionColumns} decisions={[decisions[3]]} />
      </section>

      <section className="notes__section">
        <ReSetText as="h3" text={sections.roleAware} className="subhead" />
        <EntryList entries={[principles[3]]} titleAs="h4" />
        <DecisionLedger columns={decisionColumns} decisions={[decisions[1]]} />
      </section>

      <section className="notes__section">
        <ReSetText as="h3" text={sections.quality} className="subhead" />
        <EntryList entries={[notes.quality]} titleAs="h4" />
      </section>
    </div>
  );
}
