import { CONTACT, type PageCopy } from "../content/index.ts";
import { Arrow } from "./Arrow.tsx";
import { ReSetText } from "./ReSetText.tsx";

type PocketProps = {
  copy: PageCopy;
};

const CONTACT_LINKS = [
  { key: "email", href: `mailto:${CONTACT.email}`, display: CONTACT.email },
  {
    key: "linkedIn",
    href: CONTACT.linkedInUrl,
    display: CONTACT.linkedInDisplay,
  },
] as const;

/** The dark pocket on the last sheet, holding the contact rows. */
export function Pocket({ copy }: PocketProps) {
  const { contact } = copy;
  const labels = { email: contact.emailLabel, linkedIn: contact.linkedInLabel };

  return (
    <div className="pocket on-dark">
      <ReSetText as="p" text={contact.pocketLabel} className="label pocket__label" />
      <ul className="pocket__links">
        {CONTACT_LINKS.map((link) => (
          <li key={link.key}>
            <a href={link.href} className="pocket-link">
              <ReSetText text={labels[link.key]} className="pocket-link__label" />
              <span className="pocket-link__value">{link.display}</span>
              <Arrow className="pocket-link__mark" />
            </a>
          </li>
        ))}
      </ul>
      <p className="pocket__imprint" aria-hidden="true">
        {copy.name} · {copy.title}
      </p>
    </div>
  );
}
