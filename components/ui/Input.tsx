'use client'

/**
 * Componente Input - Campo de entrada reutilizável
 * Inclui suporte para labels, mensagens de erro, ícones e data-testid
 */

import { InputHTMLAttributes, forwardRef, ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  testId?: string
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = '',
      testId,
      fullWidth = true,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error

    // Classes base do container
    const containerClasses = fullWidth ? 'w-full' : ''

    // Classes base do input
    const baseClasses = 'block px-4 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-gray-100 disabled:cursor-not-allowed'

    // Classes baseadas no estado
    const stateClasses = hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900'
      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'

    // Classes para ícones
    const iconClasses = leftIcon ? 'pl-11' : rightIcon ? 'pr-11' : ''

    const combinedClasses = `${baseClasses} ${stateClasses} ${iconClasses} ${fullWidth ? 'w-full' : ''} ${className}`

    return (
      <div className={containerClasses} data-testid={testId ? `${testId}-container` : undefined}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
            data-testid={testId ? `${testId}-label` : undefined}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            className={combinedClasses}
            aria-invalid={hasError}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            data-testid={testId}
            required={required}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && !hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {rightIcon}
            </div>
          )}

          {/* Error Icon */}
          {hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
              <AlertCircle size={20} data-testid={testId ? `${testId}-error-icon` : 'input-error-icon'} />
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-red-600"
            role="alert"
            data-testid={testId ? `${testId}-error` : 'input-error-message'}
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-1.5 text-sm text-gray-500"
            data-testid={testId ? `${testId}-helper` : 'input-helper-text'}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
