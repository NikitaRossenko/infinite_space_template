import React, { useState } from 'react'
import BoardObject from './BoardObject'
import Hint from '../Hint'
import { Mouse } from 'lucide-react'
import { boardRectangles } from '@/utils/mcDatabase/boardObjects'
import { BoardObjectsProps } from '@/interfaces/board'

const Board = ({currentCameraPosition}:BoardObjectsProps) => {
    const [spawn, setSpawn] = useState(false)
  return (
    <>
      {/* Title */}
      <BoardObject
        position={{x:-180, y:296}}
        cameraPosition={currentCameraPosition}
      >
        <h1 className='text-[40px] font-medium text-[#543310] drop-shadow-md'>Infinity Space Board</h1>
      </BoardObject>

      {/*Temp Center Indicator Object */}
      <BoardObject
        position={{x:-5, y:5}}
        cameraPosition={currentCameraPosition}
      >
        <div className='w-[10px] h-[10px] bg-red-700 rounded-full'></div>
      </BoardObject>

      {/* Object 1 */}
      <BoardObject
        position={{x:-120, y:98}}
        cameraPosition={currentCameraPosition}
      >
        <Hint
          text='Press space "⎵" to start panning'
          textClassName="text-[#543310]"
        />
      </BoardObject>

      {/* Hint Object */}
      <BoardObject
        position={{x:256, y:98}}
        cameraPosition={currentCameraPosition}
      >
        <Hint
          text="What's there ->"
          textClassName="text-[#543310]"
        />
      </BoardObject>

      {/* Object 2 */}
      <BoardObject
        position={{x:-170, y:-2}}
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
        position={{x:-82, y:-104}}
        cameraPosition={currentCameraPosition}
      >
        <div
          className='flex animate-slideUpAndFade flex-col gap-[10px] items-center justify-center p-[10px] rounded-md drop-shadow-md bg-white'
        >
          <p className='text-[#543310]'>Spawn some objects!</p>
          <button
            className='px-[20px] py-[6px] rounded-lg bg-[#AF8F6F] text-[#F8F4E1] hover:bg-gray-300'
            onClick={() => setSpawn(!spawn)}
          >
            {spawn?"Hide":"Spawn"}
          </button>
        </div>
      </BoardObject>

      {/* Reveal when x > 300 */}
      {((window.innerWidth/2 - currentCameraPosition.x) / currentCameraPosition.zoom >= 300) &&
        <BoardObject
          position={{x:500, y:98}}
          cameraPosition={currentCameraPosition}
        >
          <div
            className='flex animate-slideUpAndFade flex-col gap-[10px] items-center justify-center p-[10px] rounded-md drop-shadow-md bg-white'
          >
            <p className='text-[#543310]'>Puff! 🎉🎉</p>
          </div>
        </BoardObject>
      }

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