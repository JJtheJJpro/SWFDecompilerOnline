import IColor from "./IColor";
import ILineStyle from "./ILineStyle";
import InvalidSWFError from "../InvalidSWFError";
import RGB from "./RGB";
import RGBA from "./RGBA";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "../Tags/SWFTags";

export default class LineStyle implements ILineStyle {
    private constructor(width: number, color: IColor) {
        this.Width = width
        this.Color = color
    }

    public Width: number
    public Color: IColor

    public static ReadData(br: SWFBitReader): LineStyle {
        let retWidth = br.ReadUInt16()
        let retColor: IColor
        if (br.currenttag == SWFTags.DefineShape || br.currenttag == SWFTags.DefineShape2) {
            retColor = RGB.ReadData(br)
        }
        else if (br.currenttag == SWFTags.DefineShape3 || br.currenttag == SWFTags.DefineShape4) {
            retColor = RGBA.ReadData(br)
        }
        else {
            throw new InvalidSWFError()
        }
        return new LineStyle(retWidth, retColor)
    }
}