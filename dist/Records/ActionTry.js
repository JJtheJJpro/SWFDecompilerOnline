"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
class ActionTry {
    constructor(len, catchInRegister, finallyBlock, catchBlock, trySize, catchSize, finallySize, tryBody, catchBody, finallyBody) {
        this.Length = len;
        this.CatchInRegisterFlag = catchInRegister;
        this.FinallyBlockFlag = finallyBlock;
        this.CatchBlockFlag = catchBlock;
        this.TrySize = trySize;
        this.CatchSize = catchSize;
        this.FinallySize = finallySize;
        this.TryBody = tryBody;
        this.CatchBody = catchBody;
        this.FinallyBody = finallyBody;
    }
    Length;
    ActionCode = ActionCodes_1.default.Try;
    CatchInRegisterFlag;
    FinallyBlockFlag;
    CatchBlockFlag;
    TrySize;
    CatchSize;
    FinallySize;
    TryBody;
    CatchBody;
    FinallyBody;
    CatchName;
    CatchRegister;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        br.CheckReservedBlock(5);
        let retCatchInRegister = br.ReadBit();
        let retFinallyBlock = br.ReadBit();
        let retCatchBlock = br.ReadBit();
        let retTrySize = br.ReadUInt16();
        let retCatchSize = br.ReadUInt16();
        let retFinallySize = br.ReadUInt16();
        let retCatchName = undefined;
        let retCatchRegister = undefined;
        if (!retCatchInRegister) {
            retCatchName = br.Read8BitString();
        }
        else {
            retCatchRegister = br.ReadByte();
        }
        let retTryBody = br.ReadBytes(retTrySize);
        let retCatchBody = br.ReadBytes(retCatchSize);
        let retFinallyBody = br.ReadBytes(retFinallySize);
        let ret = new ActionTry(retLen, retCatchInRegister, retFinallyBlock, retCatchBlock, retTrySize, retCatchSize, retFinallySize, Buffer.from(retTryBody), Buffer.from(retCatchBody), Buffer.from(retFinallyBody));
        ret.CatchName = retCatchName;
        ret.CatchRegister = retCatchRegister;
        return ret;
    }
}
exports.default = ActionTry;
//# sourceMappingURL=ActionTry.js.map