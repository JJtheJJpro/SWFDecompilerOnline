"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCall_1 = __importDefault(require("./ActionCall"));
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
const ActionConstantPool_1 = __importDefault(require("./ActionConstantPool"));
const ActionDefineFunction_1 = __importDefault(require("./ActionDefineFunction"));
const ActionDefineFunction2_1 = __importDefault(require("./ActionDefineFunction2"));
const ActionGetURL_1 = __importDefault(require("./ActionGetURL"));
const ActionGetURL2_1 = __importDefault(require("./ActionGetURL2"));
const ActionGotoFrame_1 = __importDefault(require("./ActionGotoFrame"));
const ActionGotoFrame2_1 = __importDefault(require("./ActionGotoFrame2"));
const ActionGoToLabel_1 = __importDefault(require("./ActionGoToLabel"));
const ActionIf_1 = __importDefault(require("./ActionIf"));
const ActionJump_1 = __importDefault(require("./ActionJump"));
const ActionPush_1 = __importDefault(require("./ActionPush"));
const ActionSetTarget_1 = __importDefault(require("./ActionSetTarget"));
const ActionStoreRegister_1 = __importDefault(require("./ActionStoreRegister"));
const ActionTry_1 = __importDefault(require("./ActionTry"));
const ActionWaitForFrame_1 = __importDefault(require("./ActionWaitForFrame"));
const ActionWaitForFrame2_1 = __importDefault(require("./ActionWaitForFrame2"));
const ActionWith_1 = __importDefault(require("./ActionWith"));
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
class ActionRecord {
    constructor(actionCode) {
        this.ActionCode = actionCode;
    }
    ActionCode;
    static Parse(br) {
        let actCode = br.ReadByte();
        if (!Object.values(ActionCodes_1.default).includes(actCode)) {
            throw new InvalidSWFError_1.default();
        }
        if (actCode < 0x80) {
            return new ActionRecord(actCode);
        }
        else {
            switch (actCode) {
                case ActionCodes_1.default.GotoFrame:
                    return ActionGotoFrame_1.default.ReadData(br);
                case ActionCodes_1.default.GetURL:
                    return ActionGetURL_1.default.ReadData(br);
                case ActionCodes_1.default.StoreRegister:
                    return ActionStoreRegister_1.default.ReadData(br);
                case ActionCodes_1.default.ConstantPool:
                    return ActionConstantPool_1.default.ReadData(br);
                case ActionCodes_1.default.WaitForFrame:
                    return ActionWaitForFrame_1.default.ReadData(br);
                case ActionCodes_1.default.SetTarget:
                    return ActionSetTarget_1.default.ReadData(br);
                case ActionCodes_1.default.GoToLabel:
                    return ActionGoToLabel_1.default.ReadData(br);
                case ActionCodes_1.default.WaitForFrame2:
                    return ActionWaitForFrame2_1.default.ReadData(br);
                case ActionCodes_1.default.DefineFunction2:
                    return ActionDefineFunction2_1.default.ReadData(br);
                case ActionCodes_1.default.Try:
                    return ActionTry_1.default.ReadData(br);
                case ActionCodes_1.default.With:
                    return ActionWith_1.default.ReadData(br);
                case ActionCodes_1.default.Push:
                    return ActionPush_1.default.ReadData(br);
                case ActionCodes_1.default.Jump:
                    return ActionJump_1.default.ReadData(br);
                case ActionCodes_1.default.GetURL2:
                    return ActionGetURL2_1.default.ReadData(br);
                case ActionCodes_1.default.DefineFunction:
                    return ActionDefineFunction_1.default.ReadData(br);
                case ActionCodes_1.default.If:
                    return ActionIf_1.default.ReadData(br);
                case ActionCodes_1.default.Call:
                    return ActionCall_1.default.ReadData(br);
                case ActionCodes_1.default.GotoFrame2:
                    return ActionGotoFrame2_1.default.ReadData(br);
                default:
                    throw new InvalidSWFError_1.default();
            }
        }
    }
}
exports.default = ActionRecord;
//# sourceMappingURL=ActionRecord.js.map