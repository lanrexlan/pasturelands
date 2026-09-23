import { at, Box, Cylinder, LeftRect, project, RightRect, TopRect } from "./iso";

/*
 * Small isometric objects for the "How it works" steps and the verification
 * section. Decorative: each svg is aria-hidden and the text beside it
 * carries the meaning.
 */

const g9 = "#16302A";
const g7 = "#2F5D4E";
const gold = "#E3B04B";
const terra = "#A7481F";

type ArtProps = { className?: string };

/** Step 1: a phone lying flat with a conversation on screen. */
export function PhoneArt({ className }: ArtProps) {
  return (
    <svg viewBox="-120 -60 230 190" className={className} aria-hidden="true">
      <g className="iso-in" style={at(0)}>
        <Box x={0} y={0} w={74} d={124} h={10} m="dark" />
        <TopRect x={6} y={10} z={10} w={62} d={100} fill="#FAF7F1" />
      </g>
      <g className="iso-in" style={at(1, 120, 200)}>
        <TopRect x={12} y={18} z={10.2} w={38} d={18} fill={gold} />
      </g>
      <g className="iso-in" style={at(2, 120, 200)}>
        <TopRect x={26} y={44} z={10.2} w={36} d={16} fill={g7} />
      </g>
      <g className="iso-in" style={at(3, 120, 200)}>
        <TopRect x={12} y={68} z={10.2} w={44} d={18} fill={gold} />
        <TopRect x={26} y={94} z={10.2} w={30} d={10} fill={terra} />
      </g>
      {/* A small house hovering over the phone: "tell us about your home" */}
      <g className="bob" style={{ ["--d" as string]: "600ms" }}>
        <g className="iso-in" style={at(5, 120, 200)}>
          <Box x={30} y={30} z={52} w={30} d={30} h={22} m="wall">
            <LeftRect at={60} x={38} z={52} w={10} h={14} fill={g7} />
            <RightRect at={60} y={38} z={60} d={12} h={8} fill={gold} />
          </Box>
          <Box x={26} y={26} z={74} w={38} d={38} h={5} m="terracotta" />
        </g>
      </g>
    </svg>
  );
}

/** Step 2: a stack of title documents with a seal and a stamp. */
export function DeedArt({ className }: ArtProps) {
  return (
    <svg viewBox="-125 -70 240 200" className={className} aria-hidden="true">
      <g className="iso-in" style={at(0)}>
        <Box x={4} y={6} w={84} d={112} h={4} m="paper" />
      </g>
      <g className="iso-in" style={at(1)}>
        <Box x={0} y={0} z={5} w={84} d={112} h={4} m="paper" />
      </g>
      <g className="iso-in" style={at(2)}>
        <Box x={6} y={-4} z={10} w={84} d={112} h={4} m="paper" />
        {[10, 22, 34, 46, 58].map((y, i) => (
          <TopRect key={y} x={16} y={y} z={14.1} w={i === 0 ? 40 : 60} d={4} fill={i === 0 ? g9 : "#C7D3CB"} />
        ))}
        <Cylinder cx={66} cy={88} z={14} r={13} h={3} m="gold" />
      </g>
      <g className="bob" style={{ ["--d" as string]: "900ms" }}>
        <g className="iso-in" style={at(4, 120, 150)}>
          <Box x={18} y={62} z={46} w={30} d={30} h={12} m="terracotta" />
          <Cylinder cx={33} cy={77} z={58} r={6} h={20} m="dark" />
          <Cylinder cx={33} cy={77} z={78} r={11} h={8} m="dark" />
        </g>
      </g>
    </svg>
  );
}

/** Step 3: an offer letter rising out of its envelope. */
export function OfferArt({ className }: ArtProps) {
  const flap = [
    project(0, 0, 8),
    project(110, 0, 8),
    project(55, 38, 8),
  ]
    .map((p) => p.join(","))
    .join(" ");
  return (
    <svg viewBox="-80 -80 230 200" className={className} aria-hidden="true">
      <g className="iso-in" style={at(0)}>
        <Box x={0} y={0} w={110} d={70} h={8} m="paper" />
        <polygon points={flap} fill="#DDD3C1" />
      </g>
      <g className="iso-in" style={at(2, 120, 150)}>
        <Box x={18} y={30} z={8} w={74} d={3} h={66} m="wall">
          <LeftRect at={33} x={26} z={56} w={34} h={6} fill={g9} />
          <LeftRect at={33} x={26} z={46} w={50} h={3} fill="#C7D3CB" />
          <LeftRect at={33} x={26} z={40} w={44} h={3} fill="#C7D3CB" />
          <LeftRect at={33} x={26} z={20} w={50} h={12} fill={gold} />
        </Box>
      </g>
      <g className="iso-in" style={at(4, 120, 150)}>
        <Cylinder cx={100} cy={70} z={0} r={14} h={5} m="gold" />
        <Cylinder cx={100} cy={70} z={5} r={14} h={5} m="gold" />
      </g>
    </svg>
  );
}

/** Step 4: bundles of cash and coins. */
export function PaidArt({ className }: ArtProps) {
  const bundle = (x: number, y: number, z: number, i: number) => (
    <g key={`${x}-${y}-${z}`} className="iso-in" style={at(i, 110)}>
      <Box x={x} y={y} z={z} w={66} d={36} h={11} m="green">
        <TopRect x={x + 26} y={y} z={z + 11.1} w={12} d={36} fill={gold} />
        <LeftRect at={y + 36} x={x + 26} z={z} w={12} h={11} fill="#C8952F" />
      </Box>
    </g>
  );
  return (
    <svg viewBox="-80 -60 230 180" className={className} aria-hidden="true">
      {bundle(0, 0, 0, 0)}
      {bundle(0, 0, 11, 1)}
      {bundle(0, 0, 22, 2)}
      {bundle(0, 44, 0, 3)}
      {bundle(0, 44, 11, 4)}
      <g className="iso-in" style={at(6, 110)}>
        <Cylinder cx={96} cy={40} r={12} h={4} m="gold" />
        <Cylinder cx={96} cy={40} z={4} r={12} h={4} m="gold" />
        <Cylinder cx={96} cy={40} z={8} r={12} h={4} m="gold" />
        <Cylinder cx={96} cy={74} r={12} h={4} m="gold" />
      </g>
    </svg>
  );
}

