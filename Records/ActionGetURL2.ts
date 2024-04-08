import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import SWFBitReader from "../SWFBitReader";

export class ActionGetURL2 implements IActionRecordWithLength {
    private constructor(len: number, varsMethod: ActionGetURL2.VarsMethod, loadTarget: boolean, loadVariables: boolean) {
        this.Length = len
        this.SendVarsMethod = varsMethod
        this.LoadTargetFlag = loadTarget
        this.LoadVariablesFlag = loadVariables
    }

    public Length: number
    public readonly ActionCode = ActionCodes.GetURL2

    public SendVarsMethod: ActionGetURL2.VarsMethod
    public LoadTargetFlag: boolean
    public LoadVariablesFlag: boolean

    public static ReadData(br: SWFBitReader): ActionGetURL2 {
        let retLen = br.ReadUInt16()
        let retVarsMethod: ActionGetURL2.VarsMethod = br.ReadNBitUnsignedValue(2)
        br.CheckReservedBlock(4)
        let targetFlag = br.ReadBit()
        let variablesFlag = br.ReadBit()
        return new ActionGetURL2(retLen, retVarsMethod, targetFlag, variablesFlag)
    }
}
export namespace ActionGetURL2 {
    export enum VarsMethod {
        None,
        GET,
        POST
    }
}

export default ActionGetURL2