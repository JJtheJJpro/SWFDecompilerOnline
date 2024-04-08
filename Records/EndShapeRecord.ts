import InvalidSWFError from "../InvalidSWFError";
import IShapeRecord from "./IShapeRecord";
import SWFBitReader from "../SWFBitReader";

export default class EndShapeRecord implements IShapeRecord {
    private constructor() { }

    get TypeFlag(): boolean {
        return false
    }

    public static ReadData(br: SWFBitReader): EndShapeRecord {
        if (br.ReadBit() || br.ReadBits(5).some(x => x)) {
            throw new InvalidSWFError()
        }
        br.AlignToNextByte()
        return new EndShapeRecord()
    }
}