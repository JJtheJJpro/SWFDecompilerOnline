import ITag from "./ITag";
import Rect from "../Records/Rect";
import ShapeWithStyle from "../Structures/ShapeWithStyle";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class DefineShape3Tag implements ITag {
    private constructor(data: Buffer, size: number, shapeid: number, bounds: Rect, shapes: ShapeWithStyle) {
        this._data = data
        this._size = size
        this.ShapeId = shapeid
        this.ShapeBounds = bounds
        this.Shapes = shapes
    }
    private _data: Buffer
    private _size: number

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
    public Shapes: ShapeWithStyle
    
    public static ReadData(br: SWFBitReader): DefineShape3Tag {
        let toParse = br.ReadUInt16()
        let size = toParse & 0x3F
        if (size == 0x3F) {
            size = br.ReadUInt32()
        }

        let data = br.PeekBytes(size)

        let retShapeId = br.ReadUInt16()
        let retShapeBounds = Rect.ReadData(br)
        let retShapes = ShapeWithStyle.ReadData(br)
        return new DefineShape3Tag(Buffer.from(data), size, retShapeId, retShapeBounds, retShapes)
    }
}