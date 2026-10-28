type PaperclipProps = {
  className?: string;
};

/** Wire clip. Decorative: no hit target and not in tab order. */
export function Paperclip({ className = "" }: PaperclipProps) {
  return (
    <svg
      className={`paperclip ${className}`.trim()}
      viewBox="0 0 28 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M18.5 8.5c0-6.2-9.8-6.4-10.2.4C7.6 16 8 42 8 46.5c.2 7.2 12.2 7.4 12.4-.2.2-6.2-.2-22.4-.2-26.2 0-4.4-6.2-4.6-6.4-.2-.2 3.6-.2 16.2 0 20.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
