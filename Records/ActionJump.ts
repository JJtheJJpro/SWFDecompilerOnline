import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import SWFBitReader from "../SWFBitReader";

export default class ActionJump implements IActionRecordWithLength {
    private constructor(len: number, branchOffset: number) {
        this.Length = len
        this.BranchOffset = branchOffset
    }

    public Length: number
    public readonly ActionCode = ActionCodes.Jump

    public BranchOffset: number

    public static ReadData(br: SWFBitReader): ActionJump {
        let retLen = br.ReadUInt16()
        let retOffset = br.ReadSInt16()
        return new ActionJump(retLen, retOffset)
    }
}