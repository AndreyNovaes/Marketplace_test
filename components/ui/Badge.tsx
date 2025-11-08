'use client'

/**
 * Componente Badge - Etiqueta/emblema reutilizável
 * Usado para destacar status, categorias, tags, etc.
 */

import { HTMLAttributes, ReactNode } from 'react'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  testId?: string
  children: ReactNode
}

export function Badge({
  variant = 'default',
  size = 'md',
  rounded = false,
  className = '',
  testId,
  children,
  ...props
}: BadgeProps) {
  // Classes base
  const baseClasses = 'inline-flex items-center justify-center font-medium'

  // Classes de variante
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800'
  }

  // Classes de tamanho
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }

  // Classes de arredondamento
  const roundedClasses = rounded ? 'rounded-full' : 'rounded'

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses} ${className}`

  return (
    <span className={combinedClasses} data-testid={testId} {...props}>
      {children}
    </span>
  )
}
