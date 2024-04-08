import IColor from "./IColor";
import SWFBitReader from "../SWFBitReader";

export default class ARGB implements IColor {
    private constructor(a: number, r: number, g: number, b: number) {
        this.Alpha = a
        this.Red = r
        this.Green = g
        this.Blue = b
    }
    
    public Alpha: number
    public Red: number
    public Green: number
    public Blue: number
    
    public static ReadData(br: SWFBitReader): ARGB {
        let a = br.ReadByte()
        let r = br.ReadByte()
        let g = br.ReadByte()
        let b = br.ReadByte()
        return new ARGB(a, r, g, b)
    }
}