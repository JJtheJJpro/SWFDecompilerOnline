import Color from "./IColor";
import InvalidSWFError from "../InvalidSWFError";
import RGB from "./RGB";
import RGBA from "./RGBA";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "../Tags/SWFTags";

export default class GradRecord {
    private constructor(ratio: number, color: Color) {
        this.Ratio = ratio
        this.Color = color
    }

    public Ratio: number
    public Color: Color

    public static ReadData(br: SWFBitReader): GradRecord {
        let retRatio = br.ReadByte()
        let retColor: Color
        switch (br.currenttag) {
            case SWFTags.DefineShape:
            case SWFTags.DefineShape2:
                retColor = RGB.ReadData(br)
                break
            case SWFTags.DefineShape3:
            case SWFTags.DefineShape4:
                retColor = RGBA.ReadData(br)
                break
            default:
                throw new InvalidSWFError()
        }
        return new GradRecord(retRatio, retColor)
    }
}