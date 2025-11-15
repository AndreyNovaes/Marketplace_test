'use client'

/**
 * Componente Select - Campo de seleção reutilizável
 * Inclui suporte para labels, mensagens de erro e data-testid
 */

import { SelectHTMLAttributes, forwardRef, useId } from 'react'
import { AlertCircle, ChevronDown } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
  testId?: string
  fullWidth?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      className = '',
      testId,
      fullWidth = true,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const selectId = id || generatedId
    const hasError = !!error

    // Classes base do container
    const containerClasses = fullWidth ? 'w-full' : ''

    // Classes base do select
    const baseClasses = 'block pl-4 pr-10 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-white'

    // Classes baseadas no estado
    const stateClasses = hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900'
      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'

    const combinedClasses = `${baseClasses} ${stateClasses} ${fullWidth ? 'w-full' : ''} ${className}`

    return (
      <div className={containerClasses} data-testid={testId ? `${testId}-container` : undefined}>
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
            data-testid={testId ? `${testId}-label` : undefined}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Select Container */}
        <div className="relative">
          {/* Select */}
          <select
            ref={ref}
            id={selectId}
            className={combinedClasses}
            aria-invalid={hasError}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            data-testid={testId}
            required={required}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                data-testid={testId ? `${testId}-option-${option.value}` : undefined}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Chevron Icon */}
          {!hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <ChevronDown size={20} />
            </div>
          )}

          {/* Error Icon */}
          {hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
              <AlertCircle size={20} data-testid={testId ? `${testId}-error-icon` : 'select-error-icon'} />
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${selectId}-error`}
            className="mt-1.5 text-sm text-red-600"
            role="alert"
            data-testid={testId ? `${testId}-error` : 'select-error-message'}
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${selectId}-helper`}
            className="mt-1.5 text-sm text-gray-500"
            data-testid={testId ? `${testId}-helper` : 'select-helper-text'}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
