import ITag from "./ITag";
import Matrix from "../Records/Matrix";
import Rect from "../Records/Rect";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";
import TextRecord from "../Records/TextRecord";

export default class DefineTextTag implements ITag {
    private _data: Buffer
    private _size: number

    private constructor(data: Buffer, size: number, charID: number, textBounds: Rect, textMatrix: Matrix, glyphBits: number, advanceBits: number, textRecords: TextRecord[]) {
        this._data = data
        this._size = size
        this.CharacterID = charID
        this.TextBounds = textBounds
        this.TextMatrix = textMatrix
        this.GlyphBits = glyphBits
        this.AdvanceBits = advanceBits
        this.TextRecords = textRecords
    }

    get TagCode(): SWFTags {
        return SWFTags.DefineText
    }
    get Size(): number {
        return this._size
    }
    get Data(): Buffer {
        return this._data
    }

    public CharacterID: number
    public TextBounds: Rect
    public TextMatrix: Matrix
    public GlyphBits: number
    public AdvanceBits: number
    public TextRecords: TextRecord[]

    public static ReadData(br: SWFBitReader): DefineTextTag {
        let toParse = br.ReadUInt16()
        let length = toParse & 0x3F
        if (length == 0x3F) {
            length = br.ReadUInt32()
        }

        let data = br.PeekBytes(length)

        let retCharacterID = br.ReadUInt16()
        let retTextBounds = Rect.ReadData(br)
        let retTextMatrix = Matrix.ReadData(br)
        let retGlyphBits = br.ReadByte()
        let retAdvanceBits = br.ReadByte()
        let retTextRecords: TextRecord[] = []
        while (true) {
            if (br.PeekByte() == 0) {
                br.ReadByte()
                break
            }
            retTextRecords.push(TextRecord.ReadData(br, false, retGlyphBits, retAdvanceBits))
        }
        return new DefineTextTag(Buffer.from(data), length, retCharacterID, retTextBounds, retTextMatrix, retGlyphBits, retAdvanceBits, retTextRecords)
    }
}