import React from 'react';

/**
 * Pure SVG Solid Geometry Visualizer for SolidQuest (Grade 8)
 * Adheres strictly to Singapore MOE Sec 2 conventions:
 * - Dimension text labels on every measurement (r, h, l, d)
 * - Vertical / perpendicular height is DASHED with a right-angle square mark
 * - Slant height is SOLID with arrowheads
 * - Hidden interior join faces are hatched
 * - High contrast, legible typography, responsive viewBox
 */

export function SolidVisual({ type = 'cone', data = {}, compact = false }) {
  // Use a generous viewBox so all apexes and base dimensions have ample margins
  const width = 460;
  const height = 240;
  const cx = width / 2;
  const cy = height / 2;

  const strokeCol = '#e2e8f0';
  const fillCol = '#38bdf820';
  const vHeightCol = '#facc15'; // Yellow dashed
  const slantCol = '#fb923c';   // Orange solid

  switch (type) {
    /* ------------------------------------------------ 1. CONE */
    case 'cone': {
      const r = data.r ?? 6;
      const h = data.h ?? 8;
      const l = data.l ?? Math.round(Math.sqrt(r * r + h * h));
      const showL = data.showL !== false;
      const showH = data.showH !== false;

      const apexY = 32;
      const baseY = 170;
      const rx = 90;
      const ry = 24;

      return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full select-none" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={slantCol} />
            </marker>
          </defs>

          {/* Cone Body Fill */}
          <path
            d={`M ${cx - rx} ${baseY} Q ${cx} ${baseY + ry * 2} ${cx + rx} ${baseY} L ${cx} ${apexY} Z`}
            fill={fillCol}
            stroke="none"
          />

          {/* Base Ellipse (Back half dashed) */}
          <path
            d={`M ${cx - rx} ${baseY} A ${rx} ${ry} 0 0 1 ${cx + rx} ${baseY}`}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.8"
            strokeDasharray="4 4"
          />
          {/* Base Ellipse (Front half solid) */}
          <path
            d={`M ${cx - rx} ${baseY} A ${rx} ${ry} 0 0 0 ${cx + rx} ${baseY}`}
            fill="none"
            stroke={strokeCol}
            strokeWidth="2.5"
          />

          {/* Cone Outer Edges */}
          <line x1={cx} y1={apexY} x2={cx - rx} y2={baseY} stroke={strokeCol} strokeWidth="2.5" strokeLinecap="round" />
          <line x1={cx} y1={apexY} x2={cx + rx} y2={baseY} stroke={strokeCol} strokeWidth="2.5" strokeLinecap="round" />

          {/* Apex Point */}
          <circle cx={cx} cy={apexY} r="4" fill="#38bdf8" />
          <circle cx={cx} cy={baseY} r="3" fill="#38bdf8" />

          {/* Vertical Height Line (Dashed from apex to center of base) */}
          {showH && (
            <>
              <line
                x1={cx}
                y1={apexY}
                x2={cx}
                y2={baseY}
                stroke={vHeightCol}
                strokeWidth="2.2"
                strokeDasharray="5 4"
              />
              {/* Right angle mark at center of base */}
              <path
                d={`M ${cx} ${baseY - 14} L ${cx + 14} ${baseY - 14} L ${cx + 14} ${baseY}`}
                fill="none"
                stroke={vHeightCol}
                strokeWidth="1.8"
              />
              {/* Vertical Height Label Badge */}
              <g>
                <rect x={cx - 68} y={apexY + (baseY - apexY) / 2 - 11} width="58" height="22" rx="6" fill="#0c041e" stroke={vHeightCol} strokeWidth="1.2" />
                <text x={cx - 39} y={apexY + (baseY - apexY) / 2 + 4} fill={vHeightCol} fontSize="12" fontWeight="900" textAnchor="middle">
                  h = {h} cm
                </text>
              </g>
            </>
          )}

          {/* Radius Line (from base center to right edge) */}
          <line x1={cx} y1={baseY} x2={cx + rx} y2={baseY} stroke="#38bdf8" strokeWidth="2.2" />
          <g>
            <rect x={cx + rx / 2 - 28} y={baseY + 8} width="56" height="20" rx="5" fill="#0c041e" stroke="#38bdf8" strokeWidth="1.2" />
            <text x={cx + rx / 2} y={baseY + 22} fill="#38bdf8" fontSize="11" fontWeight="900" textAnchor="middle">
              r = {r} cm
            </text>
          </g>

          {/* Slant Height Line (Highlighted along right sloping edge) */}
          {showL && (
            <>
              <line
                x1={cx + 6}
                y1={apexY + 12}
                x2={cx + rx + 4}
                y2={baseY}
                stroke={slantCol}
                strokeWidth="3"
                markerStart="url(#arrow)"
                markerEnd="url(#arrow)"
              />
              <g>
                <rect x={cx + rx / 2 + 10} y={apexY + (baseY - apexY) / 2 - 18} width="58" height="22" rx="6" fill="#0c041e" stroke={slantCol} strokeWidth="1.2" />
                <text x={cx + rx / 2 + 39} y={apexY + (baseY - apexY) / 2 - 3} fill={slantCol} fontSize="12" fontWeight="900" textAnchor="middle">
                  l = {l} cm
                </text>
              </g>
            </>
          )}
        </svg>
      );
    }

    /* ------------------------------------------------ 2. PYRAMID */
    case 'pyramid': {
      const baseType = data.base || 'square'; // 'square' | 'rect' | 'tri'
      const s = data.s ?? 10;
      const h = data.h ?? 12;
      const l = data.l ?? 13;
      const a = data.a ?? 10;
      const b = data.b ?? 18;

      const apexY = 32;
      const cyBase = 165;

      // Isometric base coordinates
      let pA, pB, pC, pD;
      if (baseType === 'rect') {
        pA = { x: cx - 110, y: cyBase - 15 }; // Back Left
        pB = { x: cx + 55,  y: cyBase - 25 }; // Back Right
        pC = { x: cx + 110, y: cyBase + 20 }; // Front Right
        pD = { x: cx - 55,  y: cyBase + 30 }; // Front Left
      } else {
        // Square base
        pA = { x: cx - 100, y: cyBase - 12 };
        pB = { x: cx + 60, y: cyBase - 22 };
        pC = { x: cx + 100, y: cyBase + 18 };
        pD = { x: cx - 60, y: cyBase + 28 };
      }

      const centerBase = {
        x: (pA.x + pB.x + pC.x + pD.x) / 4,
        y: (pA.y + pB.y + pC.y + pD.y) / 4
      };
      const midFrontEdge = {
        x: (pC.x + pD.x) / 2,
        y: (pC.y + pD.y) / 2
      };

      return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full select-none" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="pyr_arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={slantCol} />
            </marker>
          </defs>

          {/* Shaded Base */}
          <polygon
            points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y} ${pD.x},${pD.y}`}
            fill="#38bdf815"
            stroke="none"
          />

          {/* Hidden Base Edges (Dashed) */}
          <line x1={pA.x} y1={pA.y} x2={pB.x} y2={pB.y} stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="4 4" />
          <line x1={pB.x} y1={pB.y} x2={pC.x} y2={pC.y} stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="4 4" />

          {/* Visible Base Edges (Solid) */}
          <line x1={pA.x} y1={pA.y} x2={pD.x} y2={pD.y} stroke={strokeCol} strokeWidth="2.5" />
          <line x1={pD.x} y1={pD.y} x2={pC.x} y2={pC.y} stroke={strokeCol} strokeWidth="2.5" />

          {/* Hidden Slant Edge to Back Vertex (Dashed) */}
          <line x1={cx} y1={apexY} x2={pB.x} y2={pB.y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Visible Slant Edges from Apex to Front Vertices */}
          <line x1={cx} y1={apexY} x2={pA.x} y2={pA.y} stroke={strokeCol} strokeWidth="2.5" />
          <line x1={cx} y1={apexY} x2={pD.x} y2={pD.y} stroke={strokeCol} strokeWidth="2.5" />
          <line x1={cx} y1={apexY} x2={pC.x} y2={pC.y} stroke={strokeCol} strokeWidth="2.5" />

          {/* Vertical Height Line (Dashed) */}
          <line
            x1={cx}
            y1={apexY}
            x2={centerBase.x}
            y2={centerBase.y}
            stroke={vHeightCol}
            strokeWidth="2.2"
            strokeDasharray="5 4"
          />
          {/* Base midpoint right-angle line */}
          <line
            x1={centerBase.x}
            y1={centerBase.y}
            x2={midFrontEdge.x}
            y2={midFrontEdge.y}
            stroke="#94a3b8"
            strokeWidth="1.8"
            strokeDasharray="4 4"
          />

          {/* Slant Height Line along Front Face */}
          <line
            x1={cx}
            y1={apexY}
            x2={midFrontEdge.x}
            y2={midFrontEdge.y}
            stroke={slantCol}
            strokeWidth="2.5"
            markerEnd="url(#pyr_arrow)"
          />

          {/* Apex Dot */}
          <circle cx={cx} cy={apexY} r="4.5" fill="#38bdf8" />

          {/* Height Label Badge with Dark Background (Never Collides!) */}
          <g>
            <rect
              x={cx - 68}
              y={apexY + (centerBase.y - apexY) / 2 - 11}
              width="60"
              height="22"
              rx="6"
              fill="#0c041e"
              stroke={vHeightCol}
              strokeWidth="1.2"
            />
            <text
              x={cx - 38}
              y={apexY + (centerBase.y - apexY) / 2 + 4}
              fill={vHeightCol}
              fontSize="12"
              fontWeight="900"
              textAnchor="middle"
            >
              h = {h} cm
            </text>
          </g>

          {/* Slant Height Label Badge */}
          <g>
            <rect
              x={(cx + midFrontEdge.x) / 2 + 10}
              y={(apexY + midFrontEdge.y) / 2 - 11}
              width="58"
              height="22"
              rx="6"
              fill="#0c041e"
              stroke={slantCol}
              strokeWidth="1.2"
            />
            <text
              x={(cx + midFrontEdge.x) / 2 + 39}
              y={(apexY + midFrontEdge.y) / 2 + 4}
              fill={slantCol}
              fontSize="12"
              fontWeight="900"
              textAnchor="middle"
            >
              l = {l} cm
            </text>
          </g>

          {/* Base Dimension Label Badges (Spacious & Cleanly In-Bounds) */}
          {baseType === 'rect' ? (
            <>
              <g>
                <rect x={(pD.x + pC.x) / 2 - 32} y={pD.y + 10} width="64" height="20" rx="5" fill="#0c041e" stroke="#38bdf8" strokeWidth="1.2" />
                <text x={(pD.x + pC.x) / 2} y={pD.y + 24} fill="#38bdf8" fontSize="11" fontWeight="900" textAnchor="middle">
                  a = {a} cm
                </text>
              </g>
              <g>
                <rect x={pC.x + 8} y={pC.y - 10} width="58" height="20" rx="5" fill="#0c041e" stroke="#38bdf8" strokeWidth="1.2" />
                <text x={pC.x + 37} y={pC.y + 4} fill="#38bdf8" fontSize="11" fontWeight="900" textAnchor="middle">
                  b = {b} cm
                </text>
              </g>
            </>
          ) : (
            <g>
              <rect x={(pD.x + pC.x) / 2 - 60} y={pD.y + 8} width="120" height="22" rx="6" fill="#0c041e" stroke="#38bdf8" strokeWidth="1.2" />
              <text x={(pD.x + pC.x) / 2} y={pD.y + 23} fill="#38bdf8" fontSize="12" fontWeight="900" textAnchor="middle">
                base edge = {s} cm
              </text>
            </g>
          )}
        </svg>
      );
    }

    /* ------------------------------------------------ 3. SPHERE / HEMISPHERE */
    case 'sphere':
    case 'hemisphere': {
      const isHemi = type === 'hemisphere' || data.isHemi;
      const r = data.r ?? 6;
      const d = data.d ?? (r * 2);
      const showD = Boolean(data.d);

      const rad = compact ? 65 : 85;
      const sphereCy = isHemi ? cy + 20 : cy;

      return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full select-none">
          {/* Sphere/Dome Body Gradient */}
          <defs>
            <radialGradient id="sphereGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#1e1b4b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
            </radialGradient>
            <pattern id="hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#facc15" strokeWidth="1.5" opacity="0.6" />
            </pattern>
          </defs>

          {!isHemi ? (
            <>
              {/* Full Sphere Outer Circle */}
              <circle cx={cx} cy={sphereCy} r={rad} fill="url(#sphereGrad)" stroke={strokeCol} strokeWidth="2.5" />
              {/* Equator Ellipse (Back dashed, front solid) */}
              <path
                d={`M ${cx - rad} ${sphereCy} A ${rad} ${rad * 0.28} 0 0 1 ${cx + rad} ${sphereCy}`}
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.8"
                strokeDasharray="4 4"
              />
              <path
                d={`M ${cx - rad} ${sphereCy} A ${rad} ${rad * 0.28} 0 0 0 ${cx + rad} ${sphereCy}`}
                fill="none"
                stroke={strokeCol}
                strokeWidth="2.2"
              />
              {/* Center Dot */}
              <circle cx={cx} cy={sphereCy} r="3.5" fill="#facc15" />

              {/* Radius or Diameter Line */}
              {showD ? (
                <>
                  <line x1={cx - rad} y1={sphereCy} x2={cx + rad} y2={sphereCy} stroke="#facc15" strokeWidth="2.5" />
                  <g>
                    <rect x={cx - 75} y={sphereCy - 22} width="150" height="22" rx="6" fill="#0c041e" stroke="#facc15" strokeWidth="1.2" />
                    <text x={cx} y={sphereCy - 7} fill="#facc15" fontSize="12" fontWeight="900" textAnchor="middle">
                      d = {d} cm (r = {r} cm)
                    </text>
                  </g>
                </>
              ) : (
                <>
                  <line x1={cx} y1={sphereCy} x2={cx + rad} y2={sphereCy} stroke="#facc15" strokeWidth="2.5" />
                  <g>
                    <rect x={cx + rad / 2 - 28} y={sphereCy - 20} width="56" height="20" rx="5" fill="#0c041e" stroke="#facc15" strokeWidth="1.2" />
                    <text x={cx + rad / 2} y={sphereCy - 6} fill="#facc15" fontSize="12" fontWeight="900" textAnchor="middle">
                      r = {r} cm
                    </text>
                  </g>
                </>
              )}
            </>
          ) : (
            <>
              {/* Hemisphere Lower Dome */}
              <path
                d={`M ${cx - rad} ${sphereCy} A ${rad} ${rad} 0 0 0 ${cx + rad} ${sphereCy} Z`}
                fill="url(#sphereGrad)"
                stroke={strokeCol}
                strokeWidth="2.5"
              />
              {/* Flat Top Circular Face (Hatched / Shaded Lid) */}
              <ellipse
                cx={cx}
                cy={sphereCy}
                rx={rad}
                ry={rad * 0.3}
                fill="url(#hatch)"
                stroke="#facc15"
                strokeWidth="2.5"
              />
              {/* Center Dot */}
              <circle cx={cx} cy={sphereCy} r="3.5" fill="#facc15" />
              {/* Radius Line on Flat Lid */}
              <line x1={cx} y1={sphereCy} x2={cx + rad} y2={sphereCy} stroke="#facc15" strokeWidth="2.5" />
              <g>
                <rect x={cx + rad / 2 - 28} y={sphereCy - 22} width="56" height="20" rx="5" fill="#0c041e" stroke="#facc15" strokeWidth="1.2" />
                <text x={cx + rad / 2} y={sphereCy - 8} fill="#facc15" fontSize="12" fontWeight="900" textAnchor="middle">
                  r = {r} cm
                </text>
              </g>
              <g>
                <rect x={cx - 110} y={sphereCy + rad + 10} width="220" height="22" rx="6" fill="#0c041e" stroke="#94a3b8" strokeWidth="1" />
                <text x={cx} y={sphereCy + rad + 25} fill="#e2e8f0" fontSize="11" fontWeight="700" textAnchor="middle">
                  Flat base is a circle (Area = πr²)
                </text>
              </g>
            </>
          )}
        </svg>
      );
    }

    /* ------------------------------------------------ 4. COMPOSITE SOLIDS */
    case 'composite': {
      const kind = data.kind || 'cone-on-cyl';
      const r = data.r ?? 3;
      const hCyl = data.hCyl ?? 10;
      const hCone = data.hCone ?? 4;
      const lCone = data.lCone ?? 5;

      const rx = 85;
      const ry = 22;
      const cylTopY = 105;
      const cylBotY = 180;
      const apexY = 35;

      if (kind === 'hemi-on-cyl') {
        return (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full select-none" preserveAspectRatio="xMidYMid meet">
            {/* Cylinder Body */}
            <path
              d={`M ${cx - rx} ${cylTopY} L ${cx - rx} ${cylBotY} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cylBotY} L ${cx + rx} ${cylTopY} Z`}
              fill={fillCol}
              stroke="none"
            />
            {/* Cylinder Bottom Ellipse */}
            <path
              d={`M ${cx - rx} ${cylBotY} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cylBotY}`}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.8"
              strokeDasharray="4 4"
            />
            <path
              d={`M ${cx - rx} ${cylBotY} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cylBotY}`}
              fill="none"
              stroke={strokeCol}
              strokeWidth="2.5"
            />
            {/* Cylinder Walls */}
            <line x1={cx - rx} y1={cylTopY} x2={cx - rx} y2={cylBotY} stroke={strokeCol} strokeWidth="2.5" />
            <line x1={cx + rx} y1={cylTopY} x2={cx + rx} y2={cylBotY} stroke={strokeCol} strokeWidth="2.5" />

            {/* Hidden Interior Join Circle (Dashed Yellow) */}
            <ellipse
              cx={cx}
              cy={cylTopY}
              rx={rx}
              ry={ry}
              fill="none"
              stroke="#facc15"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Top Hemisphere Dome */}
            <path
              d={`M ${cx - rx} ${cylTopY} A ${rx} ${rx} 0 0 1 ${cx + rx} ${cylTopY}`}
              fill="#c084fc25"
              stroke="#c084fc"
              strokeWidth="2.5"
            />

            {/* Labels with Badges */}
            <g>
              <rect x={cx + rx + 8} y={(cylTopY + cylBotY) / 2 - 10} width="66" height="20" rx="5" fill="#0c041e" stroke="#38bdf8" strokeWidth="1.2" />
              <text x={cx + rx + 41} y={(cylTopY + cylBotY) / 2 + 4} fill="#38bdf8" fontSize="12" fontWeight="900" textAnchor="middle">
                h = {hCyl} cm
              </text>
            </g>
            <g>
              <rect x={cx - 28} y={cylBotY + 8} width="56" height="20" rx="5" fill="#0c041e" stroke="#facc15" strokeWidth="1.2" />
              <text x={cx} y={cylBotY + 22} fill="#facc15" fontSize="12" fontWeight="900" textAnchor="middle">
                r = {r} cm
              </text>
            </g>
            <g>
              <rect x={cx - 120} y={cylTopY - 12} width="240" height="22" rx="6" fill="#14062a" stroke="#facc15" strokeWidth="1.2" />
              <text x={cx} y={cylTopY + 3} fill="#fde047" fontSize="11" fontWeight="800" textAnchor="middle">
                Hidden Join (Do NOT count for surface area!)
              </text>
            </g>
          </svg>
        );
      }

      // Default: cone-on-cyl (Silo)
      return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full select-none" preserveAspectRatio="xMidYMid meet">
          {/* Cylinder Body */}
          <path
            d={`M ${cx - rx} ${cylTopY} L ${cx - rx} ${cylBotY} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cylBotY} L ${cx + rx} ${cylTopY} Z`}
            fill={fillCol}
            stroke="none"
          />
          {/* Cylinder Bottom Ellipse */}
          <path
            d={`M ${cx - rx} ${cylBotY} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cylBotY}`}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.8"
            strokeDasharray="4 4"
          />
          <path
            d={`M ${cx - rx} ${cylBotY} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cylBotY}`}
            fill="none"
            stroke={strokeCol}
            strokeWidth="2.5"
          />
          {/* Cylinder Walls */}
          <line x1={cx - rx} y1={cylTopY} x2={cx - rx} y2={cylBotY} stroke={strokeCol} strokeWidth="2.5" />
          <line x1={cx + rx} y1={cylTopY} x2={cx + rx} y2={cylBotY} stroke={strokeCol} strokeWidth="2.5" />

          {/* Cone Roof */}
          <path
            d={`M ${cx - rx} ${cylTopY} L ${cx} ${apexY} L ${cx + rx} ${cylTopY} Z`}
            fill="#fb923c20"
            stroke="none"
          />
          <line x1={cx} y1={apexY} x2={cx - rx} y2={cylTopY} stroke={strokeCol} strokeWidth="2.5" />
          <line x1={cx} y1={apexY} x2={cx + rx} y2={cylTopY} stroke={strokeCol} strokeWidth="2.5" />

          {/* Hidden Join Circle between Cone and Cylinder (Dashed) */}
          <ellipse
            cx={cx}
            cy={cylTopY}
            rx={rx}
            ry={ry}
            fill="none"
            stroke="#facc15"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Vertical Heights */}
          <line x1={cx} y1={apexY} x2={cx} y2={cylTopY} stroke={vHeightCol} strokeWidth="2" strokeDasharray="4 3" />
          <line x1={cx} y1={cylTopY} x2={cx} y2={cylBotY} stroke={vHeightCol} strokeWidth="2" strokeDasharray="4 3" />

          {/* Dimension Label Badges */}
          <g>
            <rect x={cx + 6} y={(apexY + cylTopY) / 2 - 10} width="72" height="20" rx="5" fill="#0c041e" stroke={vHeightCol} strokeWidth="1.2" />
            <text x={cx + 42} y={(apexY + cylTopY) / 2 + 4} fill={vHeightCol} fontSize="11" fontWeight="900" textAnchor="middle">
              cone h = {hCone}
            </text>
          </g>
          <g>
            <rect x={cx + rx + 8} y={(cylTopY + cylBotY) / 2 - 10} width="66" height="20" rx="5" fill="#0c041e" stroke="#38bdf8" strokeWidth="1.2" />
            <text x={cx + rx + 41} y={(cylTopY + cylBotY) / 2 + 4} fill="#38bdf8" fontSize="12" fontWeight="900" textAnchor="middle">
              cyl h = {hCyl}
            </text>
          </g>
          <g>
            <rect x={cx - 28} y={cylBotY + 8} width="56" height="20" rx="5" fill="#0c041e" stroke="#facc15" strokeWidth="1.2" />
            <text x={cx} y={cylBotY + 22} fill="#facc15" fontSize="12" fontWeight="900" textAnchor="middle">
              r = {r} cm
            </text>
          </g>
          <g>
            <rect x={cx - rx - 76} y={(apexY + cylTopY) / 2 - 10} width="70" height="20" rx="5" fill="#0c041e" stroke={slantCol} strokeWidth="1.2" />
            <text x={cx - rx - 41} y={(apexY + cylTopY) / 2 + 4} fill={slantCol} fontSize="11" fontWeight="900" textAnchor="middle">
              cone l = {lCone}
            </text>
          </g>
        </svg>
      );
    }

    /* ------------------------------------------------ 5. CONE VS CYLINDER (Wonder hook) */
    case 'cone-vs-cylinder': {
      const vWidth = 500;
      const vHeight = 240;
      const vcx = vWidth / 2;
      const coneX = 115;
      const cylX = 385;
      const rx = 52;
      const ry = 15;
      const apexY = 48;
      const baseY = 168;

      return (
        <svg viewBox={`0 0 ${vWidth} ${vHeight}`} className="w-full h-full select-none" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="pourArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#facc15" />
            </marker>
          </defs>

          {/* === 1. LEFT: WAFFLE CONE === */}
          <g>
            {/* Header pill */}
            <rect x={coneX - 65} y="10" width="130" height="24" rx="12" fill="#fb923c25" stroke="#fb923c" strokeWidth="1.5" />
            <text x={coneX} y="26" fill="#fb923c" fontSize="12" fontWeight="900" textAnchor="middle">
              🍦 Waffle Cone (1)
            </text>

            {/* Cone fill */}
            <path
              d={`M ${coneX - rx} ${baseY} Q ${coneX} ${baseY + ry * 2} ${coneX + rx} ${baseY} L ${coneX} ${apexY} Z`}
              fill="#fb923c20"
              stroke="none"
            />
            {/* Cone base ellipse (back dashed, front solid) */}
            <path
              d={`M ${coneX - rx} ${baseY} A ${rx} ${ry} 0 0 1 ${coneX + rx} ${baseY}`}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d={`M ${coneX - rx} ${baseY} A ${rx} ${ry} 0 0 0 ${coneX + rx} ${baseY}`}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="2.2"
            />

            {/* Slant edges */}
            <line x1={coneX} y1={apexY} x2={coneX - rx} y2={baseY} stroke="#f1f5f9" strokeWidth="2.2" strokeLinecap="round" />
            <line x1={coneX} y1={apexY} x2={coneX + rx} y2={baseY} stroke="#f1f5f9" strokeWidth="2.2" strokeLinecap="round" />

            {/* Apex dot & base center */}
            <circle cx={coneX} cy={apexY} r="3.5" fill="#fb923c" />
            <circle cx={coneX} cy={baseY} r="3" fill="#38bdf8" />

            {/* Vertical Height Line (Dashed with right angle) */}
            <line x1={coneX} y1={apexY} x2={coneX} y2={baseY} stroke="#facc15" strokeWidth="1.8" strokeDasharray="4 3" />
            <path
              d={`M ${coneX} ${baseY - 10} L ${coneX + 10} ${baseY - 10} L ${coneX + 10} ${baseY}`}
              fill="none"
              stroke="#facc15"
              strokeWidth="1.4"
            />
            <text x={coneX - 8} y={apexY + (baseY - apexY) / 2} fill="#facc15" fontSize="12" fontWeight="900" textAnchor="end">
              h
            </text>

            {/* Radius line on base */}
            <line x1={coneX} y1={baseY} x2={coneX + rx} y2={baseY} stroke="#38bdf8" strokeWidth="1.8" />
            <text x={coneX + rx / 2} y={baseY + 16} fill="#38bdf8" fontSize="11" fontWeight="900" textAnchor="middle">
              radius r
            </text>
          </g>

          {/* === 2. CENTER: POURING INTERACTION === */}
          <g>
            {/* Curved Pouring Stream Arrow */}
            <path
              d={`M ${coneX + rx + 10} ${apexY + 25} C ${vcx - 20} ${apexY - 10}, ${vcx + 20} ${apexY - 10}, ${cylX - rx - 10} ${apexY + 25}`}
              fill="none"
              stroke="#facc15"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              markerEnd="url(#pourArrow)"
            />

            {/* Central Question Badge Box */}
            <rect x={vcx - 68} y="78" width="136" height="42" rx="14" fill="#14072b" stroke="#facc15" strokeWidth="2" />
            <text x={vcx} y="96" fill="#facc15" fontSize="15" fontWeight="900" textAnchor="middle">
              ? × Pours
            </text>
            <text x={vcx} y="112" fill="#cbd5e1" fontSize="10" fontWeight="800" textAnchor="middle">
              to fill tumbler?
            </text>
          </g>

          {/* === 3. RIGHT: CYLINDER CUP === */}
          <g>
            {/* Header pill */}
            <rect x={cylX - 65} y="10" width="130" height="24" rx="12" fill="#38bdf825" stroke="#38bdf8" strokeWidth="1.5" />
            <text x={cylX} y="26" fill="#38bdf8" fontSize="12" fontWeight="900" textAnchor="middle">
              🥤 Cylinder Cup
            </text>

            {/* Cylinder body fill */}
            <path
              d={`M ${cylX - rx} ${apexY} L ${cylX - rx} ${baseY} A ${rx} ${ry} 0 0 0 ${cylX + rx} ${baseY} L ${cylX + rx} ${apexY} Z`}
              fill="#38bdf820"
              stroke="none"
            />

            {/* Top open rim */}
            <ellipse cx={cylX} cy={apexY} rx={rx} ry={ry} fill="#1e143c" stroke="#f1f5f9" strokeWidth="2.2" />

            {/* Cylinder walls */}
            <line x1={cylX - rx} y1={apexY} x2={cylX - rx} y2={baseY} stroke="#f1f5f9" strokeWidth="2.2" />
            <line x1={cylX + rx} y1={apexY} x2={cylX + rx} y2={baseY} stroke="#f1f5f9" strokeWidth="2.2" />

            {/* Bottom rim (back dashed, front solid) */}
            <path
              d={`M ${cylX - rx} ${baseY} A ${rx} ${ry} 0 0 1 ${cylX + rx} ${baseY}`}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d={`M ${cylX - rx} ${baseY} A ${rx} ${ry} 0 0 0 ${cylX + rx} ${baseY}`}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="2.2"
            />

            {/* Cylinder center axis & height */}
            <line x1={cylX} y1={apexY} x2={cylX} y2={baseY} stroke="#facc15" strokeWidth="1.8" strokeDasharray="4 3" />
            <circle cx={cylX} cy={apexY} r="3" fill="#38bdf8" />
            <circle cx={cylX} cy={baseY} r="3" fill="#38bdf8" />
            <text x={cylX + 8} y={apexY + (baseY - apexY) / 2} fill="#facc15" fontSize="12" fontWeight="900">
              h (same)
            </text>

            {/* Radius line on top opening */}
            <line x1={cylX} y1={apexY} x2={cylX + rx} y2={apexY} stroke="#38bdf8" strokeWidth="1.8" />
            <text x={cylX + rx / 2} y={baseY + 16} fill="#38bdf8" fontSize="11" fontWeight="900" textAnchor="middle">
              radius r (same)
            </text>

            {/* ⅓ and ⅔ capacity ticks */}
            <line x1={cylX - rx} y1={baseY - (baseY - apexY) / 3} x2={cylX - rx + 10} y2={baseY - (baseY - apexY) / 3} stroke="#facc15" strokeWidth="1.8" />
            <text x={cylX - rx - 5} y={baseY - (baseY - apexY) / 3 + 4} fill="#facc15" fontSize="9" fontWeight="900" textAnchor="end">⅓</text>

            <line x1={cylX - rx} y1={baseY - 2 * (baseY - apexY) / 3} x2={cylX - rx + 10} y2={baseY - 2 * (baseY - apexY) / 3} stroke="#facc15" strokeWidth="1.8" />
            <text x={cylX - rx - 5} y={baseY - 2 * (baseY - apexY) / 3 + 4} fill="#facc15" fontSize="9" fontWeight="900" textAnchor="end">⅔</text>
          </g>

          {/* === 4. BOTTOM KEY NOTE PILL (Centered, spacious, no overlap!) === */}
          <g>
            <rect x="75" y="204" width="350" height="26" rx="13" fill="#170a30" stroke="#c084fc" strokeWidth="1.5" />
            <text x={vcx} y="221" fill="#e9d5ff" fontSize="11" fontWeight="900" textAnchor="middle">
              ✨ Exact same base radius (r) and vertical height (h)!
            </text>
          </g>
        </svg>
      );
    }

    /* ------------------------------------------------ 6. VOCABULARY HIGHLIGHT (World 0) */
    case 'vocab': {
      const highlight = data.highlight || 'apex';
      const rx = 80;
      const ry = 24;
      const topY = 40;
      const botY = 190;

      return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full select-none">
          {/* Base Cone outline */}
          <path
            d={`M ${cx - rx} ${botY} A ${rx} ${ry} 0 0 0 ${cx + rx} ${botY} L ${cx} ${topY} Z`}
            fill="#38bdf815"
            stroke="none"
          />
          <path
            d={`M ${cx - rx} ${botY} A ${rx} ${ry} 0 0 1 ${cx + rx} ${botY}`}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.8"
            strokeDasharray="4 4"
          />
          <path
            d={`M ${cx - rx} ${botY} A ${rx} ${ry} 0 0 0 ${cx + rx} ${botY}`}
            fill="none"
            stroke={highlight === 'base' ? '#facc15' : strokeCol}
            strokeWidth={highlight === 'base' ? '4' : '2.5'}
          />
          <line x1={cx} y1={topY} x2={cx - rx} y2={botY} stroke={strokeCol} strokeWidth="2.5" />
          <line
            x1={cx}
            y1={topY}
            x2={cx + rx}
            y2={botY}
            stroke={highlight === 'slant' ? '#fb923c' : strokeCol}
            strokeWidth={highlight === 'slant' ? '4' : '2.5'}
          />

          {/* Vertical height line */}
          <line
            x1={cx}
            y1={topY}
            x2={cx}
            y2={botY}
            stroke={highlight === 'vheight' ? '#facc15' : '#94a3b8'}
            strokeWidth={highlight === 'vheight' ? '4' : '2'}
            strokeDasharray="5 4"
          />

          {/* Apex */}
          <circle
            cx={cx}
            cy={topY}
            r={highlight === 'apex' ? '8' : '4'}
            fill={highlight === 'apex' ? '#f43f5e' : '#38bdf8'}
          />

          {/* Highlight badges */}
          {highlight === 'apex' && (
            <text x={cx} y={topY - 14} fill="#f43f5e" fontSize="16" fontWeight="900" textAnchor="middle">
              Apex (Top Tip Vertex)
            </text>
          )}
          {highlight === 'vheight' && (
            <text x={cx - 15} y={(topY + botY) / 2} fill="#facc15" fontSize="15" fontWeight="900" textAnchor="end">
              Vertical (Perpendicular) Height
            </text>
          )}
          {highlight === 'slant' && (
            <text x={cx + rx / 2 + 25} y={(topY + botY) / 2} fill="#fb923c" fontSize="15" fontWeight="900">
              Slant Height (Along Slope)
            </text>
          )}
          {highlight === 'radius' && (
            <g>
              <line x1={cx} y1={botY} x2={cx + rx} y2={botY} stroke="#38bdf8" strokeWidth="4" />
              <text x={cx + rx / 2} y={botY + 22} fill="#38bdf8" fontSize="15" fontWeight="900" textAnchor="middle">
                Radius (r)
              </text>
            </g>
          )}
          {highlight === 'base' && (
            <text x={cx} y={botY + 26} fill="#facc15" fontSize="15" fontWeight="900" textAnchor="middle">
              Circular Base Area (πr²)
            </text>
          )}
        </svg>
      );
    }

    /* ------------------------------------------------ 7. DEFAULT FALLBACK */
    default:
      return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full select-none flex items-center justify-center">
          <text x={cx} y={cy} fill="#94a3b8" fontSize="14" textAnchor="middle">
            Solid Visual Diagram
          </text>
        </svg>
      );
  }
}
