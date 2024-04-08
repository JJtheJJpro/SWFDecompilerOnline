import IColor from "./IColor";
import SWFBitReader from "../SWFBitReader";

export default class RGB implements IColor {
    private constructor(r: number, g: number, b: number) {
        this.Red = r
        this.Green = g
        this.Blue = b
    }

    public Red: number
    public Green: number
    public Blue: number
    
    public static ReadData(br: SWFBitReader): RGB {
        let r = br.ReadByte()
        let g = br.ReadByte()
        let b = br.ReadByte()
        return new RGB(r, g, b)
    }
}