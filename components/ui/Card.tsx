'use client'

/**
 * Componente Card - Cartão reutilizável para conteúdo
 * Inclui variantes, estados interativos e data-testid
 */

import { HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  testId?: string
  children: ReactNode
}

export function Card({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className = '',
  testId,
  children,
  ...props
}: CardProps) {
  // Classes base
  const baseClasses = 'bg-white rounded-lg transition-all duration-200'

  // Classes de variante
  const variantClasses = {
    default: 'border border-gray-200',
    bordered: 'border-2 border-gray-300',
    elevated: 'shadow-lg'
  }

  // Classes de padding
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }

  // Classes de hover
  const hoverClasses = hoverable ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : ''

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`

  return (
    <div className={combinedClasses} data-testid={testId} {...props}>
      {children}
    </div>
  )
}

/**
 * Subcomponentes do Card para melhor organização
 */

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  testId?: string
  children: ReactNode
}

export function CardHeader({ className = '', testId, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={`border-b border-gray-200 pb-3 mb-4 ${className}`}
      data-testid={testId}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  testId?: string
  children: ReactNode
}

export function CardBody({ className = '', testId, children, ...props }: CardBodyProps) {
  return (
    <div className={className} data-testid={testId} {...props}>
      {children}
    </div>
  )
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  testId?: string
  children: ReactNode
}

export function CardFooter({ className = '', testId, children, ...props }: CardFooterProps) {
  return (
    <div
      className={`border-t border-gray-200 pt-3 mt-4 ${className}`}
      data-testid={testId}
      {...props}
    >
      {children}
    </div>
  )
}
