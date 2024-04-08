"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
class ActionCall {
    constructor(len) {
        this.Length = len;
    }
    Length;
    ActionCode = ActionCodes_1.default.Call;
    static ReadData(br) {
        return new ActionCall(br.ReadUInt16());
    }
}
exports.default = ActionCall;
//# sourceMappingURL=ActionCall.js.map