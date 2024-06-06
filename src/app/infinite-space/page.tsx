"use client"
import Coordinates from '@/components/board/Coordinates'
import { Mouse } from 'lucide-react'
import React, { useCallback, useState, useEffect } from 'react'
import Hint from '@/components/Hint'
import { initialCamera } from '@/constants/globalConstants'
import { BoardMode, Camera, Point } from '@/interfaces/board'
import ToolBar from '@/components/toolbar/ToolBar'
import BoardObject from '@/components/board/BoardObject'
import { boardRectangles } from '@/utils/mcDatabase/boardObjects'


const InfiniteSpace = () => {
  const [isPanning, setIsPanning] = useState(false)
  const [isSpace, setIsSpace] = useState(false)
  const [startPan, setStartPan] = useState({x:0, y:0})
  const [currentCameraPosition, setCurrentCameraPosition] = useState<Camera>(initialCamera)
  const [boardMode, setBoardMode] = useState<BoardMode>(BoardMode.NONE)
  const [grid, setGrid] = useState(true)
  const [spawn, setSpawn] = useState(false)

  const onWheel = useCallback((e:React.WheelEvent) => {
    const zoomFactor = -e.deltaY * 0.001;
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left; //x position within the element.
    const y = e.clientY - rect.top;  //y position within the element.

    // Convert local coordinates to global coordinates
    const globalX = x + currentCameraPosition.x;
    const globalY = y + currentCameraPosition.y;

    let newZoom = currentCameraPosition.zoom + zoomFactor;
    newZoom = Math.max(0.1, newZoom); // minimum zoom level
    newZoom = Math.min(5, newZoom); // maximum zoom level

    const newX = globalX + (currentCameraPosition.x - globalX) * (newZoom / currentCameraPosition.zoom);
    const newY = globalY + (currentCameraPosition.y - globalY) * (newZoom / currentCameraPosition.zoom);

    setCurrentCameraPosition({
      x: newX,
      y: newY,
      zoom: newZoom,
    });

  }, [setCurrentCameraPosition, currentCameraPosition])

  const onMouseDown = useCallback((e:React.MouseEvent) => {
    if (isSpace){
      setIsPanning(true)
      setBoardMode(BoardMode.PANNING)
      setStartPan({x: e.clientX, y: e.clientY})
    }
  }, [isSpace, setBoardMode])

  const onKeyDown = useCallback((e:React.KeyboardEvent) => {
    if (e.code == "Space"){
      setIsSpace(true)
    }
  }, [])

  const onMouseMove = useCallback((e:React.MouseEvent) => {
    const point:Point = {x: e.clientX, y: e.clientY}
    setStartPan(point)
    if (boardMode === BoardMode.PANNING) {
      setCurrentCameraPosition((camera:Camera) => ({
        ...camera,
        x: camera.x + ((e.clientX - startPan.x)/currentCameraPosition.zoom),
        y: camera.y + ((e.clientY - startPan.y)/currentCameraPosition.zoom),
      }))
      setStartPan(point)
    }
  }, [startPan, boardMode, setCurrentCameraPosition, currentCameraPosition])

  const onMouseUp = useCallback(() => {
    setIsPanning(false)
    setBoardMode(BoardMode.NONE)
  }, [setBoardMode])

  const onKeyUp = useCallback(() => {
    setIsSpace(false)
  }, [])

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp)
    
    return () => {
        window.removeEventListener('mouseup', onMouseUp)
    }
  }, [onMouseUp])
  
  useEffect(() => {
      window.addEventListener('keyup', onKeyUp)
      return () => {
          window.removeEventListener('keyup', onKeyUp)
      }
  }, [onKeyUp])



  return (
    <>
      <Coordinates
        x={currentCameraPosition.x}
        y={currentCameraPosition.y}
        zoom={currentCameraPosition.zoom}
      />
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
      <ToolBar
        grid={grid}
        setGrid={() => setGrid(!grid)}
        setCurrentCameraPosition={() => setCurrentCameraPosition(initialCamera)}
      />
      <svg
        className={`${isPanning? "cursor-grabbing":""} ${isSpace?"cursor-grab":""} h-[100vh] w-[100vw] bg-slate-100 overflow-hidden`}
        onWheel={onWheel}
        onPointerDown={onMouseDown}
        onMouseMove={onMouseMove}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <defs>
          <pattern
            id="grid"
            width={25}
            height={25}
            patternUnits="userSpaceOnUse"
            patternTransform={
              `
              translate(${currentCameraPosition.x * currentCameraPosition.zoom}, ${currentCameraPosition.y * currentCameraPosition.zoom})
              scale(${currentCameraPosition.zoom})
              `
            }
          >
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <g
          transform={`translate(${currentCameraPosition.x}, ${currentCameraPosition.y}) scale(${currentCameraPosition.zoom})`}
        >
          {(grid && currentCameraPosition.zoom > 0.5) &&
            <rect
              width={window.innerWidth}
              height={window.innerHeight}
              fill="url(#grid)"
              transform={`scale(${1/currentCameraPosition.zoom}) translate(${-currentCameraPosition.x}, ${-currentCameraPosition.y})`}
            />
          }
        </g>
      </svg>
    </>
  )
}

export default InfiniteSpace