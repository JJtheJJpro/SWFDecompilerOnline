"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
const RegisterParam_1 = __importDefault(require("../Structures/RegisterParam"));
class ActionDefineFunction2 {
    constructor(len, funcName, numParams, regCount, nonGFlags, globalFlag, params, codeSize) {
        this.Length = len;
        this.FunctionName = funcName;
        this.NumParams = numParams;
        this.RegisterCount = regCount;
        this.PreloadParentFlag = nonGFlags[7];
        this.PreloadRootFlag = nonGFlags[6];
        this.SuppressSuperFlag = nonGFlags[5];
        this.PreloadSuperFlag = nonGFlags[4];
        this.SuppressArgumentsFlag = nonGFlags[3];
        this.PreloadArgumentsFlag = nonGFlags[2];
        this.SuppressThisFlag = nonGFlags[1];
        this.PreloadThisFlag = nonGFlags[0];
        this.PreloadGlobalFlag = globalFlag;
        this.Parameters = params;
        this.CodeSize = codeSize;
    }
    ActionCode = ActionCodes_1.default.DefineFunction2;
    Length;
    FunctionName;
    NumParams;
    RegisterCount;
    PreloadParentFlag;
    PreloadRootFlag;
    SuppressSuperFlag;
    PreloadSuperFlag;
    SuppressArgumentsFlag;
    PreloadArgumentsFlag;
    SuppressThisFlag;
    PreloadThisFlag;
    PreloadGlobalFlag;
    Parameters;
    CodeSize;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        let retFunctionName = br.Read8BitString();
        let retNumParams = br.ReadUInt16();
        let retRegisterCount = br.ReadByte();
        let nonglobalflags = br.ReadBits(8);
        br.CheckReservedBlock(7);
        let retPreloadGlobalFlag = br.ReadBit();
        let retParameters = new Array(retNumParams);
        for (let i = 0; i < retNumParams; i++) {
            retParameters[i] = RegisterParam_1.default.ReadData(br);
        }
        let codeSize = br.ReadUInt16();
        return new ActionDefineFunction2(retLen, retFunctionName, retNumParams, retRegisterCount, nonglobalflags, retPreloadGlobalFlag, retParameters, codeSize);
    }
}
exports.default = ActionDefineFunction2;
//# sourceMappingURL=ActionDefineFunction2.js.map