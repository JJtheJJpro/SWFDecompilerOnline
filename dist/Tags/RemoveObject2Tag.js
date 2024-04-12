"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
const SWFTags_1 = __importDefault(require("./SWFTags"));
class RemoveObject2Tag {
    _data;
    constructor(data, depth) {
        this._data = data;
        this.Depth = depth;
    }
    get TagCode() {
        return SWFTags_1.default.RemoveObject;
    }
    get Size() {
        return 2;
    }
    get Data() {
        return this._data;
    }
    Depth;
    static ReadData(br) {
        let toParse = br.ReadUInt16();
        if ((toParse & 0x3F) != 2) {
            throw new InvalidSWFError_1.default();
        }
        let data = br.PeekBytes(4);
        let retDepth = br.ReadUInt16();
        return new RemoveObject2Tag(Buffer.from(data), retDepth);
    }
}
exports.default = RemoveObject2Tag;
//# sourceMappingURL=RemoveObject2Tag.js.map