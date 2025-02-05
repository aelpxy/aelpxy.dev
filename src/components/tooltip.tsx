import React from 'react'

interface TooltipItem {
  children: React.ReactNode
  text: string
}

const Tooltip: React.FC<TooltipItem> = ({ children, text }) => {
  return (
    <div className='relative inline-block group hover:cursor-pointer'>
      {children}
      <div className='absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-neutral-800 text-neutral-50 p-2 rounded shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none text-sm'>
        {text}
      </div>
    </div>
  )
}

export default Tooltip
