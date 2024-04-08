import SWFBitReader from "../SWFBitReader";

export default class GlyphEntry {
    private constructor(index: number, advance: number) {
        this.GlyphIndex = index
        this.GlyphAdvance = advance
    }

    public GlyphIndex: number
    public GlyphAdvance: number

    public static ReadData(br: SWFBitReader, gBits: number, aBits: number): GlyphEntry {
        let index = br.ReadNBitUnsignedValue(gBits)
        let advance = br.ReadNBitSignedValue(aBits)
        return new GlyphEntry(index, advance)
    }
}