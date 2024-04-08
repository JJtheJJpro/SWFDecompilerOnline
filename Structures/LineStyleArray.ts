import ILineStyle from "./ILineStyle";
import LineStyle from "./LineStyle";
import LineStyle2 from "./LineStyle2";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "../Tags/SWFTags";

export default class LineStyleArray {
    private constructor(count: number, lineStyles: ILineStyle[]) {
        this.LineStyleCount = count
        this.LineStyles = lineStyles
    }

    public LineStyleCount: number
    public LineStyles: ILineStyle[]

    public static ReadData(br: SWFBitReader): LineStyleArray {
        let retLineStyleCount = br.ReadByte()
        if (retLineStyleCount == 0xFF) {
            retLineStyleCount = br.ReadUInt16()
        }
        let retLineStyles: ILineStyle[] = br.currenttag == SWFTags.DefineShape4 ? new Array<LineStyle2>(retLineStyleCount) : new Array<LineStyle>(retLineStyleCount);
        for (let i = 0; i < retLineStyleCount; i++) {
            retLineStyles[i] = br.currenttag == SWFTags.DefineShape4 ? LineStyle2.ReadData(br) : LineStyle.ReadData(br)
        }

        return new LineStyleArray(retLineStyleCount, retLineStyles)
    }
}