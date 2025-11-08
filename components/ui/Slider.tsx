'use client'

/**
 * Componente Slider - Controle deslizante para seleção de valores
 * Suporta range (min/max) e valor único, com data-testid
 */

import { useState, useEffect, ChangeEvent } from 'react'

export interface SliderProps {
  min: number
  max: number
  step?: number
  value?: number | [number, number]
  onChange?: (value: number | [number, number]) => void
  label?: string
  showValue?: boolean
  formatValue?: (value: number) => string
  testId?: string
  range?: boolean
  disabled?: boolean
}

export function Slider({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  showValue = true,
  formatValue = (val) => val.toString(),
  testId,
  range = false,
  disabled = false
}: SliderProps) {
  // Estado interno para valores
  const [internalValue, setInternalValue] = useState<number | [number, number]>(() => {
    if (value !== undefined) return value
    return range ? [min, max] : min
  })

  // Atualiza estado interno quando value externo muda
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  // Handler para slider de valor único
  const handleSingleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    setInternalValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  // Handler para slider de range (min)
  const handleRangeMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value)
    const currentMax = Array.isArray(internalValue) ? internalValue[1] : max
    const newValue: [number, number] = [Math.min(newMin, currentMax), currentMax]
    setInternalValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  // Handler para slider de range (max)
  const handleRangeMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value)
    const currentMin = Array.isArray(internalValue) ? internalValue[0] : min
    const newValue: [number, number] = [currentMin, Math.max(newMax, currentMin)]
    setInternalValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  // Extrai valores atuais
  const currentMin = Array.isArray(internalValue) ? internalValue[0] : min
  const currentMax = Array.isArray(internalValue) ? internalValue[1] : max
  const currentValue = Array.isArray(internalValue) ? internalValue[0] : internalValue

  // Calcula percentuais para visualização do track preenchido
  const minPercent = ((currentMin - min) / (max - min)) * 100
  const maxPercent = ((currentMax - min) / (max - min)) * 100
  const valuePercent = ((currentValue - min) / (max - min)) * 100

  return (
    <div className="w-full" data-testid={testId ? `${testId}-container` : undefined}>
      {/* Label e valores */}
      <div className="flex items-center justify-between mb-2">
        {label && (
          <label className="text-sm font-medium text-gray-700" data-testid={testId ? `${testId}-label` : undefined}>
            {label}
          </label>
        )}

        {showValue && (
          <span className="text-sm text-gray-600" data-testid={testId ? `${testId}-value-display` : undefined}>
            {range
              ? `${formatValue(currentMin)} - ${formatValue(currentMax)}`
              : formatValue(currentValue)}
          </span>
        )}
      </div>

      {/* Slider Container */}
      <div className="relative h-2 mb-1">
        {/* Background track */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-full" />

        {/* Filled track */}
        <div
          className="absolute h-2 bg-primary-600 rounded-full"
          style={{
            left: range ? `${minPercent}%` : '0%',
            right: range ? `${100 - maxPercent}%` : `${100 - valuePercent}%`
          }}
        />

        {/* Range sliders */}
        {range ? (
          <>
            {/* Min slider */}
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={currentMin}
              onChange={handleRangeMinChange}
              disabled={disabled}
              className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid={testId ? `${testId}-min` : 'slider-min'}
              aria-label={`${label || 'Slider'} mínimo`}
            />

            {/* Max slider */}
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={currentMax}
              onChange={handleRangeMaxChange}
              disabled={disabled}
              className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid={testId ? `${testId}-max` : 'slider-max'}
              aria-label={`${label || 'Slider'} máximo`}
            />
          </>
        ) : (
          /* Single slider */
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleSingleChange}
            disabled={disabled}
            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid={testId}
            aria-label={label || 'Slider'}
          />
        )}
      </div>

      {/* Min/Max labels */}
      <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
        <span data-testid={testId ? `${testId}-min-label` : undefined}>{formatValue(min)}</span>
        <span data-testid={testId ? `${testId}-max-label` : undefined}>{formatValue(max)}</span>
      </div>
    </div>
  )
}
