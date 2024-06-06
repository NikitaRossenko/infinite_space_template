import React, { useState } from 'react'
import BoardObject from './BoardObject'
import Hint from '../Hint'
import { Mouse } from 'lucide-react'
import { boardRectangles } from '@/utils/mcDatabase/boardObjects'
import { Camera } from '@/interfaces/board'

export interface BoardObjectsProps {
    currentCameraPosition:Camera
}

const Board = ({currentCameraPosition}:BoardObjectsProps) => {
    const [spawn, setSpawn] = useState(false)
  return (
    <>
        {/* Object 1 */}
      <BoardObject
        position={{x:0, y:-100}}
        cameraPosition={currentCameraPosition}
      >
        <Hint
          text='Press space "⎵" to start panning'
          textClassName="text-[#543310]"
        />
      </BoardObject>

      {/* Object 2 */}
      <BoardObject
        position={{x:0, y:0}}
        cameraPosition={currentCameraPosition}
      >
        <Hint>
          <p className='text-[#543310]' >Use your mouse wheel</p>
          <Mouse color='#543310'/>
          <p className='text-[#543310]' >to zoom in and out</p>
        </Hint>
      </BoardObject>

      {/* Object 3 */}
      <BoardObject
        position={{x:0, y:100}}
        cameraPosition={currentCameraPosition}
      >
        <div
          className='flex animate-slideUpAndFade flex-col gap-[10px] items-center justify-center p-[10px] min-w-[300px] rounded-md drop-shadow-md bg-white'
        >
          <p className='text-[#543310]'>Spawn some Rectangles!</p>
          <button
            className='px-[20px] py-[6px] rounded-lg bg-[#AF8F6F] text-[#F8F4E1] hover:bg-gray-300'
            onClick={() => setSpawn(!spawn)}
          >
            {spawn?"Hide":"Spawn"}
          </button>
        </div>
      </BoardObject>

      {/* Spawn Objects */}
      {spawn && boardRectangles.map(rectangle => {
        return (
          <>
            <BoardObject
              position={rectangle.position}
              cameraPosition={currentCameraPosition}
            >
              <div
                className={`w-[${rectangle.dimensions.width}px] h-[${rectangle.dimensions.height}px] bg-white border-[1px] border-[#AF8F6F] p-[6px] rounded-lg animate-slideUpAndFade`}
              >
                <p>{rectangle.content}</p>
              </div>
            </BoardObject>
          </>
        )
      })}
    </>
  )
}

export default Board