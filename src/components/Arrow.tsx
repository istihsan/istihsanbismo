type ArrowProps = {
  direction?: "left" | "right";
  className?: string;
};

export function Arrow({ direction = "right", className = "" }: ArrowProps) {
  return (
    <svg
      className={`arrow ${direction === "left" ? "arrow--left" : ""} ${className}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
    </svg>
  );
}
