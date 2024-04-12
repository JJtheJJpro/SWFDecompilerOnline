import ITag from "./ITag";
import Rect from "../Records/Rect";
import ShapeWithStyle from "../Structures/ShapeWithStyle";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class DefineShape4Tag implements ITag {
    private constructor(data: Buffer, size: number, shapeid: number, bounds: Rect, edgeBounds: Rect, winding: boolean, nonScaling: boolean, scaling: boolean, shapes: ShapeWithStyle) {
        this._data = data
        this._size = size
        this.ShapeId = shapeid
        this.ShapeBounds = bounds
        this.EdgeBounds = edgeBounds
        this.UsesFillWindingRule = winding
        this.UsesNonScalingStrokes = nonScaling
        this.UsesScalingStrokes = scaling
        this.Shapes = shapes
    }
    private readonly _data: Buffer
    private readonly _size: number

    get TagCode(): SWFTags {
        return SWFTags.DefineShape3
    }
    get Size(): number {
        return this._size
    }
    get Data(): Buffer {
        return this._data
    }
    
    public ShapeId: number
    public ShapeBounds: Rect
    public EdgeBounds: Rect
    public UsesFillWindingRule: boolean
    public UsesNonScalingStrokes: boolean
    public UsesScalingStrokes: boolean
    public Shapes: ShapeWithStyle
    
    public static ReadData(br: SWFBitReader): DefineShape4Tag {
        let toParse = br.ReadUInt16()
        let size = toParse & 0x3F
        if (size == 0x3F) {
            size = br.ReadUInt32()
        }

        let data = br.PeekBytes(size)

        let retShapeId = br.ReadUInt16()
        let retShapeBounds = Rect.ReadData(br)
        let retEdgeBounds = Rect.ReadData(br)
        br.CheckReservedBlock(5)
        let retWinding = br.ReadBit()
        let retNonScaling = br.ReadBit()
        let retScaling = br.ReadBit()
        let retShapes = ShapeWithStyle.ReadData(br)
        return new DefineShape4Tag(Buffer.from(data), size, retShapeId, retShapeBounds, retEdgeBounds, retWinding, retNonScaling, retScaling, retShapes)
    }
}