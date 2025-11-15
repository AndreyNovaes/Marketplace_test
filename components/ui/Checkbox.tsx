'use client'

/**
 * Componente Checkbox - Caixa de seleção reutilizável
 * Inclui suporte para labels, descrições e data-testid
 */

import { InputHTMLAttributes, forwardRef, useId } from 'react'
import { Check } from 'lucide-react'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  testId?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      className = '',
      testId,
      id,
      checked,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const checkboxId = id || generatedId

    return (
      <div className="flex items-start" data-testid={testId ? `${testId}-container` : undefined}>
        <div className="flex items-center h-5">
          {/* Hidden native checkbox */}
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="sr-only peer"
            checked={checked}
            data-testid={testId}
            {...props}
          />

          {/* Custom checkbox */}
          <label
            htmlFor={checkboxId}
            className={`
              relative flex items-center justify-center w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200
              peer-checked:bg-primary-600 peer-checked:border-primary-600
              peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-1
              peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
              border-gray-300 hover:border-primary-400
              ${className}
            `}
            data-testid={testId ? `${testId}-box` : undefined}
          >
            {checked && (
              <Check
                size={14}
                className="text-white absolute"
                strokeWidth={3}
                data-testid={testId ? `${testId}-check` : 'checkbox-check'}
              />
            )}
          </label>
        </div>

        {/* Label and Description */}
        {(label || description) && (
          <div className="ml-3">
            {label && (
              <label
                htmlFor={checkboxId}
                className="block text-sm font-medium text-gray-700 cursor-pointer"
                data-testid={testId ? `${testId}-label` : undefined}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                className="text-sm text-gray-500 mt-0.5"
                data-testid={testId ? `${testId}-description` : undefined}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
