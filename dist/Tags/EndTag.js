"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndTag = void 0;
const SWFErrors_1 = require("../SWFErrors");
const SWFTags_1 = require("./SWFTags");
class EndTag {
    constructor() { }
    get TagCode() {
        return SWFTags_1.SWFTags.End;
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
            throw new SWFErrors_1.InvalidSWFError();
        }
    }
}
exports.EndTag = EndTag;
//# sourceMappingURL=EndTag.js.map