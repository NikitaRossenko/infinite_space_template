export const enum BoardMode {
    NONE="none",
    PANNING="panning",
    RESIZING="resizing",
    TRANSLATING="translating"
  }
  
  export interface Camera {
    x:number,
    y:number,
    zoom:number,
  }
  
  export type Point = {
    x:number
    y:number
  }