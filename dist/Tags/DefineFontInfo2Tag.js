"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
const SWFTags_1 = __importDefault(require("./SWFTags"));
class DefineFontInfo2Tag {
    _size;
    _data;
    constructor(data, size, fontID, fontNameLen, fontName, ffSmallText, ffShiftJIS, ffANSI, ffItalic, ffBold, ffWideCodes, langCode, codeTable) {
        this._data = data;
        this._size = size;
        this.FontID = fontID;
        this.FontNameLen = fontNameLen;
        this.FontName = fontName;
        this.FontFlagsSmallText = ffSmallText;
        this.FontFlagsShiftJIS = ffShiftJIS;
        this.FontFlagsANSI = ffANSI;
        this.FontFlagsItalic = ffItalic;
        this.FontFlagsBold = ffBold;
        this.FontFlagsWideCodes = ffWideCodes;
        this.LanguageCode = langCode;
        this.CodeTable = codeTable;
    }
    get TagCode() {
        return SWFTags_1.default.DefineFontInfo2;
    }
    get Size() {
        return this._size;
    }
    get Data() {
        return this._data;
    }
    FontID;
    FontNameLen;
    FontName;
    FontFlagsSmallText;
    FontFlagsShiftJIS;
    FontFlagsANSI;
    FontFlagsItalic;
    FontFlagsBold;
    FontFlagsWideCodes;
    LanguageCode;
    CodeTable;
    static ReadData(br, nGlyphs) {
        let toParse = br.ReadUInt16();
        let length = toParse & 0x3F;
        if (length == 0x3F) {
            length = br.ReadUInt32();
        }
        let data = br.PeekBytes(length);
        let retFontID = br.ReadUInt16();
        let retFontNameLen = br.ReadByte();
        let retFontName = String.fromCharCode(...br.ReadBytes(retFontNameLen));
        br.CheckReservedBlock(2);
        let retFontFlagsSmallText = br.ReadBit();
        let retFontFlagsShiftJIS = br.ReadBit();
        let retFontFlagsANSI = br.ReadBit();
        let retFontFlagsItalic = br.ReadBit();
        let retFontFlagsBold = br.ReadBit();
        if (!br.ReadBit()) {
            throw new InvalidSWFError_1.default();
        }
        let retLanguageCode = br.ReadByte();
        let retCodeTable = new Array(nGlyphs);
        for (let i = 0; i < nGlyphs; i++) {
            retCodeTable[i] = br.ReadUInt16();
        }
        return new DefineFontInfo2Tag(Buffer.from(data), length, retFontID, retFontNameLen, retFontName, retFontFlagsSmallText, retFontFlagsShiftJIS, retFontFlagsANSI, retFontFlagsItalic, retFontFlagsBold, true, retLanguageCode, retCodeTable);
    }
}
exports.default = DefineFontInfo2Tag;
//# sourceMappingURL=DefineFontInfo2Tag.js.map