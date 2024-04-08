import FillStyle from "./FillStyle";
import SWFBitReader from "../SWFBitReader";

export default class FillStyleArray {
    private constructor(count: number, fillStyles: FillStyle[]) {
        this.FillStyleCount = count
        this.FillStyles = fillStyles
    }

    public FillStyleCount: number
    public FillStyles: FillStyle[]
    
    public static ReadData(br: SWFBitReader): FillStyleArray {
        br.AlignToNextByte()

        let retFillStyleCount = br.ReadByte()
        if (retFillStyleCount == 0xFF) {
            retFillStyleCount = br.ReadUInt16()
        }
        let retFillStyles = new Array<FillStyle>(retFillStyleCount)
        for (let i = 0; i < retFillStyleCount; i++) {
            retFillStyles[i] = FillStyle.ReadData(br)
        }
        return new FillStyleArray(retFillStyleCount, retFillStyles)
    }
}