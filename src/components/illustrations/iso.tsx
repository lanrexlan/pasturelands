import type { CSSProperties, ReactNode } from "react";

/*
 * A tiny isometric drawing kit. World axes: x runs down-right, y runs
 * down-left, z runs up. Boxes show three faces: top, left (+y) and right (+x),
 * each a solid fill, so a scene reads as 3D without gradients or outlines.
 */

const COS = Math.cos(Math.PI / 6);

export function project(x: number, y: number, z: number): [number, number] {
  return [(x - y) * COS, (x + y) * 0.5 - z];
}

function pts(points: [number, number, number][]) {
  return points
    .map(([x, y, z]) => project(x, y, z).map((n) => n.toFixed(1)).join(","))
    .join(" ");
}

/** Three shades per material: top, left face, right face. */
export const materials = {
  wall: ["#FAF7F1", "#F3EDE2", "#DDD3C1"],
  sand: ["#F3EDE2", "#DDD3C1", "#C9BCA4"],
  green: ["#2F5D4E", "#16302A", "#0E211C"],
  dark: ["#16302A", "#0E211C", "#08140F"],
  terracotta: ["#C0582A", "#A7481F", "#8E3E1B"],
  gold: ["#F0C66C", "#E3B04B", "#C8952F"],
  paper: ["#FFFFFF", "#FAF7F1", "#E9E1D2"],
} as const;

export type Material = keyof typeof materials;

type BoxProps = {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  m: Material;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/** A solid box; children draw on top of it (e.g. windows on its faces). */
export function Box({ x, y, z = 0, w, d, h, m, className, style, children }: BoxProps) {
  const [top, left, right] = materials[m];
  const t = z + h;
  return (
    <g className={className} style={style}>
      <polygon
        fill={left}
        points={pts([
          [x, y + d, z],
          [x + w, y + d, z],
          [x + w, y + d, t],
          [x, y + d, t],
        ])}
      />
      <polygon
        fill={right}
        points={pts([
          [x + w, y, z],
          [x + w, y + d, z],
          [x + w, y + d, t],
          [x + w, y, t],
        ])}
      />
      <polygon
        fill={top}
        points={pts([
          [x, y, t],
          [x + w, y, t],
          [x + w, y + d, t],
          [x, y + d, t],
        ])}
      />
      {children}
    </g>
  );
}

/** A rectangle painted on the left (+y) face plane y = `at`. */
export function LeftRect({
  at,
  x,
  z,
  w,
  h,
  fill,
  className,
  style,
}: {
  at: number;
  x: number;
  z: number;
  w: number;
  h: number;
  fill: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <polygon
      className={className}
      style={style}
      fill={fill}
      points={pts([
        [x, at, z],
        [x + w, at, z],
        [x + w, at, z + h],
        [x, at, z + h],
      ])}
    />
  );
}

/** A rectangle painted on the right (+x) face plane x = `at`. */
export function RightRect({
  at,
  y,
  z,
  d,
  h,
  fill,
  className,
  style,
}: {
  at: number;
  y: number;
  z: number;
  d: number;
  h: number;
  fill: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <polygon
      className={className}
      style={style}
      fill={fill}
      points={pts([
        [at, y, z],
        [at, y + d, z],
        [at, y + d, z + h],
        [at, y, z + h],
      ])}
    />
  );
}

/** A rectangle lying flat at height z (paths, rugs, marks on a top face). */
export function TopRect({
  x,
  y,
  z,
  w,
  d,
  fill,
  className,
  style,
}: {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  fill: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <polygon
      className={className}
      style={style}
      fill={fill}
      points={pts([
        [x, y, z],
        [x + w, y, z],
        [x + w, y + d, z],
        [x, y + d, z],
      ])}
    />
  );
}

/** A flat disc lying at height z, as an ellipse in projection. */
export function TopDisc({ cx, cy, z, r, fill }: { cx: number; cy: number; z: number; r: number; fill: string }) {
  const [sx, sy] = project(cx, cy, z);
  return <ellipse cx={sx} cy={sy} rx={r * COS * Math.SQRT2} ry={(r * Math.SQRT2) / 2} fill={fill} />;
}

/** A short upright cylinder (a coin, a seal, a stamp). */
export function Cylinder({
  cx,
  cy,
  z = 0,
  r,
  h,
  m,
}: {
  cx: number;
  cy: number;
  z?: number;
  r: number;
  h: number;
  m: Material;
}) {
  const [top, side] = materials[m];
  const [sx, sy] = project(cx, cy, z);
  const rx = r * COS * Math.SQRT2;
  const ry = (r * Math.SQRT2) / 2;
  return (
    <g>
      <path d={`M${sx - rx},${sy} v${-h} h${2 * rx} v${h} a${rx},${ry} 0 0 1 ${-2 * rx},0 z`} fill={side} />
      <ellipse cx={sx} cy={sy - h} rx={rx} ry={ry} fill={top} />
    </g>
  );
}

/** Stagger helper for the build-in animation: `style={at(3)}`. */
export function at(i: number, step = 90, base = 0): CSSProperties {
  return { ["--d" as string]: `${base + i * step}ms` };
}
