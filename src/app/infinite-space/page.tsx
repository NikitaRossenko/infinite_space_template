"use client"
import Coordinates from '@/components/board/Coordinates'
import React, { useCallback, useState, useEffect } from 'react'
import { initialCamera } from '@/constants/globalConstants'
import { BoardMode, Camera, Point } from '@/interfaces/board'
import ToolBar from '@/components/toolbar/ToolBar'
import Board from '@/components/board/Board'


const InfiniteSpace = () => {
  const [isPanning, setIsPanning] = useState(false)
  const [isSpace, setIsSpace] = useState(false)
  const [startPan, setStartPan] = useState({x:0, y:0})
  const [currentCameraPosition, setCurrentCameraPosition] = useState<Camera>(initialCamera)
  const [boardMode, setBoardMode] = useState<BoardMode>(BoardMode.NONE)
  const [grid, setGrid] = useState(true)

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
        x: camera.x + ((e.clientX - startPan.x)),
        y: camera.y + ((e.clientY - startPan.y)),
      }))
      setStartPan(point)
    }
  }, [startPan, boardMode, setCurrentCameraPosition])

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
      <ToolBar
        grid={grid}
        setGrid={() => setGrid(!grid)}
        setCurrentCameraPosition={() => setCurrentCameraPosition(initialCamera)}
      />
      <Board
        currentCameraPosition={currentCameraPosition}
      />
      <svg
        className={`${isPanning? "cursor-grabbing":""} ${isSpace?"cursor-grab":""} h-[100vh] w-[100vw] bg-slate-100 overflow-hidden`}
        onWheel={onWheel}
        onPointerDown={onMouseDown}
        onMouseMove={onMouseMove}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        {/* Grid Pattern */}
        <defs>
          <pattern
            id="grid"
            width={25}
            height={25}
            patternUnits="userSpaceOnUse"
            patternTransform={
              `
              translate(${currentCameraPosition.x }, ${currentCameraPosition.y})
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
          {/* Display the grid */}
          {(grid && currentCameraPosition.zoom > 0.5) &&
            <rect
              width={window.innerWidth}
              height={window.innerHeight}
              fill="url(#grid)"
              transform={`scale(${1/currentCameraPosition.zoom}) translate(${-currentCameraPosition.x}, ${-currentCameraPosition.y})`}
            />
          }

          <circle cx={0} cy={0} r={5} fill="rgba(0,0,0,1)"/>
        </g>
      </svg>
    </>
  )
}

export default InfiniteSpace