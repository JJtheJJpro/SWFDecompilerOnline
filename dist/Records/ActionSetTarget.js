"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
class ActionSetTarget {
    constructor(len, name) {
        this.Length = len;
        this.TargetName = name;
    }
    Length;
    ActionCode = ActionCodes_1.default.SetTarget;
    TargetName;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        let retName = br.Read8BitString();
        return new ActionSetTarget(retLen, retName);
    }
}
exports.default = ActionSetTarget;
//# sourceMappingURL=ActionSetTarget.js.map