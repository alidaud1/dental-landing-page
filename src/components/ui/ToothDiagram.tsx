import { cn } from '../../lib/cn'

export type ToothVariant = 'preventive' | 'restorative' | 'cosmetic'

interface ToothDiagramProps {
  variant: ToothVariant
  className?: string
  /** Hides the annotation labels — use in small or decorative placements. */
  bare?: boolean
}

/*
 * Anatomical cross-section of a molar, drawn to roughly correct proportions:
 * a crown about as tall as it is wide, two roots splaying from the furcation,
 * and three tissue layers — enamel (outer shell, crown only), dentin (bulk of
 * crown and roots), and the pulp chamber with canals running to the apices.
 *
 * Shared geometry, three states:
 *   preventive  — intact, with a protective seal highlighted
 *   restorative — occlusal cavity prepared and filled
 *   cosmetic    — a facing applied to the visible surface
 *
 * Drawn rather than photographed on purpose: it shows real dental structure,
 * carries no licensing question, scales to any size, and recolours from the
 * palette instead of fighting it.
 */

const OUTLINE =
  'M50 18 C32 18 22 29 22 43 C22 52 25 58 27 66 L31 104 C32 112 36 116 41 116 C46 116 48 111 49 104 L50 86 L51 104 C52 111 54 116 59 116 C64 116 68 112 69 104 L73 66 C75 58 78 52 78 43 C78 29 68 18 50 18 Z'

const DENTIN =
  'M50 27 C37 27 30 34 30 44 C30 52 33 58 35 66 L38 103 C39 108 40 110 42 110 C44 110 45 107 45 103 L50 78 L55 103 C55 107 56 110 58 110 C60 110 61 108 62 103 L65 66 C67 58 70 52 70 44 C70 34 63 27 50 27 Z'

const PULP =
  'M50 40 C43 40 40 44 40 50 C40 56 42 60 43 66 L45 98 C45 101 46 102 47 102 C48 102 48 100 48 98 L50 74 L52 98 C52 100 52 102 53 102 C54 102 55 101 55 98 L57 66 C58 60 60 56 60 50 C60 44 57 40 50 40 Z'

export function ToothDiagram({ variant, className, bare = false }: ToothDiagramProps) {
  const titleId = `tooth-${variant}-title`

  /*
   * Two viewBoxes over identical geometry: the labelled version reserves room
   * on the right for the annotation text (which would otherwise clip), while
   * the bare version crops tight to the tooth so it centres in a small frame.
   */
  const viewBox = bare ? '14 10 72 112' : '0 8 132 118'

  return (
    <svg
      viewBox={viewBox}
      className={cn('h-full w-full', className)}
      role="img"
      aria-labelledby={titleId}
      fill="none"
    >
      <title id={titleId}>{DESCRIPTIONS[variant].title}</title>

      {/* Measurement ticks down the left edge — the clinical-drawing detail. */}
      {!bare && (
        <g stroke="currentColor" strokeWidth="0.75" opacity="0.28">
          {[24, 40, 56, 72, 88, 104].map((y, i) => (
            <line key={y} x1="5" y1={y} x2={i % 2 === 0 ? 13 : 10} y2={y} />
          ))}
          <line x1="5" y1="24" x2="5" y2="104" />
        </g>
      )}

      {/* Tissue layers, outermost first. */}
      <path d={OUTLINE} className="fill-enamel" />
      <path d={DENTIN} className="fill-dentin" />
      <path d={PULP} className="fill-pulp" opacity="0.82" />

      {variant === 'restorative' && (
        <>
          {/* Prepared cavity, then the filling seated in it. */}
          <path
            d="M38 28 L38 44 C38 48 43 50 50 50 C57 50 62 48 62 44 L62 28 Z"
            className="fill-brand-800"
            opacity="0.16"
          />
          <path
            d="M39 27 L39 43 C39 46.5 44 48.5 50 48.5 C56 48.5 61 46.5 61 43 L61 27 Z"
            className="fill-brand-500"
          />
          <path
            d="M39 27 L39 43 C39 46.5 44 48.5 50 48.5"
            className="stroke-brand-700"
            strokeWidth="1.1"
            opacity="0.55"
          />
        </>
      )}

      {variant === 'cosmetic' && (
        <>
          {/* A facing bonded to the visible surface. */}
          <path
            d="M50 19 C36 19.5 27 29 27 42 C27 50 29 55 31 62 L36 62 C34 55 32 50 32 42 C32 31 39 24 50 23.5 Z"
            className="fill-brand-300"
            opacity="0.85"
          />
          <path
            d="M50 19 C36 19.5 27 29 27 42 C27 50 29 55 31 62"
            className="stroke-brand-500"
            strokeWidth="1.2"
          />
        </>
      )}

      {variant === 'preventive' && (
        /* A protective seal across the occlusal surface. */
        <path
          d="M26 25 C34 20 42 18.5 50 18.5 C58 18.5 66 20 74 25"
          className="stroke-brand-500"
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.9"
        />
      )}

      {/* Outline last, so it sits crisply over every fill. */}
      <path d={OUTLINE} className="stroke-brand-700" strokeWidth="1.5" strokeLinejoin="round" />

      {!bare && (
        <g className="fill-clinical stroke-clinical">
          {DESCRIPTIONS[variant].marks.map((mark) => (
            <g key={mark.label}>
              <circle cx={mark.x} cy={mark.y} r="1.6" strokeWidth="0" />
              <line
                x1={mark.x}
                y1={mark.y}
                x2={mark.lx - 1.5}
                y2={mark.ly}
                strokeWidth="0.75"
                opacity="0.6"
              />
              <text
                x={mark.lx}
                y={mark.ly + 2.2}
                className="label-clinical fill-clinical"
                style={{ fontSize: '5.5px', letterSpacing: '0.08em' }}
                strokeWidth="0"
              >
                {mark.label}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  )
}

const DESCRIPTIONS: Record<
  ToothVariant,
  { title: string; marks: Array<{ x: number; y: number; lx: number; ly: number; label: string }> }
> = {
  preventive: {
    title:
      'Cross-section of a healthy molar showing enamel, dentin and the pulp chamber, with a protective seal across the biting surface',
    marks: [
      { x: 74, y: 28, lx: 80, ly: 26, label: 'ENAMEL' },
      { x: 68, y: 52, lx: 80, ly: 52, label: 'DENTIN' },
      { x: 56, y: 56, lx: 80, ly: 78, label: 'PULP' },
    ],
  },
  restorative: {
    title:
      'Cross-section of a molar with a prepared cavity restored by a filling, shown against the enamel, dentin and pulp layers',
    marks: [
      { x: 50, y: 36, lx: 80, ly: 30, label: 'FILLING' },
      { x: 68, y: 52, lx: 80, ly: 56, label: 'DENTIN' },
      { x: 56, y: 70, lx: 80, ly: 84, label: 'PULP' },
    ],
  },
  cosmetic: {
    title:
      'Cross-section of a molar with a cosmetic facing bonded to the visible surface, shown against the enamel, dentin and pulp layers',
    marks: [
      { x: 30, y: 34, lx: 80, ly: 28, label: 'FACING' },
      { x: 70, y: 46, lx: 80, ly: 54, label: 'ENAMEL' },
      { x: 56, y: 70, lx: 80, ly: 82, label: 'PULP' },
    ],
  },
}
