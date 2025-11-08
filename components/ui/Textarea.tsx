'use client'

/**
 * Componente Textarea - Campo de texto multilinha reutilizável
 * Inclui suporte para labels, contador de caracteres, mensagens de erro e data-testid
 */

import { TextareaHTMLAttributes, forwardRef, useState, ChangeEvent } from 'react'
import { AlertCircle } from 'lucide-react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  showCharCount?: boolean
  testId?: string
  fullWidth?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      showCharCount = false,
      className = '',
      testId,
      fullWidth = true,
      id,
      required,
      maxLength,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState<number>(
      typeof value === 'string' ? value.length : 0
    )

    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error

    // Classes base do container
    const containerClasses = fullWidth ? 'w-full' : ''

    // Classes base do textarea
    const baseClasses = 'block px-4 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-gray-100 disabled:cursor-not-allowed resize-y min-h-[100px]'

    // Classes baseadas no estado
    const stateClasses = hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900'
      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'

    const combinedClasses = `${baseClasses} ${stateClasses} ${fullWidth ? 'w-full' : ''} ${className}`

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (showCharCount) {
        setCharCount(e.target.value.length)
      }
      if (onChange) {
        onChange(e)
      }
    }

    return (
      <div className={containerClasses} data-testid={testId ? `${testId}-container` : undefined}>
        {/* Label */}
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <label
              htmlFor={textareaId}
              className="block text-sm font-medium text-gray-700"
              data-testid={testId ? `${testId}-label` : undefined}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          {/* Character Count */}
          {showCharCount && maxLength && (
            <span
              className={`text-xs ${charCount > maxLength ? 'text-red-600' : 'text-gray-500'}`}
              data-testid={testId ? `${testId}-char-count` : 'textarea-char-count'}
            >
              {charCount} / {maxLength}
            </span>
          )}
        </div>

        {/* Textarea Container */}
        <div className="relative">
          {/* Textarea */}
          <textarea
            ref={ref}
            id={textareaId}
            className={combinedClasses}
            aria-invalid={hasError}
            aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
            data-testid={testId}
            required={required}
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            {...props}
          />

          {/* Error Icon */}
          {hasError && (
            <div className="absolute right-3 top-3 text-red-500 pointer-events-none">
              <AlertCircle size={20} data-testid={testId ? `${testId}-error-icon` : 'textarea-error-icon'} />
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-1.5 text-sm text-red-600"
            role="alert"
            data-testid={testId ? `${testId}-error` : 'textarea-error-message'}
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${textareaId}-helper`}
            className="mt-1.5 text-sm text-gray-500"
            data-testid={testId ? `${testId}-helper` : 'textarea-helper-text'}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
