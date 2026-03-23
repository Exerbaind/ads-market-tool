import { cn } from '@shared/lib'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

type TextType =
  | 'large-title'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'body'
  | 'callout'
  | 'subheadline1'
  | 'subheadline2'
  | 'footnote'
  | 'caption1'
  | 'caption2'

type TextElement = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'label'

type TextProps = {
  type?: TextType
  as?: TextElement
  className?: string
  truncate?: boolean
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<'p'>, 'children' | 'className'>

const TYPE_CLASSES: Record<TextType, string> = {
  'large-title': 'text-[34px] leading-[41px]',
  title1: 'text-[28px] leading-[34px]',
  title2: 'text-[22px] leading-[28px]',
  title3: 'text-[20px] leading-[24px]',
  body: 'text-[17px] leading-[22px]',
  callout: 'text-[16px] leading-[22px]',
  subheadline1: 'text-[15px] leading-[20px]',
  subheadline2: 'text-[14px] leading-[18px]',
  footnote: 'text-[13px] leading-[18px]',
  caption1: 'text-[12px] leading-[16px]',
  caption2: 'text-[11px] leading-[13px]',
}

export const Text = ({
  type = 'body',
  as = 'p',
  className,
  truncate = false,
  children,
  ...rest
}: TextProps) => {
  const Component = as as ElementType

  return (
    <Component
      className={cn(TYPE_CLASSES[type], truncate && 'truncate', className)}
      {...rest}
    >
      {children}
    </Component>
  )
}
