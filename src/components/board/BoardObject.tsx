import { BoardObjectProps } from '@/interfaces/props'
import React from 'react'

const BoardObject = ({position, cameraPosition, children}:BoardObjectProps) => {
  return (
    <div
      className="absolute"
      style={{
      transform:`
        translate(${(cameraPosition.x + position.x)*cameraPosition.zoom}px, ${(cameraPosition.y + position.y)*cameraPosition.zoom}px)
        scale(${cameraPosition.zoom})
      `
      }}
    >
      {children}
    </div>
  )
}

export default BoardObject