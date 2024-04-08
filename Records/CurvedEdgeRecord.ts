import InvalidSWFError from "../InvalidSWFError";
import IShapeRecord from "./IShapeRecord";
import SWFBitReader from "../SWFBitReader";

export default class CurvedEdgeRecord implements IShapeRecord {
    private constructor(nbits: number, controlX: number, controlY: number, anchorX: number, anchorY: number) {
        this.NumBits = nbits
        this.ControlDeltaX = controlX
        this.ControlDeltaY = controlY
        this.AnchorDeltaX = anchorX
        this.AnchorDeltaY = anchorY
    }

    get TypeFlag(): boolean {
        return true
    }
    get StraightFlag(): boolean {
        return false
    }

    public NumBits: number

    public ControlDeltaX: number
    public ControlDeltaY: number
    public AnchorDeltaX: number
    public AnchorDeltaY: number

    public static ReadData(br: SWFBitReader): CurvedEdgeRecord {
        if (!br.ReadBit() || br.ReadBit()) {
            throw new InvalidSWFError()
        }

        let retNumBits = br.ReadNBitUnsignedValue(4)
        let retControlDeltaX = br.ReadNBitSignedValue(retNumBits + 2)
        let retControlDeltaY = br.ReadNBitSignedValue(retNumBits + 2)
        let retAnchorDeltaX = br.ReadNBitSignedValue(retNumBits + 2)
        let retAnchorDeltaY = br.ReadNBitSignedValue(retNumBits + 2)

        return new CurvedEdgeRecord(retNumBits, retControlDeltaX, retControlDeltaY, retAnchorDeltaX, retAnchorDeltaY)
    }
}