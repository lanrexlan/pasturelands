import { at, Box, LeftRect, project, RightRect, TopRect } from "./iso";

/*
 * Isometric diorama of a modern Nigerian duplex in its compound: flat roof
 * slabs, window grids, a boys' quarters / garage wing, a fence with gates and
 * a palm, on a lawn plinth under a low sun. The pieces assemble in sequence
 * when `animate` is set (see .iso-* in globals.css).
 */

const g9 = "#16302A";
const g7 = "#2F5D4E";
const gold = "#E3B04B";
const sand = "#F3EDE2";

/** A window on a left (+y) face with glazing bars. */
function LeftWindow({ at: y, x, z, w, h, cols = 2, lit = false, delay }: {
  at: number; x: number; z: number; w: number; h: number; cols?: number; lit?: boolean; delay?: number;
}) {
  return (
    <g>
      <LeftRect at={y} x={x} z={z} w={w} h={h} fill={g9} />
      {lit && (
        <LeftRect at={y} x={x} z={z} w={w} h={h} fill={gold} className="iso-light" style={at(delay ?? 0, 1, 0)} />
      )}
      {Array.from({ length: cols - 1 }, (_, i) => (
        <LeftRect key={i} at={y} x={x + ((i + 1) * w) / cols - 1.5} z={z} w={3} h={h} fill={sand} />
      ))}
      <LeftRect at={y} x={x} z={z + h / 2 - 1.5} w={w} h={3} fill={sand} />
    </g>
  );
}

function RightWindow({ at: x, y, z, d, h, cols = 2, lit = false, delay }: {
  at: number; y: number; z: number; d: number; h: number; cols?: number; lit?: boolean; delay?: number;
}) {
  return (
    <g>
      <RightRect at={x} y={y} z={z} d={d} h={h} fill={g9} />
      {lit && (
        <RightRect at={x} y={y} z={z} d={d} h={h} fill={gold} className="iso-light" style={at(delay ?? 0, 1, 0)} />
      )}
      {Array.from({ length: cols - 1 }, (_, i) => (
        <RightRect key={i} at={x} y={y + ((i + 1) * d) / cols - 1.5} z={z} d={3} h={h} fill={sand} />
      ))}
    </g>
  );
}

function Palm({ x, y, height, animate }: { x: number; y: number; height: number; animate: boolean }) {
  const [bx, by] = project(x, y, 0);
  const tx = bx + 18;
  const ty = by - height;
  const leaf = "M0 0 Q -30 -30 -92 -14 Q -40 -14 0 0 Z";
  const angles = [-20, 18, 58, 104, 146, 186, 222];
  return (
    <g className={animate ? "iso-grow" : undefined} style={at(9, 110)}>
      <path d={`M${bx - 6},${by} Q${bx + 4},${by - height / 2} ${tx - 4},${ty} L${tx + 4},${ty} Q${bx + 12},${by - height / 2} ${bx + 6},${by} Z`} fill={g9} />
      <g transform={`translate(${tx} ${ty})`}>
        {angles.map((a, i) => (
          <path key={a} d={leaf} transform={`rotate(${a})`} fill={i % 2 ? g7 : g9} />
        ))}
        <circle r="7" fill={g9} />
      </g>
    </g>
  );
}

function Shrub({ x, y, r = 14 }: { x: number; y: number; r?: number }) {
  const [sx, sy] = project(x, y, 0);
  return (
    <g>
      <ellipse cx={sx} cy={sy - r * 0.7} rx={r} ry={r * 0.85} fill={g7} />
      <ellipse cx={sx - r * 0.3} cy={sy - r} rx={r * 0.45} ry={r * 0.35} fill="#3E7A66" />
    </g>
  );
}

export function IsoHouse({
  className,
  animate = true,
  title = "Illustration of a modern two-storey home in a walled compound with a palm tree, under a low sun",
}: {
  className?: string;
  animate?: boolean;
  title?: string;
}) {
  const a = animate ? "iso-in" : undefined;
  return (
    <svg
      viewBox="-290 -250 620 630"
      className={className}
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
    >
      {/* Sun */}
      <circle cx="150" cy="-150" r="70" fill={gold} className={animate ? "iso-sun" : undefined} />

      {/* Lawn plinth */}
      <Box x={0} y={0} z={-26} w={360} d={300} h={26} m="green" className={a} style={at(0)} />
      <g className={a} style={at(1)}>
        <TopRect x={172} y={206} z={0} w={48} d={84} fill={sand} />
        <TopRect x={262} y={138} z={0} w={98} d={66} fill={sand} />
        <TopRect x={40} y={40} z={0} w={250} d={20} fill="#3E7A66" />
      </g>

      {/* Ground floor */}
      <Box x={60} y={70} w={200} d={140} h={90} m="wall" className={a} style={at(2)}>
        <LeftWindow at={210} x={78} z={24} w={84} h={44} cols={3} lit delay={1500} />
        <LeftRect at={210} x={196} z={0} w={34} h={66} fill={g7} />
        <LeftRect at={210} x={222} z={30} w={3} h={8} fill={gold} />
        <RightWindow at={260} y={88} z={24} d={56} h={44} lit delay={1650} />
      </Box>

      {/* First-floor slab, then the cantilevered upper floor */}
      <Box x={50} y={58} z={90} w={234} d={192} h={12} m="green" className={a} style={at(3)} />
      <Box x={70} y={60} z={102} w={200} d={180} h={84} m="wall" className={a} style={at(4)}>
        <LeftWindow at={240} x={88} z={120} w={112} h={48} cols={4} lit delay={1800} />
        <LeftRect at={240} x={216} z={108} w={36} h={72} fill={g7} />
        <LeftRect at={240} x={216} z={142} w={36} h={3} fill={sand} />
        <RightWindow at={270} y={80} z={118} d={40} h={56} />
        <RightWindow at={270} y={140} z={118} d={64} h={48} cols={3} lit delay={1950} />
      </Box>
      <Box x={58} y={48} z={186} w={236} d={204} h={14} m="green" className={a} style={at(5)} />

      {/* Garage / boys' quarters wing */}
      <g className={a} style={at(6)}>
        <Box x={262} y={120} w={74} d={96} h={64} m="terracotta">
          {Array.from({ length: 5 }, (_, i) => (
            <RightRect key={i} at={336} y={136} z={4 + i * 9} d={62} h={6} fill={i % 2 ? "#6E2F14" : g9} />
          ))}
        </Box>
        <Box x={258} y={114} z={64} w={84} d={108} h={8} m="green" />
      </g>

      <Palm x={30} y={262} height={210} animate={animate} />
      <g className={a} style={at(8)}>
        <Shrub x={120} y={272} />
        <Shrub x={300} y={250} r={11} />
        <Shrub x={40} y={180} r={12} />
      </g>

      {/* Fence with pedestrian and car gates */}
      <g className={a} style={at(7)}>
        <Box x={350} y={0} w={10} d={130} h={30} m="sand" />
        <Box x={350} y={212} w={10} d={78} h={30} m="sand" />
        <Box x={0} y={290} w={170} d={10} h={30} m="sand" />
        <Box x={222} y={290} w={138} d={10} h={30} m="sand" />
        <Box x={162} y={286} w={12} d={16} h={42} m="terracotta" />
        <Box x={218} y={286} w={12} d={16} h={42} m="terracotta" />
        <Box x={346} y={126} w={16} d={12} h={42} m="terracotta" />
        <Box x={346} y={206} w={16} d={12} h={42} m="terracotta" />
      </g>
    </svg>
  );
}
