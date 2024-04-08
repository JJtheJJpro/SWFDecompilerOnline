"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
class ActionWaitForFrame {
    constructor(len, frame, skipCount) {
        this.Length = len;
        this.Frame = frame;
        this.SkipCount = skipCount;
    }
    Length;
    ActionCode = ActionCodes_1.default.WaitForFrame;
    Frame;
    SkipCount;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        let retFrame = br.ReadUInt16();
        let retSkipCount = br.ReadByte();
        return new ActionWaitForFrame(retLen, retFrame, retSkipCount);
    }
}
exports.default = ActionWaitForFrame;
//# sourceMappingURL=ActionWaitForFrame.js.map