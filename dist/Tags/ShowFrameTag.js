"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
const SWFTags_1 = __importDefault(require("./SWFTags"));
class ShowFrameTag {
    constructor(frame) {
        this._frame = frame;
    }
    _frame;
    get TagCode() {
        return SWFTags_1.default.ShowFrame;
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
            throw new InvalidSWFError_1.default();
        }
    }
}
exports.default = ShowFrameTag;
//# sourceMappingURL=ShowFrameTag.js.map