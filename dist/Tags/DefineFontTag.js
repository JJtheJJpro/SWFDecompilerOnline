"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = __importDefault(require("../Structures/Shape"));
const SWFTags_1 = __importDefault(require("./SWFTags"));
class DefineFontTag {
    _data;
    _size;
    constructor(data, size, fontID, offsetTable, shapeTable) {
        this._data = data;
        this._size = size;
        this.FontID = fontID;
        this.OffsetTable = offsetTable;
        this.GlyphShapeTable = shapeTable;
    }
    get TagCode() {
        return SWFTags_1.default.DefineFont;
    }
    get Size() {
        return this._size;
    }
    get Data() {
        return this._data;
    }
    FontID;
    OffsetTable;
    GlyphShapeTable;
    static ReadData(br) {
        let toParse = br.ReadUInt16();
        let length = toParse & 0x3F;
        if (length == 0x3F) {
            length = br.ReadUInt32();
        }
        let data = br.PeekBytes(length);
        let retFontID = br.ReadUInt16();
        let nGlyphs = br.PeekUInt16() / 2;
        let retOffsetTable = new Array(nGlyphs);
        for (let i = 0; i < nGlyphs; i++) {
            retOffsetTable[i] = br.ReadUInt16();
        }
        let retShapeTable = new Array(nGlyphs);
        for (let i = 0; i < nGlyphs; i++) {
            retShapeTable[i] = Shape_1.default.ReadData(br);
        }
        return { ret: new DefineFontTag(Buffer.from(data), length, retFontID, retOffsetTable, retShapeTable), nGlyphs: nGlyphs };
    }
}
exports.default = DefineFontTag;
//# sourceMappingURL=DefineFontTag.js.map