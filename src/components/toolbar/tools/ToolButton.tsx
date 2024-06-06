import Tooltip from '@/components/Tooltip'
import React from 'react'

export interface ToolButtonProps {
    tooltip?:boolean
    tooltipContent?:React.ReactNode | String
    tooltipSide?: "left" | "right" | "top" | "bottom"
    children:React.ReactNode
}

const ToolButton = ({tooltip=false, tooltipContent, tooltipSide="top", children}:ToolButtonProps) => {
  return (
    <>
        {tooltip?
            <Tooltip
                content={tooltipContent}
                side={tooltipSide}
            >
                {children}
            </Tooltip>
        :
            children
        }
    </>
  )
}

export default ToolButton