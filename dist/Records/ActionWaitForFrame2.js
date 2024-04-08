"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
class ActionWaitForFrame2 {
    constructor(skipCount) {
        this.SkipCount = skipCount;
    }
    Length = 1;
    ActionCode = ActionCodes_1.default.WaitForFrame2;
    SkipCount;
    static ReadData(br) {
        if (br.ReadUInt16() != 1) {
            throw new InvalidSWFError_1.default();
        }
        return new ActionWaitForFrame2(br.ReadByte());
    }
}
exports.default = ActionWaitForFrame2;
//# sourceMappingURL=ActionWaitForFrame2.js.map