"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
const SWFTags_1 = __importDefault(require("./SWFTags"));
class EndTag {
    constructor() { }
    get TagCode() {
        return SWFTags_1.default.End;
    }
    get Size() {
        return 0;
    }
    get Data() {
        return Buffer.from([]);
    }
    static ReadData(br) {
        if ((br.ReadUInt16() & 0x3F) == 0) {
            return new EndTag();
        }
        else {
            throw new InvalidSWFError_1.default();
        }
    }
}
exports.default = EndTag;
//# sourceMappingURL=EndTag.js.map