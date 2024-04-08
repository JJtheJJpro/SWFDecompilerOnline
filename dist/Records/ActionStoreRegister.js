"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
class ActionStoreRegister {
    constructor(len, regNum) {
        this.Length = len;
        this.RegisterNumber = regNum;
    }
    Length;
    ActionCode = ActionCodes_1.default.StoreRegister;
    RegisterNumber;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        let retRegNum = br.ReadByte();
        return new ActionStoreRegister(retLen, retRegNum);
    }
}
exports.default = ActionStoreRegister;
//# sourceMappingURL=ActionStoreRegister.js.map