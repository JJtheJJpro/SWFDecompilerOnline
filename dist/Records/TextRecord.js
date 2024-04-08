"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GlyphEntry_1 = __importDefault(require("../Structures/GlyphEntry"));
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
const RGB_1 = __importDefault(require("./RGB"));
const RGBA_1 = __importDefault(require("./RGBA"));
class TextRecord {
    constructor(hasFont, hasColor, hasYoffset, hasXoffset, gCount, gEntries) {
        this.StyleFlagsHasFont = hasFont;
        this.StyleFlagsHasColor = hasColor;
        this.StyleFlagsHasYOffset = hasYoffset;
        this.StyleFlagsHasXOffset = hasXoffset;
        this.GlyphCount = gCount;
        this.GlyphEntries = gEntries;
    }
    TextRecordType = true;
    StyleFlagsHasFont;
    StyleFlagsHasColor;
    StyleFlagsHasYOffset;
    StyleFlagsHasXOffset;
    GlyphCount;
    GlyphEntries;
    FontID;
    TextColor;
    XOffset;
    YOffset;
    TextHeight;
    static ReadData(br, defineText2, gBits, aBits) {
        if (!br.ReadBit()) {
            throw new InvalidSWFError_1.default();
        }
        br.CheckReservedBlock(3);
        let retFontID = undefined;
        let retTextColor = undefined;
        let retXOffset = undefined;
        let retYOffset = undefined;
        let retTextHeight = undefined;
        let retHasFont = br.ReadBit();
        let retHasColor = br.ReadBit();
        let retHasYOffset = br.ReadBit();
        let retHasXOffset = br.ReadBit();
        if (retHasFont) {
            retFontID = br.ReadUInt16();
        }
        if (retHasColor) {
            retTextColor = defineText2 ? RGBA_1.default.ReadData(br) : RGB_1.default.ReadData(br);
        }
        if (retHasXOffset) {
            retXOffset = br.ReadSInt16();
        }
        if (retHasYOffset) {
            retYOffset = br.ReadSInt16();
        }
        if (retHasFont) {
            retTextHeight = br.ReadUInt16();
        }
        let retGCount = br.ReadByte();
        let retGEntries = new Array(retGCount);
        for (let i = 0; i < retGCount; i++) {
            retGEntries[i] = GlyphEntry_1.default.ReadData(br, gBits, aBits);
        }
        let ret = new TextRecord(retHasFont, retHasColor, retHasYOffset, retHasXOffset, retGCount, retGEntries);
        ret.FontID = retFontID;
        ret.TextColor = retTextColor;
        ret.XOffset = retXOffset;
        ret.YOffset = retYOffset;
        ret.TextHeight = retTextHeight;
        return ret;
    }
}
exports.default = TextRecord;
//# sourceMappingURL=TextRecord.js.map