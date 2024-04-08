"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionGetURL2 = void 0;
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
class ActionGetURL2 {
    constructor(len, varsMethod, loadTarget, loadVariables) {
        this.Length = len;
        this.SendVarsMethod = varsMethod;
        this.LoadTargetFlag = loadTarget;
        this.LoadVariablesFlag = loadVariables;
    }
    Length;
    ActionCode = ActionCodes_1.default.GetURL2;
    SendVarsMethod;
    LoadTargetFlag;
    LoadVariablesFlag;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        let retVarsMethod = br.ReadNBitUnsignedValue(2);
        br.CheckReservedBlock(4);
        let targetFlag = br.ReadBit();
        let variablesFlag = br.ReadBit();
        return new ActionGetURL2(retLen, retVarsMethod, targetFlag, variablesFlag);
    }
}
exports.ActionGetURL2 = ActionGetURL2;
(function (ActionGetURL2) {
    let VarsMethod;
    (function (VarsMethod) {
        VarsMethod[VarsMethod["None"] = 0] = "None";
        VarsMethod[VarsMethod["GET"] = 1] = "GET";
        VarsMethod[VarsMethod["POST"] = 2] = "POST";
    })(VarsMethod = ActionGetURL2.VarsMethod || (ActionGetURL2.VarsMethod = {}));
})(ActionGetURL2 || (exports.ActionGetURL2 = ActionGetURL2 = {}));
exports.default = ActionGetURL2;
//# sourceMappingURL=ActionGetURL2.js.map