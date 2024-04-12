import ClipActions from "../Records/ClipActions";
import CXFormWithAlpha from "../Records/CXFormWithAlpha";
import ITag from "./ITag";
import Matrix from "../Records/Matrix";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class PlaceObject2Tag implements ITag {
    private readonly _size: number
    private readonly _data: Buffer

    private constructor(data: Buffer, size: number, PlaceFlags: boolean[], depth: number) {
        this._data = data
        this._size = size
        this.PlaceFlagHasClipActions = PlaceFlags[0]
        this.PlaceFlagHasClipDepth = PlaceFlags[1]
        this.PlaceFlagHasName = PlaceFlags[2]
        this.PlaceFlagHasRatio = PlaceFlags[3]
        this.PlaceFlagHasColorTransform = PlaceFlags[4]
        this.PlaceFlagHasMatrix = PlaceFlags[5]
        this.PlaceFlagHasCharacter = PlaceFlags[6]
        this.PlaceFlagMove = PlaceFlags[7]
        this.Depth = depth
    }

    get TagCode(): SWFTags {
        return SWFTags.PlaceObject2
    }
    get Size(): number {
        return this._size
    }
    get Data(): Buffer {
        return this._data
    }
    
    public PlaceFlagHasClipActions: boolean
    public PlaceFlagHasClipDepth: boolean
    public PlaceFlagHasName: boolean
    public PlaceFlagHasRatio: boolean
    public PlaceFlagHasColorTransform: boolean
    public PlaceFlagHasMatrix: boolean
    public PlaceFlagHasCharacter: boolean
    public PlaceFlagMove: boolean
    public Depth: number

    public CharacterId?: number
    public Matrix?: Matrix
    public ColorTransform?: CXFormWithAlpha
    public Ratio?: number
    public Name?: string
    public ClipDepth?: number
    public ClipActions?: ClipActions

    public static ReadData(br: SWFBitReader): PlaceObject2Tag {
        let toParse = br.ReadUInt16()
        let size = toParse & 0x3F
        if (size == 0x3F) {
            size = br.ReadUInt32()
        }

        let data = br.PeekBytes(size)
        
        let flags = br.ReadBits(8)
        let retDepth = br.ReadUInt16()
        let ret = new PlaceObject2Tag(Buffer.from(data), size, flags, retDepth)

        if (flags[6]) {
            ret.CharacterId = br.ReadUInt16()
        }
        if (flags[5]) {
            ret.Matrix = Matrix.ReadData(br)
        }
        if (flags[4]) {
            ret.ColorTransform = CXFormWithAlpha.ReadData(br)
        }
        if (flags[3]) {
            ret.Ratio = br.ReadUInt16()
        }
        if (flags[2]) {
            ret.Name = br.Read8BitString()
        }
        if (flags[1]) {
            ret.ClipDepth = br.ReadUInt16()
        }
        if (flags[0]) {
            ret.ClipActions = ClipActions.ReadData(br)
        }
        return ret
    }
}