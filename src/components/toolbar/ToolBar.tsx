import React from 'react'
import ToolButton from './tools/ToolButton'
import { Grid, RotateCcw } from 'lucide-react'
import Seperator from '../Seperator'

export interface ToolBarProps {
    grid:boolean
    setGrid: () => void
    setCurrentCameraPosition: () => void
}

const ToolBar = ({setCurrentCameraPosition, setGrid, grid}:ToolBarProps) => {
  return (
    <div
        className='absolute animate-slideLeftAndFade flex flex-col items-start justify-center top-[200px] left-2 p-[10px] rounded-md drop-shadow-md bg-white gap-4'
      >
        <ToolButton
          tooltip
          tooltipContent="Reset View"
          tooltipSide='right'
        >
          <RotateCcw
            className='flex bg-white hover:bg-[#AF8F6F] hover:text-[#F8F4E1] p-1 rounded-md'
            onClick={() => setCurrentCameraPosition()}
            size={32}
          >
            Reset Camera
          </RotateCcw>
        </ToolButton>

        <Seperator />

        <ToolButton
          tooltip
          tooltipContent={`${grid?"Disable":"Enable"} Grid`}
          tooltipSide='right'
        >
          <Grid
            className={`flex w-full items-center gap-2 p-1 rounded-md ${grid? "text-[#F8F4E1] bg-[#AF8F6F] hover:bg-gray-300":"hover:bg-[#AF8F6F] hover:text-[#F8F4E1]"}`}
            onClick={() => setGrid()}
            size={32}
          >
            <input
              type='checkbox'
              placeholder='Grid'
              checked={grid}
            />
            <p>Grid</p>
          </Grid>
        </ToolButton>
    </div>
  )
}

export default ToolBar