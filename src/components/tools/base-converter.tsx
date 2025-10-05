'use client'

import { useState } from 'react'
import ToolCard from './tool-card'

const BASE58_ALPHABET =
  '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

const base58Encode = (text: string): string => {
  const bytes = new TextEncoder().encode(text)
  let num = BigInt(0)

  for (const byte of bytes) {
    num = num * BigInt(256) + BigInt(byte)
  }

  if (num === BigInt(0)) {
    return BASE58_ALPHABET[0]
  }

  let encoded = ''
  while (num > BigInt(0)) {
    const remainder = Number(num % BigInt(58))
    encoded = BASE58_ALPHABET[remainder] + encoded
    num = num / BigInt(58)
  }

  // Handle leading zeros
  for (const byte of bytes) {
    if (byte === 0) {
      encoded = BASE58_ALPHABET[0] + encoded
    } else {
      break
    }
  }

  return encoded
}

const base58Decode = (encoded: string): string => {
  let num = BigInt(0)

  for (const char of encoded) {
    const index = BASE58_ALPHABET.indexOf(char)
    if (index === -1) {
      throw new Error('Invalid base58 character')
    }
    num = num * BigInt(58) + BigInt(index)
  }

  const bytes: number[] = []
  while (num > BigInt(0)) {
    bytes.unshift(Number(num % BigInt(256)))
    num = num / BigInt(256)
  }

  // Handle leading zeros
  for (const char of encoded) {
    if (char === BASE58_ALPHABET[0]) {
      bytes.unshift(0)
    } else {
      break
    }
  }

  return new TextDecoder().decode(new Uint8Array(bytes))
}

const BaseConverter = () => {
  const [input, setInput] = useState('')
  const [fromBase, setFromBase] = useState('10')
  const [results, setResults] = useState({
    binary: '',
    octal: '',
    decimal: '',
    hex: '',
    base58: '',
    base64: '',
  })
  const [error, setError] = useState('')

  const convertBase = () => {
    if (!input) return
    setError('')

    try {
      let binary = '',
        octal = '',
        decimal = '',
        hex = '',
        base58 = '',
        base64 = ''

      if (fromBase === 'text') {
        // Text input - encode to all formats
        base58 = base58Encode(input)
        base64 = btoa(input)

        // Convert text to hex
        const encoder = new TextEncoder()
        const bytes = encoder.encode(input)
        hex = Array.from(bytes)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('')
          .toUpperCase()

        // Convert to decimal (from hex)
        const decValue = BigInt('0x' + hex)
        decimal = decValue.toString()
        binary = decValue.toString(2)
        octal = decValue.toString(8)
      } else if (fromBase === 'base58') {
        // Decode base58
        const decoded = base58Decode(input)
        base64 = btoa(decoded)

        const encoder = new TextEncoder()
        const bytes = encoder.encode(decoded)
        hex = Array.from(bytes)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('')
          .toUpperCase()

        const decValue = BigInt('0x' + hex)
        decimal = decValue.toString()
        binary = decValue.toString(2)
        octal = decValue.toString(8)
      } else if (fromBase === 'base64') {
        // Decode base64
        const decoded = atob(input)
        base58 = base58Encode(decoded)

        const encoder = new TextEncoder()
        const bytes = encoder.encode(decoded)
        hex = Array.from(bytes)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('')
          .toUpperCase()

        const decValue = BigInt('0x' + hex)
        decimal = decValue.toString()
        binary = decValue.toString(2)
        octal = decValue.toString(8)
      } else {
        // Numeric conversion
        const decimalValue = parseInt(input, parseInt(fromBase))

        if (isNaN(decimalValue)) {
          setError('Invalid number for selected base')
          return
        }

        binary = decimalValue.toString(2)
        octal = decimalValue.toString(8)
        decimal = decimalValue.toString(10)
        hex = decimalValue.toString(16).toUpperCase()

        // Convert to text encoding
        const hexStr = hex.length % 2 ? '0' + hex : hex
        const bytes = []
        for (let i = 0; i < hexStr.length; i += 2) {
          bytes.push(parseInt(hexStr.substring(i, i + 2), 16))
        }
        try {
          const text = new TextDecoder().decode(new Uint8Array(bytes))
          base58 = base58Encode(text)
          base64 = btoa(text)
        } catch {
          base58 = ''
          base64 = ''
        }
      }

      setResults({ binary, octal, decimal, hex, base58, base64 })
    } catch (error) {
      setError('Conversion error: ' + (error as Error).message)
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  return (
    <ToolCard
      title='Base Converter'
      description='Convert between binary, octal, decimal, hex, base58, and base64.'
    >
      <div className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Enter number or text...'
              className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 min-h-[80px] resize-y'
            />
          </div>
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>From Format</label>
            <select
              value={fromBase}
              onChange={(e) => setFromBase(e.target.value)}
              className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
            >
              <option value='text'>Text/String</option>
              <option value='2'>Binary (2)</option>
              <option value='8'>Octal (8)</option>
              <option value='10'>Decimal (10)</option>
              <option value='16'>Hexadecimal (16)</option>
              <option value='base58'>Base58</option>
              <option value='base64'>Base64</option>
            </select>
          </div>
        </div>
        <button
          onClick={convertBase}
          disabled={!input}
          className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Convert
        </button>
        {error && (
          <div className='px-3 py-2 bg-red-900/20 border border-red-800 text-red-400 text-sm'>
            {error}
          </div>
        )}
        {results.decimal && (
          <div className='space-y-3'>
            <div>
              <label className='text-sm text-neutral-400 block mb-1'>
                Binary
              </label>
              <div className='flex gap-2'>
                <input
                  type='text'
                  value={results.binary}
                  readOnly
                  className='flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm'
                />
                <button
                  onClick={() => copyToClipboard(results.binary)}
                  className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors'
                >
                  Copy
                </button>
              </div>
            </div>
            <div>
              <label className='text-sm text-neutral-400 block mb-1'>
                Octal
              </label>
              <div className='flex gap-2'>
                <input
                  type='text'
                  value={results.octal}
                  readOnly
                  className='flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm'
                />
                <button
                  onClick={() => copyToClipboard(results.octal)}
                  className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors'
                >
                  Copy
                </button>
              </div>
            </div>
            <div>
              <label className='text-sm text-neutral-400 block mb-1'>
                Decimal
              </label>
              <div className='flex gap-2'>
                <input
                  type='text'
                  value={results.decimal}
                  readOnly
                  className='flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm'
                />
                <button
                  onClick={() => copyToClipboard(results.decimal)}
                  className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors'
                >
                  Copy
                </button>
              </div>
            </div>
            <div>
              <label className='text-sm text-neutral-400 block mb-1'>
                Hexadecimal
              </label>
              <div className='flex gap-2'>
                <input
                  type='text'
                  value={results.hex}
                  readOnly
                  className='flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm'
                />
                <button
                  onClick={() => copyToClipboard(results.hex)}
                  className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors'
                >
                  Copy
                </button>
              </div>
            </div>
            {results.base58 && (
              <div>
                <label className='text-sm text-neutral-400 block mb-1'>
                  Base58
                </label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={results.base58}
                    readOnly
                    className='flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm'
                  />
                  <button
                    onClick={() => copyToClipboard(results.base58)}
                    className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors'
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
            {results.base64 && (
              <div>
                <label className='text-sm text-neutral-400 block mb-1'>
                  Base64
                </label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={results.base64}
                    readOnly
                    className='flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm'
                  />
                  <button
                    onClick={() => copyToClipboard(results.base64)}
                    className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors'
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolCard>
  )
}

export default BaseConverter
