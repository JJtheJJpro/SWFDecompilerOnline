"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
class ActionJump {
    constructor(len, branchOffset) {
        this.Length = len;
        this.BranchOffset = branchOffset;
    }
    Length;
    ActionCode = ActionCodes_1.default.Jump;
    BranchOffset;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        let retOffset = br.ReadSInt16();
        return new ActionJump(retLen, retOffset);
    }
}
exports.default = ActionJump;
//# sourceMappingURL=ActionJump.js.map