'use client'

import { useState } from 'react'
import ToolCard from './tool-card'

const TomlYamlFormatter = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<
    'toml-to-yaml' | 'yaml-to-toml' | 'toml-to-json' | 'yaml-to-json'
  >('yaml-to-json')
  const [error, setError] = useState('')

  // Simple YAML parser (basic implementation)
  const parseYaml = (yaml: string): any => {
    const lines = yaml.split('\n')
    const result: any = {}
    let currentObj = result
    const stack: any[] = [result]
    let currentIndent = 0

    for (const line of lines) {
      const trimmed = line.trimStart()
      if (!trimmed || trimmed.startsWith('#')) continue

      const indent = line.length - trimmed.length

      if (trimmed.includes(':')) {
        const [key, ...valueParts] = trimmed.split(':')
        const value = valueParts.join(':').trim()

        if (indent < currentIndent) {
          const levelsBack = Math.floor((currentIndent - indent) / 2)
          for (let i = 0; i < levelsBack; i++) {
            stack.pop()
          }
          currentObj = stack[stack.length - 1]
        }

        if (value) {
          // Parse value
          if (value === 'true') currentObj[key.trim()] = true
          else if (value === 'false') currentObj[key.trim()] = false
          else if (!isNaN(Number(value))) currentObj[key.trim()] = Number(value)
          else if (value.startsWith('"') || value.startsWith("'")) {
            currentObj[key.trim()] = value.slice(1, -1)
          } else {
            currentObj[key.trim()] = value
          }
        } else {
          // Nested object
          currentObj[key.trim()] = {}
          currentObj = currentObj[key.trim()]
          stack.push(currentObj)
        }

        currentIndent = indent
      } else if (trimmed.startsWith('-')) {
        // Array item
        const value = trimmed.substring(1).trim()
        if (!Array.isArray(currentObj)) {
          const lastKey = Object.keys(stack[stack.length - 2]).pop()
          if (lastKey) {
            stack[stack.length - 2][lastKey] = []
            currentObj = stack[stack.length - 2][lastKey]
            stack[stack.length - 1] = currentObj
          }
        }
        if (Array.isArray(currentObj)) {
          currentObj.push(value)
        }
      }
    }

    return result
  }

  // Simple TOML parser (basic implementation)
  const parseToml = (toml: string): any => {
    const lines = toml.split('\n')
    const result: any = {}
    let currentSection = result

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        const section = trimmed.slice(1, -1)
        result[section] = {}
        currentSection = result[section]
      } else if (trimmed.includes('=')) {
        const [key, ...valueParts] = trimmed.split('=')
        let value: any = valueParts.join('=').trim()

        if (value === 'true') value = true
        else if (value === 'false') value = false
        else if (!isNaN(Number(value))) value = Number(value)
        else if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1)
        }

        currentSection[key.trim()] = value
      }
    }

    return result
  }

  // Convert object to YAML
  const objectToYaml = (obj: any, indent = 0): string => {
    let yaml = ''
    const spacing = '  '.repeat(indent)

    for (const [key, value] of Object.entries(obj)) {
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        yaml += `${spacing}${key}:\n`
        yaml += objectToYaml(value, indent + 1)
      } else if (Array.isArray(value)) {
        yaml += `${spacing}${key}:\n`
        value.forEach((item) => {
          yaml += `${spacing}  - ${item}\n`
        })
      } else {
        yaml += `${spacing}${key}: ${value}\n`
      }
    }

    return yaml
  }

  // Convert object to TOML
  const objectToToml = (obj: any): string => {
    let toml = ''

    for (const [key, value] of Object.entries(obj)) {
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        toml += `\n[${key}]\n`
        for (const [subKey, subValue] of Object.entries(value)) {
          if (typeof subValue === 'string') {
            toml += `${subKey} = "${subValue}"\n`
          } else {
            toml += `${subKey} = ${subValue}\n`
          }
        }
      } else if (typeof value === 'string') {
        toml += `${key} = "${value}"\n`
      } else {
        toml += `${key} = ${value}\n`
      }
    }

    return toml
  }

  const convert = () => {
    setError('')
    setOutput('')

    if (!input) return

    try {
      let result = ''

      switch (mode) {
        case 'yaml-to-json':
          const yamlObj = parseYaml(input)
          result = JSON.stringify(yamlObj, null, 2)
          break

        case 'toml-to-json':
          const tomlObj = parseToml(input)
          result = JSON.stringify(tomlObj, null, 2)
          break

        case 'yaml-to-toml':
          const yamlToTomlObj = parseYaml(input)
          result = objectToToml(yamlToTomlObj)
          break

        case 'toml-to-yaml':
          const tomlToYamlObj = parseToml(input)
          result = objectToYaml(tomlToYamlObj)
          break
      }

      setOutput(result)
    } catch (err) {
      setError('Conversion error: ' + (err as Error).message)
    }
  }

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
    }
  }

  return (
    <ToolCard
      title='TOML/YAML Converter'
      description='Convert between TOML, YAML, and JSON formats.'
    >
      <div className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>Conversion Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as any)}
            className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
          >
            <option value='yaml-to-json'>YAML → JSON</option>
            <option value='toml-to-json'>TOML → JSON</option>
            <option value='yaml-to-toml'>YAML → TOML</option>
            <option value='toml-to-yaml'>TOML → YAML</option>
          </select>
        </div>

        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter TOML or YAML...'
            className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm min-h-[150px] resize-y'
          />
        </div>

        <button
          onClick={convert}
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

        {output && (
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>Output</label>
            <textarea
              value={output}
              readOnly
              className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm min-h-[150px] resize-y'
            />
            <button
              onClick={copyToClipboard}
              className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors'
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </ToolCard>
  )
}

export default TomlYamlFormatter
