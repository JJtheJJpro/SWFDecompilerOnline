import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import SWFBitReader from "../SWFBitReader";

export default class ActionCall implements IActionRecordWithLength {
    private constructor(len: number) {
        this.Length = len
    }

    public Length: number
    public readonly ActionCode = ActionCodes.Call
    
    public static ReadData(br: SWFBitReader): ActionCall {
        return new ActionCall(br.ReadUInt16())
    }
}