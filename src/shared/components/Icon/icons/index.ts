import crown from './crown.svg?react'
import lockCircleFill from './lock-circle-fill.svg?react'
import megaphone from './megaphone.svg?react'
import percentCircleFill from './percent-circle-fill.svg'

export const icons = {
  crown,
  lockCircleFill,
  megaphone,
  percentCircleFill,
} as const

export type IconName = keyof typeof icons
