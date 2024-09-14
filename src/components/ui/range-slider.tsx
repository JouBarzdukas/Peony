import React, { useState, useEffect, useCallback } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

interface RangeSliderProps {
  min: number
  max: number
  step: number
  value: [number, number]
  onValueChange: (value: [number, number]) => void
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, step, value, onValueChange }) => {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleValueChange = useCallback(
    (newValue: number[]) => {
      setLocalValue([newValue[0], newValue[1]])
      onValueChange([newValue[0], newValue[1]])
    },
    [onValueChange]
  )

  return (
    <SliderPrimitive.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      min={min}
      max={max}
      step={step}
      value={localValue}
      onValueChange={handleValueChange}
    >
      <SliderPrimitive.Track className="bg-secondary relative grow rounded-full h-[3px]">
        <SliderPrimitive.Range className="absolute bg-primary rounded-full h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block w-5 h-5 bg-primary shadow-md rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        aria-label="Lower bound"
      />
      <SliderPrimitive.Thumb
        className="block w-5 h-5 bg-primary shadow-md rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        aria-label="Upper bound"
      />
    </SliderPrimitive.Root>
  )
}

export default RangeSlider