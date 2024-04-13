"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const SWFTags_1 = __importDefault(require("./SWFTags"));
class DefineBitsTag {
    _data;
    _size;
    constructor(data, size, charID, jpegData) {
        this._data = data;
        this._size = size;
        this.CharacterID = charID;
        this.JPEGData = jpegData;
    }
    get TagCode() {
        return SWFTags_1.default.DefineBits;
    }
    get Size() {
        return this._size;
    }
    get Data() {
        return this._data;
    }
    CharacterID;
    JPEGData;
    static ReadData(br) {
        let toParse = br.ReadUInt16();
        let length = toParse & 0x3F;
        if (length == 0x3F) {
            length = br.ReadUInt32();
        }
        let data = br.PeekBytes(length);
        let retCharID = br.ReadUInt16();
        let jpegData = Buffer.from(br.ReadBytes(length - 2));
        let cLength = length - 2;
        if (length > 4 && br.swffileversion < 8 && jpegData[0] == 0xFF && jpegData[1] == 0xD9 && jpegData[2] == 0xFF && jpegData[3] == 0xD8) {
            jpegData = Buffer.copyBytesFrom(jpegData, 4, cLength -= 4);
        }
        if (jpegData[0] == 0xFF && jpegData[1] == 0xD8) {
            jpegData = Buffer.copyBytesFrom(jpegData, 2, cLength -= 2);
        }
        if (jpegData[cLength - 2] == 0xFF && jpegData[cLength - 1] == 0xD9) {
            jpegData = Buffer.copyBytesFrom(jpegData, 0, cLength - 2);
        }
        return new DefineBitsTag(Buffer.from(data), length, retCharID, jpegData);
    }
    SaveImageToFile(jpegTable, file) {
        let length = jpegTable.JPEGData.length + this.JPEGData.length + 4;
        let offset = 2;
        let buf = Buffer.alloc(length);
        buf[0] = 0xFF;
        buf[1] = 0xD8;
        jpegTable.JPEGData.copy(buf, offset, 0, jpegTable.JPEGData.length);
        offset += jpegTable.JPEGData.length;
        this.JPEGData.copy(buf, offset, 0, this.JPEGData.length);
        offset += this.JPEGData.length;
        buf[offset++] = 0xFF;
        buf[offset] = 0xD9;
        promises_1.default.writeFile(file, buf);
    }
}
exports.default = DefineBitsTag;
//# sourceMappingURL=DefineBitsTag.js.map