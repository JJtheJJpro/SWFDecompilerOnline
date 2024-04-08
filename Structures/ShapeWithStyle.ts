import EndShapeRecord from "../Records/EndShapeRecord";
import FillStyleArray from "./FillStyleArray";
import IShapeRecord from "../Records/IShapeRecord";
import LineStyleArray from "./LineStyleArray";
import ShapeRecord from "../Records/ShapeRecord";
import SWFBitReader from "../SWFBitReader";

export default class ShapeWithStyle {
    private constructor(fillStyles: FillStyleArray, lineStyles: LineStyleArray, records: IShapeRecord[]) {
        this.FillStyles = fillStyles
        this.LineStyles = lineStyles
        this.ShapeRecords = records
    }

    public FillStyles: FillStyleArray
    public LineStyles: LineStyleArray
    public ShapeRecords: IShapeRecord[]

    public static ReadData(br: SWFBitReader): ShapeWithStyle {
        let retFillStyles = FillStyleArray.ReadData(br)
        let retLineStyles = LineStyleArray.ReadData(br)
        let retNumFillBits = br.ReadNBitUnsignedValue(4)
        let retNumLineBits = br.ReadNBitUnsignedValue(4)
        let retShapeRecords: IShapeRecord[] = []
        //let read = ShapeRecord.ParseWithStyle(br, retFillStyles, retLineStyles, retNumFillBits, retNumLineBits, true)
        //retShapeRecords.push(read)
        while (true) {
            let read = ShapeRecord.ParseWithStyle(br, retFillStyles, retLineStyles, retNumFillBits, retNumLineBits, true)
            retShapeRecords.push(read)
            if (read instanceof EndShapeRecord) {
                break
            }
        }
        return new ShapeWithStyle(retFillStyles, retLineStyles, retShapeRecords)
    }
}