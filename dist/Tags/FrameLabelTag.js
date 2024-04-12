"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SWFTags_1 = __importDefault(require("./SWFTags"));
class FrameLabelTag {
    _data;
    _size;
    constructor(data, size, name) {
        this._data = data;
        this._size = size;
        this.Name = name;
    }
    get TagCode() {
        return SWFTags_1.default.FrameLabel;
    }
    get Size() {
        return this._size;
    }
    get Data() {
        return this._data;
    }
    Name;
    static ReadData(br) {
        let toParse = br.ReadUInt16();
        let size = toParse & 0x3F;
        if (size == 0x3F) {
            size = br.ReadUInt32();
        }
        let data = br.PeekBytes(size);
        let retName = br.Read8BitString();
        return new FrameLabelTag(Buffer.from(data), size, retName);
    }
}
exports.default = FrameLabelTag;
//# sourceMappingURL=FrameLabelTag.js.map