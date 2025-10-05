'use client'

import { useState } from 'react'
import ToolCard from './tool-card'

const ColorConverter = () => {
  const [color, setColor] = useState('#3b82f6')
  const [rgb, setRgb] = useState('rgb(59, 130, 246)')
  const [hsl, setHsl] = useState('hsl(217, 91%, 60%)')

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / d + 2) / 6
          break
        case b:
          h = ((r - g) / d + 4) / 6
          break
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const updateColor = (hex: string) => {
    setColor(hex)
    const rgbColor = hexToRgb(hex)
    if (rgbColor) {
      setRgb(`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`)
      const hslColor = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b)
      setHsl(`hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`)
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  return (
    <ToolCard
      title='Color Converter'
      description='Convert colors between HEX, RGB, and HSL formats.'
    >
      <div className='space-y-4'>
        <div className='flex items-center gap-4'>
          <div className='space-y-2 flex-1'>
            <label className='text-sm text-neutral-400'>Pick a Color</label>
            <input
              type='color'
              value={color}
              onChange={(e) => updateColor(e.target.value)}
              className='w-full h-12 bg-neutral-900 border border-neutral-700 cursor-pointer'
            />
          </div>
          <div
            className='w-24 h-24 border border-neutral-700 rounded'
            style={{ backgroundColor: color }}
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>HEX</label>
          <div className='flex gap-2'>
            <input
              type='text'
              value={color}
              onChange={(e) => updateColor(e.target.value)}
              className='flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono'
            />
            <button
              onClick={() => copyToClipboard(color)}
              className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors'
            >
              Copy
            </button>
          </div>
        </div>

        {rgb && (
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>RGB</label>
            <div className='flex gap-2'>
              <input
                type='text'
                value={rgb}
                readOnly
                className='flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono'
              />
              <button
                onClick={() => copyToClipboard(rgb)}
                className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors'
              >
                Copy
              </button>
            </div>
          </div>
        )}

        {hsl && (
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>HSL</label>
            <div className='flex gap-2'>
              <input
                type='text'
                value={hsl}
                readOnly
                className='flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono'
              />
              <button
                onClick={() => copyToClipboard(hsl)}
                className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors'
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolCard>
  )
}

export default ColorConverter
