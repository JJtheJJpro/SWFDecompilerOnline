import ITag from "./ITag";
import Shape from "../Structures/Shape";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class DefineFontTag implements ITag {
    private _data: Buffer
    private _size: number

    private constructor(data: Buffer, size: number, fontID: number, offsetTable: number[], shapeTable: Shape[]) {
        this._data = data
        this._size = size
        this.FontID = fontID
        this.OffsetTable = offsetTable
        this.GlyphShapeTable = shapeTable
    }

    get TagCode(): SWFTags {
        return SWFTags.DefineFont
    }
    get Size(): number {
        return this._size
    }
    get Data(): Buffer {
        return this._data
    }

    public FontID: number
    public OffsetTable: number[]
    public GlyphShapeTable: Shape[]

    public static ReadData(br: SWFBitReader): { ret: DefineFontTag, nGlyphs: number } {
        let toParse = br.ReadUInt16()
        let length = toParse & 0x3F
        if (length == 0x3F) {
            length = br.ReadUInt32()
        }

        let data = br.PeekBytes(length)

        let retFontID = br.ReadUInt16()
        
        let nGlyphs = br.PeekUInt16() / 2
        let retOffsetTable = new Array<number>(nGlyphs)
        for (let i = 0; i < nGlyphs; i++) {
            retOffsetTable[i] = br.ReadUInt16()
        }
        let retShapeTable = new Array<Shape>(nGlyphs)
        for (let i = 0; i < nGlyphs; i++) {
            retShapeTable[i] = Shape.ReadData(br)
        }
        return { ret: new DefineFontTag(Buffer.from(data), length, retFontID, retOffsetTable, retShapeTable), nGlyphs: nGlyphs }
    }
}