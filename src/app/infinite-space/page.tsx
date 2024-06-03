"use client"
import Coordinates from '@/components/Coordinates'
import Hint from '@/components/Hint'
import Seperator from '@/components/Seperator'
import { Camera, CanvasMode, Point } from '@/interfaces/interfaces'
import React, { useCallback, useState, useEffect } from 'react'


const initialCamera = {
  x:window.innerWidth / 2,
  y:window.innerHeight / 2,
  zoom:1,
}

const InfiniteSpace = () => {
  const [isPanning, setIsPanning] = useState(false)
  const [isSpace, setIsSpace] = useState(false)
  const [startPan, setStartPan] = useState({x:0, y:0})
  const [currentCameraPosition, setCurrentCameraPosition] = useState<Camera>(initialCamera)
  const [canvasMode, setCanvasMode] = useState<CanvasMode>(CanvasMode.NONE)
  const [grid, setGrid] = useState(false)

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
    newZoom = Math.min(10, newZoom); // maximum zoom level

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
      setCanvasMode(CanvasMode.PANNING)
      setStartPan({x: e.clientX, y: e.clientY})
    }
  }, [isSpace, setCanvasMode])

  const onKeyDown = useCallback((e:React.KeyboardEvent) => {
    if (e.code == "Space"){
      setIsSpace(true)
    }
  }, [])

  const onMouseMove = useCallback((e:React.MouseEvent) => {
    const point:Point = {x: e.clientX, y: e.clientY}
    setStartPan(point)
    if (canvasMode === CanvasMode.PANNING) {
      setCurrentCameraPosition((camera:Camera) => ({
        ...camera,
        x: camera.x + ((e.clientX - startPan.x)/currentCameraPosition.zoom),
        y: camera.y + ((e.clientY - startPan.y)/currentCameraPosition.zoom),
      }))
      setStartPan(point)
    }
  }, [startPan, canvasMode, setCurrentCameraPosition, currentCameraPosition])

  const onMouseUp = useCallback(() => {
    setIsPanning(false)
    setCanvasMode(CanvasMode.NONE)
  }, [setCanvasMode])

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
      <Hint
        position={{x:currentCameraPosition.x-150, y:currentCameraPosition.y}}
        zoom={currentCameraPosition.zoom}
        text="Press space to start panning"
      />
      <Hint
        position={{x:currentCameraPosition.x-350, y:currentCameraPosition.y+200}}
        zoom={currentCameraPosition.zoom}
        text="Use your mouse wheel to zoom in and out"
      />
      <div
        className='absolute flex flex-col items-start justify-center top-[200px] left-2 p-[10px] rounded-md drop-shadow-md bg-white gap-4'
      >
        <button
          className='flex bg-white hover:bg-orange-300 p-1 rounded-md'
          onClick={() => setCurrentCameraPosition(initialCamera)}
        >
            Reset Camera
        </button>
        <Seperator />
        <button
          className='flex w-full items-center gap-2 bg-white hover:bg-orange-300 p-1 rounded-md'
          onClick={() => setGrid(!grid)}
        >
          <input
            type='checkbox'
            placeholder='Grid'
            checked={grid}
          />
          <p>Grid</p>
        </button>
      </div>
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
          {grid &&
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