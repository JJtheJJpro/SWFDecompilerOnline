"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
class ActionWith {
    constructor(len, size) {
        this.Length = len;
        this.Size = size;
    }
    Length;
    ActionCode = ActionCodes_1.default.With;
    Size;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        return new ActionWith(retLen, br.ReadUInt16());
    }
}
exports.default = ActionWith;
//# sourceMappingURL=ActionWith.js.map