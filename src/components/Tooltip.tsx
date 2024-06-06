import React from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { CustomTooltipProps } from '@/interfaces/props';
  
const Tooltip = ({children, content, side}:CustomTooltipProps) => {
  return (
    <RadixTooltip.Provider>
        <RadixTooltip.Root>
            <RadixTooltip.Trigger>{children}</RadixTooltip.Trigger>
            <RadixTooltip.Content side={side?side:"top"} className='bg-[#543310] text-[#F8F4E1] border-[#AF8F6F] border-[1px] rounded-lg animate-slideRightAndFade ml-[6px] p-1'>
                {content}
            </RadixTooltip.Content>
        </RadixTooltip.Root>
    </RadixTooltip.Provider>

  )
}

export default Tooltip