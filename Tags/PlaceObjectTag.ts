import CXForm from "../Records/CXForm";
import ITag from "./ITag";
import Matrix from "../Records/Matrix";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class PlaceObjectTag implements ITag {
    private readonly _data: Buffer
    private readonly _size: number

    private constructor(data: Buffer, size: number, charId: number, depth: number, matrix: Matrix, colorTrans: CXForm) {
        this._data = data
        this._size = size
        this.CharacterId = charId
        this.Depth = depth
        this.Matrix = matrix
        this.ColorTransform = colorTrans
    }

    get TagCode(): SWFTags {
        return SWFTags.PlaceObject
    }
    get Size(): number {
        return this._size
    }
    get Data(): Buffer {
        return this._data
    }

    public CharacterId: number
    public Depth: number
    public Matrix: Matrix
    public ColorTransform: CXForm

    public static ReadData(br: SWFBitReader): PlaceObjectTag {
        let toParse = br.ReadUInt16()
        let size = toParse & 0x3F
        if (size == 0x3F) {
            size = br.ReadUInt32()
        }

        let data = br.PeekBytes(size)

        let retCharacterId = br.ReadUInt16();
        let retDepth = br.ReadUInt16();
        let retMatrix = Matrix.ReadData(br);
        let retColorTransform = CXForm.ReadData(br);

        return new PlaceObjectTag(Buffer.from(data), size, retCharacterId, retDepth, retMatrix, retColorTransform)
    }
}