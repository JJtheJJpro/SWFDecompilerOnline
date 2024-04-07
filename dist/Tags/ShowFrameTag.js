"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowFrameTag = void 0;
const SWFErrors_1 = require("../SWFErrors");
const SWFTags_1 = require("./SWFTags");
class ShowFrameTag {
    constructor(frame) {
        this._frame = frame;
    }
    _frame;
    get TagCode() {
        return SWFTags_1.SWFTags.ShowFrame;
    }
    get Size() {
        return 0;
    }
    get Data() {
        return Buffer.from([]);
    }
    get FrameNumber() {
        return this._frame;
    }
    static ReadData(br) {
        if ((br.ReadUInt16() & 0x3F) == 0) {
            return new ShowFrameTag(br.tempframecount);
        }
        else {
            throw new SWFErrors_1.InvalidSWFError();
        }
    }
}
exports.ShowFrameTag = ShowFrameTag;
//# sourceMappingURL=ShowFrameTag.js.map