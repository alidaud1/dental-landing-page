import {
  Activity,
  ClipboardList,
  Clock,
  Crown,
  Droplets,
  Layers,
  MapPin,
  MessageCircle,
  Scissors,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Sun,
  Users,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react'

/**
 * Icons referenced by name from the data files, so content can be edited
 * without touching imports. Unknown names fall back to a neutral icon rather
 * than throwing.
 */
const registry: Record<string, LucideIcon> = {
  activity: Activity,
  'clipboard-list': ClipboardList,
  clock: Clock,
  crown: Crown,
  droplets: Droplets,
  layers: Layers,
  'map-pin': MapPin,
  'message-circle': MessageCircle,
  scissors: Scissors,
  'shield-check': ShieldCheck,
  smile: Smile,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  sun: Sun,
  users: Users,
  'wand-sparkles': WandSparkles,
}

interface IconProps {
  name: string
  className?: string
  strokeWidth?: number
}

export function Icon({ name, className, strokeWidth = 1.6 }: IconProps) {
  const Component = registry[name] ?? Sparkles
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
