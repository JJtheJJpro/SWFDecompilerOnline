"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = __importDefault(require("../Records/Matrix"));
const Rect_1 = __importDefault(require("../Records/Rect"));
const SWFTags_1 = __importDefault(require("./SWFTags"));
const TextRecord_1 = __importDefault(require("../Records/TextRecord"));
class DefineTextTag {
    _data;
    _size;
    constructor(data, size, charID, textBounds, textMatrix, glyphBits, advanceBits, textRecords) {
        this._data = data;
        this._size = size;
        this.CharacterID = charID;
        this.TextBounds = textBounds;
        this.TextMatrix = textMatrix;
        this.GlyphBits = glyphBits;
        this.AdvanceBits = advanceBits;
        this.TextRecords = textRecords;
    }
    get TagCode() {
        return SWFTags_1.default.DefineText;
    }
    get Size() {
        return this._size;
    }
    get Data() {
        return this._data;
    }
    CharacterID;
    TextBounds;
    TextMatrix;
    GlyphBits;
    AdvanceBits;
    TextRecords;
    static ReadData(br) {
        let toParse = br.ReadUInt16();
        let length = toParse & 0x3F;
        if (length == 0x3F) {
            length = br.ReadUInt32();
        }
        let data = br.PeekBytes(length);
        let retCharacterID = br.ReadUInt16();
        let retTextBounds = Rect_1.default.ReadData(br);
        let retTextMatrix = Matrix_1.default.ReadData(br);
        let retGlyphBits = br.ReadByte();
        let retAdvanceBits = br.ReadByte();
        let retTextRecords = [];
        while (true) {
            if (br.PeekByte() == 0) {
                br.ReadByte();
                break;
            }
            retTextRecords.push(TextRecord_1.default.ReadData(br, false, retGlyphBits, retAdvanceBits));
        }
        return new DefineTextTag(Buffer.from(data), length, retCharacterID, retTextBounds, retTextMatrix, retGlyphBits, retAdvanceBits, retTextRecords);
    }
}
exports.default = DefineTextTag;
//# sourceMappingURL=DefineTextTag.js.map