/** A street of three kinds of home: flats, a duplex and a bungalow. */
export function Neighbourhood({ className }: ArtProps) {
  return (
    <svg viewBox="-135 -175 510 480" className={className} aria-hidden="true">
      <g className="iso-in" style={at(0)}>
        <Box x={0} y={0} z={-16} w={420} d={140} h={16} m="sand" />
        <TopRect x={0} y={118} z={0} w={420} d={22} fill="#DDD3C1" />
      </g>

      {/* Block of flats */}
      <g className="iso-in" style={at(1, 140)}>
        <Box x={20} y={20} w={90} d={90} h={170} m="wall">
          {[14, 54, 94, 134].map((z) =>
            [30, 62].map((x) => <LeftRect key={`${x}${z}`} at={110} x={x} z={z} w={20} h={24} fill={z === 94 && x === 62 ? gold : g9} />),
          )}
          {[14, 54, 94, 134].map((z) => (
            <RightRect key={z} at={110} y={34} z={z} d={60} h={24} fill={z === 54 ? gold : g9} />
          ))}
        </Box>
        <Box x={16} y={16} z={170} w={98} d={98} h={8} m="dark" />
      </g>

      {/* Duplex */}
      <g className="iso-in" style={at(2, 140)}>
        <Box x={150} y={30} w={100} d={80} h={56} m="wall">
          <LeftRect at={110} x={162} z={14} w={40} h={26} fill={g9} />
          <LeftRect at={110} x={218} z={0} w={20} h={40} fill={g7} />
          <RightRect at={250} y={44} z={14} d={40} h={26} fill={gold} />
        </Box>
        <Box x={144} y={26} z={56} w={112} d={90} h={7} m="green" />
        <Box x={160} y={36} z={63} w={90} d={74} h={48} m="wall">
          <LeftRect at={110} x={170} z={74} w={56} h={26} fill={g9} />
          <RightRect at={250} y={50} z={74} d={44} h={26} fill={g9} />
        </Box>
        <Box x={154} y={30} z={111} w={102} d={86} h={8} m="green" />
      </g>

      {/* Bungalow */}
      <g className="iso-in" style={at(3, 140)}>
        <Box x={290} y={40} w={110} d={70} h={48} m="terracotta">
          <LeftRect at={110} x={302} z={12} w={30} h={22} fill={g9} />
          <LeftRect at={110} x={346} z={0} w={20} h={36} fill="#FAF7F1" />
          <RightRect at={400} y={56} z={12} d={34} h={22} fill={gold} />
        </Box>
        <Box x={284} y={34} z={48} w={122} d={82} h={8} m="dark" />
      </g>
    </svg>
  );
}

/** A home under renovation: scaffolding, a ladder and paint. For the empty /homes state. */
export function RenovationArt({ className }: ArtProps) {
  const pole = (x: number, y: number, i: number) => (
    <Box key={`p${x}-${y}`} x={x} y={y} w={4} d={4} h={150} m="dark" className="iso-in" style={at(i, 60, 500)} />
  );
  return (
    <svg viewBox="-205 -125 460 405" className={className} aria-hidden="true">
      <g className="iso-in" style={at(0)}>
        <Box x={0} y={0} z={-18} w={280} d={220} h={18} m="sand" />
      </g>
      {/* The house, walls part-painted */}
      <g className="iso-in" style={at(1)}>
        <Box x={40} y={30} w={170} d={130} h={120} m="wall">
          <LeftRect at={160} x={40} z={0} w={80} h={120} fill="#DDD3C1" />
          <LeftRect at={160} x={58} z={70} w={44} h={32} fill={g9} />
          <LeftRect at={160} x={140} z={70} w={44} h={32} fill={g9} />
          <LeftRect at={160} x={150} z={0} w={28} h={50} fill={g7} />
          <RightRect at={210} y={50} z={70} d={60} h={32} fill={gold} />
          <RightRect at={210} y={50} z={16} d={60} h={32} fill={g9} />
        </Box>
        <Box x={32} y={22} z={120} w={186} d={146} h={10} m="green" />
      </g>
      {/* Scaffolding along the front */}
      {pole(40, 176, 0)}
      {pole(110, 176, 1)}
      {pole(180, 176, 2)}
      <g className="iso-in" style={at(3, 60, 500)}>
        <Box x={36} y={168} z={46} w={160} d={16} h={4} m="terracotta" />
        <Box x={36} y={168} z={98} w={160} d={16} h={4} m="terracotta" />
      </g>
      {/* Ladder leaning on the right wall */}
      <g className="iso-in" style={at(8, 90)}>
        <Box x={226} y={70} w={4} d={4} h={96} m="gold" />
        <Box x={226} y={104} w={4} d={4} h={96} m="gold" />
        {[16, 36, 56, 76].map((z) => (
          <Box key={z} x={226} y={70} z={z} w={4} d={38} h={3} m="gold" />
        ))}
      </g>
      {/* Paint tins */}
      <g className="iso-in" style={at(9, 90)}>
        <Cylinder cx={250} cy={190} r={12} h={18} m="terracotta" />
        <Cylinder cx={226} cy={204} r={10} h={14} m="paper" />
      </g>
    </svg>
  );
}
