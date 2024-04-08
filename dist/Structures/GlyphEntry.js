"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GlyphEntry {
    constructor(index, advance) {
        this.GlyphIndex = index;
        this.GlyphAdvance = advance;
    }
    GlyphIndex;
    GlyphAdvance;
    static ReadData(br, gBits, aBits) {
        let index = br.ReadNBitUnsignedValue(gBits);
        let advance = br.ReadNBitSignedValue(aBits);
        return new GlyphEntry(index, advance);
    }
}
exports.default = GlyphEntry;
//# sourceMappingURL=GlyphEntry.js.map