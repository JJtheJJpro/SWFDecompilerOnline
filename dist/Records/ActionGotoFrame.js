"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
class ActionGotoFrame {
    constructor(len, frame) {
        this.Length = len;
        this.Frame = frame;
    }
    Length;
    ActionCode = ActionCodes_1.default.GotoFrame;
    Frame;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        let retFrame = br.ReadUInt16();
        return new ActionGotoFrame(retLen, retFrame);
    }
}
exports.default = ActionGotoFrame;
//# sourceMappingURL=ActionGotoFrame.js.map