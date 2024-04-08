"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
class ActionConstantPool {
    constructor(len, count, pool) {
        this.Length = len;
        this.Count = count;
        this.ConstantPool = pool;
    }
    Length;
    ActionCode = ActionCodes_1.default.ConstantPool;
    Count;
    ConstantPool;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        let retCount = br.ReadUInt16();
        let retPool = new Array(retCount);
        for (let i = 0; i < retCount; i++) {
            retPool[i] = br.Read8BitString();
        }
        return new ActionConstantPool(retLen, retCount, retPool);
    }
}
exports.default = ActionConstantPool;
//# sourceMappingURL=ActionConstantPool.js.map