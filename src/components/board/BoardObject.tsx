import { BoardObjectProps } from '@/interfaces/props'
import React from 'react'

const BoardObject = ({position, cameraPosition, children}:BoardObjectProps) => {
  return (
    <div
      className="absolute"
      style={{
      transform:`
        translate(${cameraPosition.x + position.x}px, ${cameraPosition.y - position.y}px)
        scale(${cameraPosition.zoom})
      `
      }}
    >
      {children}
    </div>
  )
}

export default BoardObject