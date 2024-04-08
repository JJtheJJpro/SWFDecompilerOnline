"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
class ActionIf {
    constructor(len, branchOffset) {
        this.Length = len;
        this.BranchOffset = branchOffset;
    }
    Length;
    ActionCode = ActionCodes_1.default.If;
    BranchOffset;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        let retOffset = br.ReadSInt16();
        return new ActionIf(retLen, retOffset);
    }
}
exports.default = ActionIf;
//# sourceMappingURL=ActionIf.js.map