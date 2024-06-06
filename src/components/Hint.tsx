import { HintProps } from '@/interfaces/props'
import React from 'react'



const Hint = ({text, textClassName, children}:HintProps) => {
  return (
    <div
      className='flex animate-slideUpAndFade items-center justify-center p-[10px] rounded-md drop-shadow-md bg-white pointer-events-none'
    >
      {children}
      <p
      className={textClassName}
      >
        {text}
      </p>
    </div>
  )
}

export default Hint