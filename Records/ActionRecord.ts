import ActionCall from "./ActionCall";
import ActionCodes from "./ActionCodes";
import ActionConstantPool from "./ActionConstantPool";
import ActionDefineFunction from "./ActionDefineFunction";
import ActionDefineFunction2 from "./ActionDefineFunction2";
import ActionGetURL from "./ActionGetURL";
import ActionGetURL2 from "./ActionGetURL2";
import ActionGotoFrame from "./ActionGotoFrame";
import ActionGotoFrame2 from "./ActionGotoFrame2";
import ActionGoToLabel from "./ActionGoToLabel";
import ActionIf from "./ActionIf";
import ActionJump from "./ActionJump";
import ActionPush from "./ActionPush";
import ActionSetTarget from "./ActionSetTarget";
import ActionStoreRegister from "./ActionStoreRegister";
import ActionTry from "./ActionTry";
import ActionWaitForFrame from "./ActionWaitForFrame";
import ActionWaitForFrame2 from "./ActionWaitForFrame2";
import ActionWith from "./ActionWith";
import IActionRecord from "./IActionRecord";
import InvalidSWFError from "../InvalidSWFError";
import SWFBitReader from "../SWFBitReader";

export default class ActionRecord implements IActionRecord {
    private constructor(actionCode: ActionCodes) {
        this.ActionCode = actionCode
    }

    public readonly ActionCode: ActionCodes;

    public static Parse(br: SWFBitReader): IActionRecord {
        let actCode: ActionCodes = br.ReadByte()
        if (!Object.values(ActionCodes).includes(actCode)) {
            throw new InvalidSWFError()
        }
        if (actCode < 0x80) {
            return new ActionRecord(actCode)
        }
        else {
            switch (actCode) {
                case ActionCodes.GotoFrame:
                    return ActionGotoFrame.ReadData(br)
                case ActionCodes.GetURL:
                    return ActionGetURL.ReadData(br)
                case ActionCodes.StoreRegister:
                    return ActionStoreRegister.ReadData(br)
                case ActionCodes.ConstantPool:
                    return ActionConstantPool.ReadData(br)
                case ActionCodes.WaitForFrame:
                    return ActionWaitForFrame.ReadData(br)
                case ActionCodes.SetTarget:
                    return ActionSetTarget.ReadData(br)
                case ActionCodes.GoToLabel:
                    return ActionGoToLabel.ReadData(br)
                case ActionCodes.WaitForFrame2:
                    return ActionWaitForFrame2.ReadData(br)
                case ActionCodes.DefineFunction2:
                    return ActionDefineFunction2.ReadData(br)
                case ActionCodes.Try:
                    return ActionTry.ReadData(br)
                case ActionCodes.With:
                    return ActionWith.ReadData(br)
                case ActionCodes.Push:
                    return ActionPush.ReadData(br)
                case ActionCodes.Jump:
                    return ActionJump.ReadData(br)
                case ActionCodes.GetURL2:
                    return ActionGetURL2.ReadData(br)
                case ActionCodes.DefineFunction:
                    return ActionDefineFunction.ReadData(br)
                case ActionCodes.If:
                    return ActionIf.ReadData(br)
                case ActionCodes.Call:
                    return ActionCall.ReadData(br)
                case ActionCodes.GotoFrame2:
                    return ActionGotoFrame2.ReadData(br)
                default:
                    throw new InvalidSWFError()
            }
        }
    }
}