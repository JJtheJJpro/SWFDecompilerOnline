import ITag from "./ITag";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class DefineFontInfoTag implements ITag {
    private _size: number
    private _data: Buffer

    private constructor(data: Buffer, size: number, fontID: number, fontNameLen: number, fontName: string, ffSmallText: boolean, ffShiftJIS: boolean, ffANSI: boolean, ffItalic: boolean, ffBold: boolean, ffWideCodes: boolean, codeTable: number[]) {
        this._data = data
        this._size = size
        this.FontID = fontID
        this.FontNameLen = fontNameLen
        this.FontName = fontName
        this.FontFlagsSmallText = ffSmallText
        this.FontFlagsShiftJIS = ffShiftJIS
        this.FontFlagsANSI = ffANSI
        this.FontFlagsItalic = ffItalic
        this.FontFlagsBold = ffBold
        this.FontFlagsWideCodes = ffWideCodes
        this.CodeTable = codeTable
    }

    get TagCode(): SWFTags {
        return SWFTags.DefineFontInfo
    }
    get Size(): number {
        return this._size
    }
    get Data(): Buffer {
        return this._data
    }

    public FontID: number
    public FontNameLen: number
    public FontName: string
    public FontFlagsSmallText: boolean
    public FontFlagsShiftJIS: boolean
    public FontFlagsANSI: boolean
    public FontFlagsItalic: boolean
    public FontFlagsBold: boolean
    public FontFlagsWideCodes: boolean
    public CodeTable: number[]
    
    public static ReadData(br: SWFBitReader, nGlyphs: number): DefineFontInfoTag {
        let toParse = br.ReadUInt16()
        let length = toParse & 0x3F
        if (length == 0x3F) {
            length = br.ReadUInt32()
        }

        let data = br.PeekBytes(length)

        let retFontID = br.ReadUInt16()
        let retFontNameLen = br.ReadByte()
        let retFontName = String.fromCharCode(...br.ReadBytes(retFontNameLen))
        br.CheckReservedBlock(2)
        let retFontFlagsSmallText = br.ReadBit()
        let retFontFlagsShiftJIS = br.ReadBit()
        let retFontFlagsANSI = br.ReadBit()
        let retFontFlagsItalic = br.ReadBit()
        let retFontFlagsBold = br.ReadBit()
        let retFontFlagsWideCodes = br.ReadBit()
        let retCodeTable = new Array<number>(nGlyphs)
        if (retFontFlagsWideCodes) {
            for (let i = 0; i < nGlyphs; i++) {
                retCodeTable[i] = br.ReadUInt16()
            }
        }
        else {
            for (let i = 0; i < nGlyphs; i++) {
                retCodeTable[i] = br.ReadByte()
            }
        }

        return new DefineFontInfoTag(Buffer.from(data), length, retFontID, retFontNameLen, retFontName, retFontFlagsSmallText, retFontFlagsShiftJIS, retFontFlagsANSI, retFontFlagsItalic, retFontFlagsBold, retFontFlagsWideCodes, retCodeTable)
    }
}