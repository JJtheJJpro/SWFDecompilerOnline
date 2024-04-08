import IColor from "./IColor";
import SWFBitReader from "../SWFBitReader";

export default class RGBA implements IColor {
    private constructor(r: number, g: number, b: number, a: number) {
        this.Red = r
        this.Green = g
        this.Blue = b
        this.Alpha = a
    }

    public Red: number
    public Green: number
    public Blue: number
    public Alpha: number
    
    public static ReadData(br: SWFBitReader): RGBA {
        let r = br.ReadByte()
        let g = br.ReadByte()
        let b = br.ReadByte()
        let a = br.ReadByte()
        return new RGBA(r, g, b, a)
    }
}