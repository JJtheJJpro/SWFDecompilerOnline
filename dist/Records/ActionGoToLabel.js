"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
class ActionGoToLabel {
    constructor(len, label) {
        this.Length = len;
        this.Label = label;
    }
    Length;
    ActionCode = ActionCodes_1.default.GoToLabel;
    Label;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        let retLabel = br.Read8BitString();
        return new ActionGoToLabel(retLen, retLabel);
    }
}
exports.default = ActionGoToLabel;
//# sourceMappingURL=ActionGoToLabel.js.map