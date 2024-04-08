"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
class ActionDefineFunction {
    constructor(len, funcName, nParams, params, codeSize) {
        this.Length = len;
        this.FunctionName = funcName;
        this.NumParams = nParams;
        this.Params = params;
        this.CodeSize = codeSize;
    }
    Length;
    ActionCode = ActionCodes_1.default.DefineFunction;
    FunctionName;
    NumParams;
    Params;
    CodeSize;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        let retFuncName = br.Read8BitString();
        let retNumParams = br.ReadUInt16();
        let retParams = new Array(retNumParams);
        for (let i = 0; i < retNumParams; i++) {
            retParams[i] = br.Read8BitString();
        }
        let retCodeSize = br.ReadUInt16();
        return new ActionDefineFunction(retLen, retFuncName, retNumParams, retParams, retCodeSize);
    }
}
exports.default = ActionDefineFunction;
//# sourceMappingURL=ActionDefineFunction.js.map