/**
 * Flat, geometric illustration of a modern Nigerian two-storey home with a
 * flat roof slab, window grids, a palm and a low sun. Solid palette fills
 * only: no gradients, no outlines. Designed to sit on a terracotta panel.
 */

const C = {
  g9: "#16302A",
  g7: "#2F5D4E",
  sand: "#F3EDE2",
  paper: "#FAF7F1",
  terraDark: "#8E3E1B",
  gold: "#E3B04B",
  line: "#DDD3C1",
};

/** A window: dark pane with sand glazing bars, drawn as fills. */
function Window({
  x,
  y,
  w,
  h,
  cols,
  rows = 1,
  pane = C.g9,
  bar = C.sand,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  cols: number;
  rows?: number;
  pane?: string;
  bar?: string;
}) {
  const t = 4;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={pane} />
      {Array.from({ length: cols - 1 }, (_, i) => (
        <rect
          key={`c${i}`}
          x={x + ((i + 1) * w) / cols - t / 2}
          y={y}
          width={t}
          height={h}
          fill={bar}
        />
      ))}
      {Array.from({ length: rows - 1 }, (_, i) => (
        <rect
          key={`r${i}`}
          x={x}
          y={y + ((i + 1) * h) / rows - t / 2}
          width={w}
          height={t}
          fill={bar}
        />
      ))}
    </g>
  );
}

function Palm({ x, base, top }: { x: number; base: number; top: number }) {
  const leaf = "M0 0 Q -34 -26 -86 -8 Q -40 -12 0 0 Z";
  const angles = [-10, 28, 70, 118, 160, 196];
  return (
    <g>
      <polygon
        points={`${x - 7},${base} ${x + 7},${base} ${x + 14},${top} ${x + 6},${top}`}
        fill={C.g9}
      />
      <g transform={`translate(${x + 10} ${top})`}>
        {angles.map((a, i) => (
          <path
            key={a}
            d={leaf}
            transform={`rotate(${a})`}
            fill={i % 2 ? C.g7 : C.g9}
          />
        ))}
        <circle r="7" fill={C.g9} />
      </g>
    </g>
  );
}

export function HouseScene({
  className,
  title = "Illustration of a modern two-storey home beside a palm tree, under a low sun",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 560 560"
      className={className}
      role="img"
      aria-label={title}
      preserveAspectRatio="xMidYMax meet"
      overflow="visible"
    >
      {/* Sun */}
      <circle cx="404" cy="146" r="72" fill={C.gold} />

      {/* Neighbouring block, in shadow */}
      <rect x="392" y="272" width="168" height="228" fill={C.terraDark} />
      <rect x="380" y="258" width="180" height="16" fill={C.g9} />
      <Window x={470} y={304} w={62} h={58} cols={2} pane={C.g9} bar={C.terraDark} />
      <Window x={470} y={400} w={62} h={58} cols={2} pane={C.g9} bar={C.terraDark} />

      {/* Upper floor, cantilevered to the right */}
      <rect x="136" y="236" width="292" height="132" fill={C.sand} />
      <rect x="120" y="218" width="324" height="20" fill={C.g9} />
      <Window x={160} y={266} w={168} h={74} cols={4} rows={2} />
      <rect x={352} y={258} width={52} height={110} fill={C.g7} />
      <rect x={352} y={306} width={52} height={4} fill={C.sand} />

      {/* Ground floor */}
      <rect x="76" y="368" width="310" height="132" fill={C.paper} />
      <rect x="60" y="360" width="342" height="16" fill={C.g9} />
      <rect x="386" y="376" width="20" height="124" fill={C.line} />
      <Window x={100} y={404} w={150} h={68} cols={3} rows={2} />
      <rect x="288" y="400" width="56" height="100" fill={C.g7} />
      <rect x="330" y="446" width="6" height="14" fill={C.gold} />

      {/* Ground and boundary wall with an open gate */}
      {/* The ground and wall run past the viewBox so the scene can bleed to
          the edge of wider panels (the svg has overflow: visible). */}
      <rect x="0" y="500" width="2560" height="60" fill={C.g9} />
      <rect className="lg:hidden" x="-2000" y="500" width="2000" height="60" fill={C.g9} />
      <rect x="-2000" y="470" width="2270" height="34" fill={C.sand} className="lg:hidden" />
      <rect x="0" y="470" width="270" height="34" fill={C.sand} className="hidden lg:block" />
      <rect x="362" y="470" width="2198" height="34" fill={C.sand} />
      <rect x="-2000" y="466" width="2274" height="8" fill={C.line} className="lg:hidden" />
      <rect x="0" y="466" width="274" height="8" fill={C.line} className="hidden lg:block" />
      <rect x="358" y="466" width="2202" height="8" fill={C.line} />
      <rect x="262" y="450" width="16" height="54" fill={C.line} />
      <rect x="354" y="450" width="16" height="54" fill={C.line} />

      <Palm x={78} base={500} top={250} />
    </svg>
  );
}

/** Small house mark used in the logo. */
export function HouseMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="23" cy="9" r="6" fill={C.gold} />
      <rect x="5" y="12" width="20" height="16" fill={C.terraDark} />
      <rect x="3" y="10" width="24" height="3" fill={C.g9} />
      <rect x="8" y="16" width="6" height="5" fill={C.sand} />
      <rect x="17" y="18" width="5" height="10" fill={C.sand} />
    </svg>
  );
}
