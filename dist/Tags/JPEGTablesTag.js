"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SWFTags_1 = __importDefault(require("./SWFTags"));
class JPEGTablesTag {
    _data;
    _size;
    constructor(data, size, jpegData) {
        this._data = data;
        this._size = size;
        this.JPEGData = jpegData;
    }
    get TagCode() {
        return SWFTags_1.default.JPEGTables;
    }
    get Size() {
        return this._size;
    }
    get Data() {
        return this._data;
    }
    JPEGData;
    static ReadData(br) {
        let toParse = br.ReadUInt16();
        let length = toParse & 0x3F;
        if (length == 0x3F) {
            length = br.ReadUInt32();
        }
        let data = br.ReadBytes(length);
        let jpegData = Buffer.from(data);
        let cLength = length;
        if (length > 4 && br.swffileversion < 8 && jpegData[0] == 0xFF && jpegData[1] == 0xD9 && jpegData[2] == 0xFF && jpegData[3] == 0xD8) {
            jpegData = Buffer.copyBytesFrom(jpegData, 4, cLength -= 4);
        }
        if (jpegData[0] == 0xFF && jpegData[1] == 0xD8) {
            jpegData = Buffer.copyBytesFrom(jpegData, 2, cLength -= 2);
        }
        if (jpegData[cLength - 2] == 0xFF && jpegData[cLength - 1] == 0xD9) {
            jpegData = Buffer.copyBytesFrom(jpegData, 0, cLength - 2);
        }
        return new JPEGTablesTag(Buffer.from(data), length, jpegData);
    }
}
exports.default = JPEGTablesTag;
//# sourceMappingURL=JPEGTablesTag.js.map