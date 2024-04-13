import EndShapeRecord from "../Records/EndShapeRecord";
import IShapeRecord from "../Records/IShapeRecord";
import ShapeRecord from "../Records/ShapeRecord";
import SWFBitReader from "../SWFBitReader";

export default class Shape {
    private constructor(records: IShapeRecord[]) {
        this.ShapeRecords = records
    }

    public ShapeRecords: IShapeRecord[]

    public static ReadData(br: SWFBitReader): Shape {
        let retNumFillBits = br.ReadNBitUnsignedValue(4)
        let retNumLineBits = br.ReadNBitUnsignedValue(4)
        let refNumBits = { fill: retNumFillBits, line: retNumLineBits }
        let retShapeRecords: IShapeRecord[] = []
        //let read = ShapeRecord.Parse(br, refNumBits)
        //retShapeRecords.push(read)
        while (true) {
            let read = ShapeRecord.Parse(br, refNumBits)
            retShapeRecords.push(read)
            if (read instanceof EndShapeRecord) {
                break
            }
        }
        return new Shape(retShapeRecords)
    }
}