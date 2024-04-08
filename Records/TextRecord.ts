import GlyphEntry from "../Structures/GlyphEntry";
import IColor from "./IColor";
import InvalidSWFError from "../InvalidSWFError";
import RGB from "./RGB";
import RGBA from "./RGBA";
import SWFBitReader from "../SWFBitReader";

export default class TextRecord {
    private constructor(hasFont: boolean, hasColor: boolean, hasYoffset: boolean, hasXoffset: boolean, gCount: number, gEntries: GlyphEntry[]) {
        this.StyleFlagsHasFont = hasFont
        this.StyleFlagsHasColor = hasColor
        this.StyleFlagsHasYOffset = hasYoffset
        this.StyleFlagsHasXOffset = hasXoffset
        this.GlyphCount = gCount
        this.GlyphEntries = gEntries
    }

    public readonly TextRecordType = true

    public StyleFlagsHasFont: boolean
    public StyleFlagsHasColor: boolean
    public StyleFlagsHasYOffset: boolean
    public StyleFlagsHasXOffset: boolean
    public GlyphCount: number
    public GlyphEntries: GlyphEntry[]

    public FontID?: number
    public TextColor?: IColor
    public XOffset?: number
    public YOffset?: number
    public TextHeight?: number
    
    public static ReadData(br: SWFBitReader, defineText2: boolean, gBits: number, aBits: number): TextRecord {
        if (!br.ReadBit()) {
            throw new InvalidSWFError()
        }
        br.CheckReservedBlock(3)
        let retFontID: number | undefined = undefined
        let retTextColor: IColor | undefined = undefined
        let retXOffset: number | undefined = undefined
        let retYOffset: number | undefined = undefined
        let retTextHeight: number | undefined = undefined
        
        let retHasFont = br.ReadBit()
        let retHasColor = br.ReadBit()
        let retHasYOffset = br.ReadBit()
        let retHasXOffset = br.ReadBit()

        if (retHasFont) {
            retFontID = br.ReadUInt16()
        }
        if (retHasColor) {
            retTextColor = defineText2 ? RGBA.ReadData(br) : RGB.ReadData(br)
        }
        if (retHasXOffset) {
            retXOffset = br.ReadSInt16()
        }
        if (retHasYOffset) {
            retYOffset = br.ReadSInt16()
        }
        if (retHasFont) {
            retTextHeight = br.ReadUInt16()
        }
        let retGCount = br.ReadByte()
        let retGEntries = new Array<GlyphEntry>(retGCount)
        for (let i = 0; i < retGCount; i++) {
            retGEntries[i] = GlyphEntry.ReadData(br, gBits, aBits)
        }
        let ret = new TextRecord(retHasFont, retHasColor, retHasYOffset, retHasXOffset, retGCount, retGEntries)
        ret.FontID = retFontID
        ret.TextColor = retTextColor
        ret.XOffset = retXOffset
        ret.YOffset = retYOffset
        ret.TextHeight = retTextHeight
        return ret
    }
}