//* @type Atom
//* @context Brand Design
//* @utility Logo SwitchPay renderizado en SVG. Modo isotipo, lockup horizontal y lockup vertical.

interface BDLogoMarkProps {
  variant?: "mark" | "horizontal" | "vertical";
  /** Color del isotipo. Por defecto currentColor. */
  color?: string;
  /** Color del wordmark "SWITCH". Por defecto currentColor. */
  textColor?: string;
  /** Color del wordmark "PAY". Por defecto igual al color del isotipo. */
  accentColor?: string;
  size?: number;
  className?: string;
}

/* ==========================================
   Isotipo SVG
   3 paralelogramos con esquinas redondeadas y caras
   horizontales. Slant pronunciado (~28°) y desplazamiento
   horizontal escalonado para formar una "S" estilizada.
   Top y bottom alineados a la izquierda, middle shift right.
   ========================================== */
function Isotype({ size, color }: { size: number; color: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label="SwitchPay isotipo"
    >
      <g fill={color}>
        {/* Top band — alineada a la izquierda */}
        <rect
          x="0"
          y="0"
          width="50"
          height="26"
          rx="3"
          ry="3"
          transform="translate(17 4) skewX(-28.3)"
        />
        {/* Middle band — desplazada a la derecha */}
        <rect
          x="0"
          y="0"
          width="50"
          height="26"
          rx="3"
          ry="3"
          transform="translate(47 37) skewX(-28.3)"
        />
        {/* Bottom band — alineada como la top */}
        <rect
          x="0"
          y="0"
          width="50"
          height="26"
          rx="3"
          ry="3"
          transform="translate(17 70) skewX(-28.3)"
        />
      </g>
    </svg>
  );
}

/* ==========================================
   Wordmark — SWITCH PAY
   uppercase con tracking moderado, "PAY" en accent.
   Espacio amplio entre SWITCH y PAY (en/m space) replica
   el lockup oficial de la marca.
   ========================================== */
function Wordmark({
  fontSize,
  textColor,
  accentColor,
}: {
  fontSize: number;
  textColor: string;
  accentColor: string;
}) {
  return (
    <span
      className="font-extrabold leading-none whitespace-nowrap"
      style={{
        fontSize,
        color: textColor,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
        fontFamily: "'Plus Jakarta Sans', 'Poppins', system-ui, sans-serif",
      }}
    >
      {"Switch\u2002"}
      <span style={{ color: accentColor }}>Pay</span>
    </span>
  );
}

export default function BDLogoMark({
  variant = "mark",
  color = "currentColor",
  textColor = "currentColor",
  accentColor,
  size = 64,
  className = "",
}: BDLogoMarkProps) {
  const accent = accentColor ?? color;

  /* <Tag> Isotipo standalone */
  if (variant === "mark") {
    return (
      <span className={className}>
        <Isotype size={size} color={color} />
      </span>
    );
  }

  /* <Tag> Lockup horizontal */
  if (variant === "horizontal") {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <Isotype size={size} color={color} />
        <Wordmark fontSize={size * 0.62} textColor={textColor} accentColor={accent} />
      </div>
    );
  }

  /* <Tag> Lockup vertical */
  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <Isotype size={size} color={color} />
      <Wordmark fontSize={size * 0.36} textColor={textColor} accentColor={accent} />
    </div>
  );
}
