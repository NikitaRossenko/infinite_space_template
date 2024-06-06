export interface BoardObjectProps {
  position:{x:number, y:number},
  children?:React.ReactNode,
  cameraPosition:{x:number, y:number, zoom:number}
}

export interface HintProps{
  text?:string,
  textClassName?:string,
  children?:React.ReactNode,
}

export interface CustomTooltipProps {
  children:React.ReactNode,
  content:string | React.ReactNode,
  side?: "left" | "right" | "top" | "bottom"
}
