import InvalidSWFError from "../InvalidSWFError";
import IShapeRecord from "./IShapeRecord";
import SWFBitReader from "../SWFBitReader";

export default class StraightEdgeRecord implements IShapeRecord {
    private constructor(nbits: number, GeneralLineFlag: boolean) {
        this.NumBits = nbits
        this.GeneralLineFlag = GeneralLineFlag
    }

    get TypeFlag(): boolean {
        return true
    }
    get StraightFlag(): boolean {
        return true
    }

    public NumBits: number
    public GeneralLineFlag: boolean

    public VertLineFlag?: boolean
    public DeltaX?: number
    public DeltaY?: number

    public static ReadData(br: SWFBitReader): StraightEdgeRecord {
        if (!br.ReadBit() || !br.ReadBit()) {
            throw new InvalidSWFError()
        }

        let retNumBits = br.ReadNBitUnsignedValue(4)
        let retGeneralLineFlag = br.ReadBit()
        let ret = new StraightEdgeRecord(retNumBits, retGeneralLineFlag)
        if (!retGeneralLineFlag) {
            ret.VertLineFlag = br.ReadBit()
        }
        else {
            ret.DeltaX = br.ReadNBitSignedValue(retNumBits + 2)
            ret.DeltaY = br.ReadNBitSignedValue(retNumBits + 2)
        }
        if (ret.VertLineFlag != undefined) {
            if (ret.VertLineFlag) {
                ret.DeltaY = br.ReadNBitSignedValue(retNumBits + 2)
            }
            else {
                ret.DeltaX = br.ReadNBitSignedValue(retNumBits + 2)
            }
        }

        return ret
    }
}