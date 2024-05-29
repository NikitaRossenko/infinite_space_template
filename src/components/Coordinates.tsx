import React from 'react'

interface CoordinatesProps {
    x:number
    y:number
    zoom:number
}

const Coordinates = ({x,y,zoom}:CoordinatesProps) => {
  return (
    <div
        className='absolute left-2 top-2 p-[10px] min-w-[100px] rounded-md drop-shadow-md bg-white text-black'
      >
        <p>
          X: {x - window.innerWidth/2}
        </p>
        <p>
          Y: {y - window.innerHeight/2}
        </p>
        <p>
          Zoom: {zoom}
        </p>
      </div>
  )
}

export default Coordinates