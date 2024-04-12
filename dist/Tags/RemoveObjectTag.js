"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
const SWFTags_1 = __importDefault(require("./SWFTags"));
class RemoveObjectTag {
    _data;
    constructor(data, charId, depth) {
        this._data = data;
        this.CharacterId = charId;
        this.Depth = depth;
    }
    get TagCode() {
        return SWFTags_1.default.RemoveObject;
    }
    get Size() {
        return 4;
    }
    get Data() {
        return this._data;
    }
    CharacterId;
    Depth;
    static ReadData(br) {
        let toParse = br.ReadUInt16();
        if ((toParse & 0x3F) != 4) {
            throw new InvalidSWFError_1.default();
        }
        let data = br.PeekBytes(4);
        let retCharId = br.ReadUInt16();
        let retDepth = br.ReadUInt16();
        return new RemoveObjectTag(Buffer.from(data), retCharId, retDepth);
    }
}
exports.default = RemoveObjectTag;
//# sourceMappingURL=RemoveObjectTag.js.map